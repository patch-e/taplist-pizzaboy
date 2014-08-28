/*
beer.js

Copyright (c) 2014

Patrick Crager

*/

var http = require('http');

var server = http.createServer(function (req, res) {
	var request = require('request'),
		cheerio = require('cheerio'),
		console = require('clim')(),
		utils = require('./utils'),
		results = [],
		options = {
			url: 'http://alsofhampden.com/verify.php',
			jar: true,
			json: true,
			qs: {'over21': '1', 'redirect': 'beerlist.php'}
		};

	request(options, function (error, response, html) {
		if (!error && response.statusCode === 200) {
			var $ = cheerio.load(html);

			// loop over the hv_gridtables that represent beer sets
			$('table.hv_gridtable').each(function(index, beerSet) {
				var $beerSet = $(beerSet),
						// result object to be added to the results array
						result = {},
						// get the title for this beerSet
						title = $beerSet.find('.hv_gridheader').html().trim(),
						// array to add beers in this set to
						beers = [];

				// loop over the beers in this set
				$beerSet.find('.hv_gridbeercell').each(function(index, beer) {
					var $beer = $(beer),
							beer;

					// get the current beer's data
					if ($beer.find('.hv_gridbeername').length > 0) {
						var name = $beer.find('.hv_gridbeername').html(),
								addl = $beer.find('.hv_gridbeeraddl').html(),
								brewery = $beer.find('.hv_gridbreweryname').html(),
								styles = $beer.find('.hv_gridbeerstyle'),
								style = '',
								abv = '';
						// there are either one or two "style" values associated to a beer
						// 1. the actual style
						// 2. the ABV
						// If we have two assume, the second is ABV
						if (styles.length > 1) {
							style = $beer.find('.hv_gridbeerstyle').eq(0).html();
							abv = $beer.find('.hv_gridbeerstyle').eq(1).html();
						} else {
							style = $beer.find('.hv_gridbeerstyle').eq(0).html();
						}

						// create a beer object from the parsed data
						beer = {
								'number': index + 1,
								'name': utils.trim(name),
								'addl': utils.trim(addl),
								'brewery': utils.trim(brewery),
								'style': utils.trim(style),
								'abv': utils.trim(abv),
								'kicked': false
						};
					} else {
						// create a "kicked" beer object for this kicked beer
						beer = {
								'number': index + 1,
								'name': 'KICKED!',
								'addl': '',
								'brewery': '--',
								'style': '--',
								'abv': '--',
								'kicked': true
						};
					}

					// add beer object to beers array
					beers.push(beer);					
				});

				// set the title for this beerSet
				result.title = title;
				// set the resulting beers array
				result.beers = beers;
				// push the finalized result in the overall results array
				results.push(result);
			});

			// set the response values
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(results));
		} else {
			// error logging
			console.error('status code' + response.statusCode);
			console.error(error);
		}
	});

	// log usage
	console.log(req.headers['x-forwarded-for'] + '\n' + req.headers['user-agent']);
});

server.listen(process.env.PORT);  