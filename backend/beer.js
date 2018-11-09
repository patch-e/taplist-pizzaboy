/*
beer.js
Provides JSON data that represents a list of beers on tap, in firkins,
and in special bottles for sale at Al's of Hampden in Enola, PA

Copyright (c) 2014

Patrick Crager

*/

// required modules
var express = require('express'),
		cookieParser = require('cookie-parser'),
		request = require('request'),
		cheerio = require('cheerio'),
		console = require('clim')('beer'),
		mongojs = require('mongojs'),
		utils = require('./utils'),
		responses = require('./responses'),
		converter = require('./converter');

// request options
var listOptions = {
			url: 'http://alsofhampden.com/beer.php'
		},
		alsLoginOptions = {
			url: 'https://untappd.com/oauth/authorize',
			timeout: 15000,
			json: true,
			qs: {
				client_id: process.env.untappdClientID,
				client_secret: process.env.untappdClientSecret,
				response_type: 'code',
				redirect_url: 'http://mccrager.com/nodejs/beer/login',
				code: null
			}
		},
    taplistLoginOptions = {
      url: 'https://untappd.com/oauth/authorize',
			timeout: 15000,
      json: true,
      qs: {
        client_id: process.env.taplistUntappdClientID,
        client_secret: process.env.taplistUntappdClientSecret,
        response_type: 'code',
        redirect_url: 'http://taplist.lititzcraftbeerfest.com/nodejs/beer/login',
        code: null
      }
    },
		alsAnonSearchOptions = {
			url: 'https://api.untappd.com/v4/search/beer',
			json: true,
			qs: {
				client_id: process.env.untappdClientID,
				client_secret: process.env.untappdClientSecret,
				limit: 1
			}
		},
    taplistAnonSearchOptions = {
			url: 'https://api.untappd.com/v4/search/beer',
			json: true,
			qs: {
				client_id: process.env.taplistUntappdClientID,
				client_secret: process.env.taplistUntappdClientSecret,
				limit: 1
			}
		},
		authSearchOptions = {
			url: 'https://api.untappd.com/v4/search/beer',
			json: true,
			qs: {
				access_token: null,
				limit: 1
			}
		};

function untappdSearch(req, res, beer, token) {
	var result = {},
	    requestOptions,
	    db = mongojs('beer', ['collection']);

	// set access_token if token found in cookie to do authenticated search
	// otherwise use client id/secret for anon search
	if (token) {
    requestOptions = authSearchOptions;
		requestOptions.qs.access_token = token;
	} else {
		switch (req.hostname) {
	    case 'mccrager.com':
	      requestOptions = alsAnonSearchOptions;
	      break;

			case 'taplist.lititzcraftbeerfest.com':
				requestOptions = taplistAnonSearchOptions;
				break;

	    default:
				responses.sendError(res, {
					desc: responses.exceptions.hostnameError,
					code: 500
				});
				return;
	      break;
	  }
	}

	// fetch from untappd, store in db if not authenticated, and write out the response
	requestOptions.qs.q = encodeURIComponent(beer.brewery + ' ' + beer.name);

	// fire off request to untappd search api
	request(requestOptions, function (error, response, json) {
		if (!error && response.statusCode === 200) {
			if (json.response.found > 0 && json.response.beers.items.length > 0) {
				result = json.response.beers.items[0].beer;
				result.brewery = json.response.beers.items[0].brewery;
				result.checkin_count = json.response.beers.items[0].checkin_count;
				result.have_had = json.response.beers.items[0].have_had;
				result.your_count = json.response.beers.items[0].your_count;
				if (result.brewery.contact.url.indexOf('http') != 0) {
					result.brewery.contact.url = 'http://' + result.brewery.contact.url;
				}

				var beerRecord = {
					brewery: beer.brewery,
					name: beer.name,
					data: result,
					created: new Date(),
					fetchMethod: 'untappd'
				};

				if (token) {
					responses.sendSuccess(res, beerRecord, true);
				} else {
					// persist to db
					db.collection.save(beerRecord, function(err, doc) {
						// handle exception from save
						if (err) {
							responses.sendError(res, {
								desc: responses.exceptions.databaseError,
								code: 500,
								error: err
							});
							return;
						}

						responses.sendSuccess(res, doc, true);
						// log the persisted beer
						console.log('new beer persisted: ' + doc.brewery + ' ' + doc.name);
					});
				}
			} else {
				responses.sendError(res, {
					desc: responses.exceptions.untappdSearchError,
					code: 404,
					query: requestOptions.qs.q
				});
			}
		} else {
			responses.sendError(res, {
				desc: responses.exceptions.untappdError,
				code: 500,
				response: response,
				error: error
			});
		}

		// unset the access_token
		authSearchOptions.qs.access_token = '';
	});
}

function databaseSearch(req, res, beer) {
	var result = {},
	    db = mongojs('beer', ['collection']);

	// look up beer in db
	db.collection.findOne({
		brewery: beer.brewery,
		name: beer.name
	}, function(err, doc) {
		// handle exception from query
		if (err) {
			responses.sendError(res, {
				desc: responses.exceptions.databaseError,
				code: 500,
				error: err
			});
			return;
		}

		// if we got a result from the db, write out the record
		// otherwise do an anon untappd search
		if (doc) {
			result = doc;
			result.fetchMethod = 'mongodb';
			responses.sendSuccess(res, result, true);
		} else {
			untappdSearch(req, res, beer);
		}
	});
}

// app bootstrap
var app = express();
app.use(cookieParser());

