/*
beer.js
Provides JSON data that represents a list of beers on tap, in firkins, 
and in special bottles for sale at Al's of Hampden in Enola, PA

Copyright (c) 2014

Patrick Crager

*/

// required modules
var http = require('http'),
		express = require('express'),
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
		searchOptions = {
			url: 'https://api.untappd.com/v4/search/beer',
			json: true,
			qs: {
				client_id: process.env.untappdClientID,
				client_secret: process.env.untappdClientSecret,
				limit: 1
			}
		};

// app bootstrap
var app = express();

/*
 * Search for a beer by brewery + name.
 * Action: GET
 * Params: brewery, the name of the brewery
 *         name, the name of the beer
 */
app.get('/nodejs/beer/search', function (req, res) {
	var result = {};

	if (req.query.brewery && req.query.name) {
		// sanitize the query string input
		var beer = {
			brewery: decodeURIComponent(req.query.brewery),
			name: decodeURIComponent(req.query.name),
		}
		// apply conversions to the beer input
		converter.handle(beer);

		// get a hook to the database
		var db = mongojs('beer', ['collection']);

		// look up beer in db
		db.collection.findOne({
			brewery: utils.trim(brewery),
			name: utils.trim(name)
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
			if (doc) {
				result = doc;
				result.fetchMethod = 'mongodb';
				responses.sendSuccess(res, result, true);
			} else {
				// if not found, fetch from untappd, store in db, and write out the response
				searchOptions.qs.q = encodeURIComponent(brewery + ' ' + name);

				// fire off request to untappd search api
				request(searchOptions, function (error, response, json) {
					if (!error && response.statusCode === 200) {
						if (json.response.found > 0 && json.response.beers.items.length > 0) {
							result = json.response.beers.items[0].beer;

							// persist to db
							db.collection.save({
								brewery: brewery, 
								name: name, 
								data: result,
								created: Date.now()
							}, function(err, doc) {
								doc.fetchMethod = 'untappd';
								responses.sendSuccess(res, doc, true);
								// log the persisted beer
								console.log('new beer persisted: ' + doc.brewery + ' ' + doc.name);
							});	
						} else {
							responses.sendError(res, {
								desc: response.exceptions.untappdSearchError,
								code: 404,
								query: searchOptions.qs.q
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
				});
			}
		});
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
								cellIndex = $beerCell.index() + cellIndexModifier;
								cellValue = utils.trim($beerCell.text());

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
