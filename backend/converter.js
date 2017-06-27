/*
converter.js
Module that provides functions to conversion tweaks to beers that better match the Untappd search database

Copyright (c) 2015

Patrick Crager

*/

module.exports = {

	handle: function(beer) {
		beer.brewery = beer.brewery
			.replace('PIZZA BOY/ TROEGS/ ABC', 'TROEGS/PIZZA BOY/ABC')
			// only consider the string to the left of a forward slash or ampersand,
			// common with collab beers that untappd tends to screw up with when searching on
			.replace(/(\/|&).+$/g, '')
			// additional brewery fixes on a case-by-case basis
			.replace('OSKARBLUES', 'OSKAR BLUES')
			.replace('THE RAVEN', 'BALTIMORE-WASHINGTON BEER WORKS')
			;

		beer.name = beer.name
			.replace('HOPVISION -', 'HOPVISION')
			// remove any bracketed special text in the name, [NITRO], [FIRKIN], [SOUR] etc.
			.replace(/ *\[[^)]*\] */g, '')
			// remove special hyphen'd text sometimes added to the end as a special notice, ex. BEERNAME -LAST KEG!!
			.replace(/ (-).+$/g, '')
			// additional name fixes on a case-by-case basis
			.replace('2013', '')
			.replace('2014', '')
			.replace('2015', '')
			.replace('2016', '')
			.replace('8OZ', '')
			.replace('LEGENDAIRY-PEACHES', 'LEGENDAIRY - PEACHES')
			.replace('LEGENDAIRY-PINEAPPLES', 'LEGENDAIRY - PINEAPPLES')
			.replace('LEGENDAIRY-STRAWBERRY', 'LEGENDAIRY - STRAWBERRY')
			.replace('LEMONDAIRY IPA- LEMON', 'LEMON DAIRY')
			.replace('HOG IN HEAT! HOT!', 'HOG IN HEAT')
			.replace('DREAM-ROOT BEER FLOAT', 'DREAM ROOT BEER')
			.replace('JAI-ALAI', 'JAI ALAI')
			.replace('MELONOUS IPA', 'MELONOUS')
			.replace("DALE'S IPA", "DALE'S")
			.replace("GINGER APPLES CIDER", "GINGER APPLES")
			.replace('MADRA ALTA', 'MADRA ALLTA')
			.replace('BLOSSOM HONEY LAGER', 'BLOSSOM HONEY')
			.replace('BRAAAAINS', 'BRAAAIINS')
			.replace('WEED EATER', 'WEEDEATER')
			.replace('WEED EATER', 'WEEDEATER')
			;
	}

};
