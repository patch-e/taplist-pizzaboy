/*
utils.js
Module that provides utility functions to beer.js

Copyright (c) 2014

Patrick Crager

*/

module.exports = {
	// type safe trim function
	// returns a trimmed string
	trim: function(s) {
		// only invoke trim() if a string was passed in
		if (typeof s === 'string') { 
			s = s.trim().replace('\n', '').replace('\t', '');
		}
		return s;
	},

	// returns a "kicked" beer object
	getKickedBeer: function(i) {
		return {
			number: i,
			name: 'KICKED!',
			addl: null,
			brewery: '--',
			style: '--',
			abv: '--',
			kicked: true
		};
	},

	// parses the "ABV" text to return a floating point value to two decimal places
	parseABV: function(s) {
		if ( (typeof s === 'string') && (s.lastIndexOf('ABV:', 0) === 0) ) { 
			s = s.replace('ABV:', '').replace(' ', '').replace('%', '');
		}
		return parseFloat(s).toFixed(2);
	},

	// parses the "last updated" text to remove the prefix label
	parseLastUpdated: function(s) {
		if ( (typeof s === 'string') && (s.lastIndexOf('Last Update:', 0) === 0) ) { 
			s = s.replace('Last Update:', '').replace(' ', '');
		}
		return s;
	},

	// parses the "title" text to remove any beer prefixes
	parseTitle: function(s) {
		if ( (typeof s === 'string') && (s.lastIndexOf('Beers', 0) === 0) ) { 
			s = s.replace('Beers', '').replace(' ', '');
		}
		return s;
	}
};