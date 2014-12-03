/*
beer.js
Provides JSON data that represents a list of beers on tap, in firkins, 
and in special bottles for sale at Al's of Hampden in Enola, PA

Copyright (c) 2014

Patrick Crager

*/

var http = require('http');

var server = http.createServer(function (req, res) {
	var request = require('request'),
			cheerio = require('cheerio'),
			console = require('clim')(),
			utils   = require('./utils'),
			results = [],
			options = {
				url: 'http://www.pizzaboybrewing.com/on-tap/',
				json: true
			};

	request(options, function (error, response, html) {
		if (!error && response.statusCode === 200) {
			var $ = cheerio.load(html);

			var titles = $('#beer-menu-list h2');

			// loop over the tables that represent beer lists
			$('#beer-menu-list table').each(function(tableIndex, beerTable) {

				var $beerTable = $(beerTable),
						// result object to be added to the results array
						result = {},
						// get the title for this beerTable
						title = $(titles[tableIndex]).text(),
						// array to add beers in this table to
						beers = [];

				// loop over the beer rows in this table
				$beerTable.find('tbody > tr').each(function(rowIndex, beerRow) {
					var $beerRow = $(beerRow);

					var beer = {
						number: rowIndex + 1,
						name: '',
						addl: '',
						brewery: '',
						style: '',
						abv: 0,
						growler: false
					};

					var cellCount = $beerRow.find('td').length,
							// hack to handle varying cell amounts for tap list vs. all others
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
				// set the resulting beers array
				result.beers = beers;
				// push the finalized result in the overall results array
				results.push(result);
			});

			// set the response values
			res.writeHead(200, {
					'Content-Type': 'application/json',
					'Cache-Control': 'max-age=300'
			});
			res.end(JSON.stringify(results.reverse()));
		} else {
			// error logging
			console.error('status code' + response.statusCode);
			console.error(error);
		}
	});

	// log usage
	console.log(req.headers['x-forwarded-for'] + '\n' + req.headers['user-agent'] + '\n\n');
});

server.listen(process.env.PORT);