/*
 * Process OAuth login callback from untappd.
 * Action: GET
 * Params: code, the unique code value to be sent to untappd to validate the OAuth communication.
 */
app.get('/nodejs/beer/login', function (req, res) {
	// handle callback and get unique code from untappd
	var code = req.query.code,
			requestOptions,
			redirectPath;

	// if we didn't get a code bail out
	if (!code) {
		responses.sendError(res, {
			desc: responses.exceptions.untappdLoginError,
			code: 500,
			request: request
		});
		return;
	}

	// set hostname specific values
	switch (req.hostname) {
		case 'mccrager.com':
			requestOptions = alsLoginOptions;
			redirectPath = '/beer/als';
			break;

		case 'taplist.lititzcraftbeerfest.com':
			requestOptions = taplistLoginOptions;
			redirectPath = '/';
			break;

		default:
			responses.sendError(res, {
				desc: responses.exceptions.hostnameError,
				code: 500
			});
			return;
			break;
	}

	// add the code to login request options
	requestOptions.qs.code = code;

	// fire off request to untappd login api with unique code
	request(requestOptions, function (error, response, json) {
		if (!error && response.statusCode === 200 &&
			   json.meta.http_code === 200 && json.response.access_token) {
			// get response and set json cookie with token (expires in 30 days)
			res.cookie('untappdToken', json.response.access_token, {maxAge: 30*24*60*60*1000});
			console.log('a user has logged in!' + '\n');

			// redirect to main page
			responses.sendRedirect(res, {
				location: redirectPath
			});
		} else {
			responses.sendError(res, {
				desc: responses.exceptions.untappdError,
				code: 500,
				response: response,
				error: error
			});
		}
	});
});

/*
 * Process Logout by clearing the untappdToken cookie.
 * Action: GET
 * Params: none.
 */
app.get('/nodejs/beer/logout', function (req, res) {
	res.clearCookie('untappdToken');
	console.log('a user has logged out!' + '\n');

  switch (req.hostname) {
    case 'mccrager.com':
      responses.sendRedirect(res, {
        location: '/beer/als'
      });
      break;

    default:
      responses.sendRedirect(res, {
        location: '/'
      });
			break;
  }
});

/*
 * Search for a beer by brewery + name.
 * Action: GET
 * Params: brewery, the name of the brewery
 *         name, the name of the beer
 */
app.get('/nodejs/beer/search', function (req, res) {
	if (req.query.brewery && req.query.name) {
		// sanitize the query string input
		var beer = {
			brewery: decodeURIComponent(req.query.brewery),
			name: decodeURIComponent(req.query.name)
		};
		// apply conversions to the beer input
		converter.handle(beer);
		beer.brewery = utils.trim(beer.brewery);
		beer.name = utils.trim(beer.name);

		// check for token in cookie
		// always do an untappd search if logged in
		// otherwise check local db cache before doing anon untappd search
		var token = req.cookies.untappdToken;
		if (token) {
			untappdSearch(req, res, beer, token);
		} else {
			databaseSearch(req, res, beer);
		}
	} else {
		responses.sendError(res, {
			desc: responses.exceptions.queryError,
			code: 500
		});
	}
});

/*
 * Get the full list of beers.
 * Action: GET
 * Params: none
 */
app.get('/nodejs/beer', function (req, res) {
	var results = [];

	request(listOptions, function (error, response, html) {
		if (!error && response.statusCode === 200) {
			var $ = cheerio.load(html);

			var titles = $('#feature .row h2');

			// loop over the tables that represent beer lists
			$('#feature .row table').each(function(tableIndex, beerTable) {

				var $beerTable = $(beerTable),
						// result object to be added to the results array
						result = {},
						// get the title for this beerTable
						title = $(titles[tableIndex]).text(),
						// array to add beers in this table to
						beers = [];

				// don't add wine, can, or keg list at this time
				if (title === 'WINE LIST' ||
				    title === 'CANS AVAILABLE' ||
					title === 'KEGS AVAILABLE') {
							return true;
				}

				// loop over the beer rows in this table
				$beerTable.find('tbody > tr').each(function(rowIndex, beerRow) {
					var $beerRow = $(beerRow),
							beer = utils.createBeer(rowIndex),
							cellCount = $beerRow.find('td').length,
							// hack to handle varying cell amounts for draft beer vs. all others
							cellIndexModifier = (cellCount === 4 ? 1 : 0);

					// loop over the beer cells in this row
					$beerRow.find('td').each(function(cellIndex, beerCell) {
						var $beerCell = $(beerCell),
								cellValue = utils.trim($beerCell.text());
								cellIndex = $beerCell.index() + cellIndexModifier;

						// populates the passed in beer object by mapping cell text to beer properties
						utils.mapBeerValues(cellIndex, cellValue, beer);
					});

					// add beer object to beers array
					beers.push(beer);
				});

				// set the title for this beerTable
				result.title = utils.trim(title);
				result.title = utils.toLower(title);
				// set the resulting beers array
				result.beers = beers;
				// capture the current time this list was generated
				result.timestamp = new Date();
				// push the finalized result in the overall results array
				results.push(result);
			});

			responses.sendSuccess(res, results.reverse(), true);
		} else {
			responses.sendError(res, {
				desc: responses.exceptions.alsError,
				code: 500,
				response: response,
				error: error
			});
		}
	});

	// log usage
	console.log(req.headers['x-forwarded-for'] + '\n' + req.headers['user-agent'] + '\n');
});

// app startup
app.listen(process.env.PORT);
