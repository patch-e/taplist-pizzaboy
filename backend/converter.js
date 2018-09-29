/*
converter.js
Module that provides functions to conversion tweaks to beers that better match the Untappd search database

Copyright (c) 2015

Patrick Crager

*/

module.exports = {

	handle: function(beer) {
		beer.brewery = beer.brewery
			// only consider the string to the left of a forward slash or ampersand,
			// common with collab beers that untappd tends to screw up with when searching on
			.replace(/(\/|&).+$/g, '')
			// additional brewery fixes on a case-by-case basis
			.replace('Fetish* Brewing', 'Fetish Artisanal Ales')
			.replace('Sir Charles Hard Cider', 'Original 13 Ciderworks')
			;

		beer.name = beer.name
			// remove any bracketed special text in the name, [NITRO], [FIRKIN], [SOUR] etc.
			.replace(/ *\[[^)]*\] */g, '')
			// remove special hyphen'd text sometimes added to the end as a special notice, ex. BEERNAME -LAST KEG!!
			.replace(/ (-).+$/g, '')
			// additional name fixes on a case-by-case basis
			.replace('8OZ', '')
			.replace('Weizen', '"Weizen"')
			.replace('Firestone Lager', '"Firestone Lager"')
			.replace('Tripel', 'Tripel (2018)')
			;
	}

};
