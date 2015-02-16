/*
converter.js
Module that provides functions to conversion tweaks to beers that better match the Untappd search database

Copyright (c) 2015

Patrick Crager

*/

module.exports = {

	handle: function(beer) {
		beer.brewery = beer.brewery.
			// replace forward slashes with a space, common with collab beers
			replace('/', ' ').
			// additional brewery fixes on a case-by-case basis
			replace('OSKARBLUES', 'OSKAR BLUES');

		beer.name = beer.name.
			// remove any bracketed special text in the name, [NITRO], [FIRKIN], [SOUR] etc.
			replace(/ *\[[^)]*\] */g, '').
			// additional name fixes on a case-by-case basis
			replace('2013', '').
			replace('2014', '').
			replace('2015', '').
			replace('2016', '');
	}

};
