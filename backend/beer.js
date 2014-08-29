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
			$('table.hv_gridtable').each(function(index, beerTable) {
				var $beerTable = $(beerTable),
						// result object to be added to the results array
						result = {},
						// get the title for this beerTable
						title = $beerTable.find('.hv_gridheader').html().trim(),
						// get the last updated timestamp for this beerTable
						lastUpdated = $beerTable.next().text(),
						// array to add beers in this set to
						beers = [];

				// loop over the beers in this set
				$beerTable.find('.hv_gridbeercell').each(function(index, beerCell) {
					var $beerCell = $(beerCell),
							beer;

					// get the current beer's data
					if ($beerCell.find('.hv_gridbeername').length > 0) {
						var name = $beerCell.find('.hv_gridbeername').text(),
								addl = $beerCell.find('.hv_gridbeeraddl').text(),
								brewery = $beerCell.find('.hv_gridbreweryname').text(),
								styles = $beerCell.find('.hv_gridbeerstyle'),
								style = '',
								abv = '';
						// there are either one or two "style" values associated to a beer
						// 1. the actual style
						// 2. the ABV
						// If we have two, assume the second is ABV
						if (styles.length > 1) {
							style = $beerCell.find('.hv_gridbeerstyle').eq(0).text();
							abv = $beerCell.find('.hv_gridbeerstyle').eq(1).text();
						} else {
							style = $beerCell.find('.hv_gridbeerstyle').eq(0).text();
						}

						// create a beer object from the parsed data
						beer = {
							number: index + 1,
							name: utils.trim(name),
							addl: utils.trim(addl),
							brewery: utils.trim(brewery),
							style: utils.trim(style),
							abv: utils.parseABV(utils.trim(abv)),
							kicked: false
						};
					} else {
						// create a "kicked" beer object for this kicked beer
						beer = utils.getKickedBeer(index);
					}

					// add beer object to beers array
					beers.push(beer);					
				});

				// set the title for this beerTable
				result.title = title;
				// set the last updated timestamp for this beerTable
				result.lastUpdated = utils.parseLastUpdated(lastUpdated);
				// set the resulting beers array
				result.beers = beers;
				// push the finalized result in the overall results array
				results.push(result);
			});

			// set the response values
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(results.reverse()));
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