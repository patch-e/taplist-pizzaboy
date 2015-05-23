/*
utils.js
Module that provides utility functions to mccrager nodejs apps

Copyright (c) 2014

Patrick Crager

*/

module.exports = {

	addlRegEx: /\(([^()]+)\)$/,
	nitroLabel: '[NITRO]',
	firkinLabel: '[FIRKIN]',
	sourLabel: '[SOUR]',

	// type safe lowercase function
	// returns a lowercased string
	toLower: function(s) {
		// only invoke toLowerCase() if a string was passed in
		if (typeof s === 'string') {
			s = s.toLowerCase();
		}
		return s;
	},

	// type safe trim function
	// returns a trimmed string with continuous spaces replaced with a single space
	trim: function(s) {
		// only invoke trim() if a string was passed in
		if (typeof s === 'string') {
			s = s.trim().replace('\n', '').replace('\t', '').replace(/\s+/g,' ');
		}
		return s;
	},

	// parses the "ABV" text to return a floating point value
	parseABV: function(s) {
		if (typeof s === 'string') {
			s = s.replace('ABV:', '').replace(' ', '').replace('%', '');
		}
		return parseFloat(s);
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
	},

	// parses the name text to extract "additional" text in parens
	parseAdditional: function(s) {
		s = s.match(this.addlRegEx) || [''];
		return s[0].replace('(', '').replace(')', '');
	},

	// parses the name text to remove "additional" text in parens
	// also performs additional fixes for bad escaping and undesireable placement of labels
	parseName: function(s) {
		// remove the "additional" text
		s = s.replace(this.addlRegEx, '');

		// found this ugliness of an escaped backslash followed by an escaped quote on a beer name
		// ex: Mean Cup O\\\'Stout - this fixes that to Mean Cup O\'Stout
		s = s.replace('\\\'', '\'');

		// moves any prefixed label to the end of the string
		if (s.lastIndexOf(this.nitroLabel) > -1) {
			s = s.replace(this.nitroLabel, '');
			s = s + ' ' + this.nitroLabel;
			s = this.trim(s);
		}
		if (s.lastIndexOf(this.firkinLabel) > -1) {
			s = s.replace(this.firkinLabel + '-', '');
			s = s.replace(this.firkinLabel, '');
			s = s + ' ' + this.firkinLabel;
			s = this.trim(s);
		}
		if (s.lastIndexOf(this.sourLabel) > -1) {
			s = s.replace(this.sourLabel, '');
			//s = s + ' ' + this.sourLabel;
			s = this.trim(s);
		}

		return s;
	},

	createBeer: function(index) {
		return {
			number: index + 1,
			name: '',
			addl: '',
			brewery: '',
			style: '',
			abv: 0,
			growler: false
		};
	},

	// maps values to properties of the beer object depending on index
	mapBeerValues: function(index, value, beer) {
		switch(index) {
			case 0:
				beer.number = parseInt(value, 10);
				break;
			case 1:
				beer.brewery = value;
				break;
			case 2:
				beer.name = this.parseName(value);
				beer.addl = this.parseAdditional(value);
				break;
			case 3:
				beer.style = value;
				break;
			case 4:
				beer.abv = this.parseABV(value);
				break;
			case 5:
				beer.growler = (value.toUpperCase() === 'YES' ? true : false);
				break;
		}
	},

	formatDate: function(date, format) {
		var dateParts = {
			// month (zero based)
			'M+' : date.getMonth() + 1,
			// day
			'd+' : date.getDate(),
			// hour
			'h+' : date.getHours(),
			// minute
			'm+' : date.getMinutes(),
			// second
			's+' : date.getSeconds(),
			// quarter
			'q+' : Math.floor((date.getMonth() + 3) / 3),
			// millisecond
			'S'  : date.getMilliseconds()
		}

		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		}

		for (var part in dateParts) {
			if (new RegExp('(' + part + ')').test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? dateParts[part] : ('00' + dateParts[part]).substr(('' + dateParts[part]).length));
			}
		}

		return format;
	}

};
