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
			addl: '',
			brewery: '--',
			style: '--',
			abv: '--',
			kicked: true
		};
	},

	// parses the "ABV" text to return just the floating point 
	// value with two decimal places
	parseABV: function(s) {
		if (typeof s === 'string') { 
			s = s.replace('ABV:', '').replace(' ', '').replace('%', '');
		}
		return parseFloat(s).toFixed(2);
	},

	// parses the "last updated" text to remove the prefix label
	parseLastUpdated: function(s) {
		if (typeof s === 'string') { 
			s = s.replace('Last Update: ', '');
		}
		return s;
	}
};