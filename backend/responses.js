/*
resonses.js
Module that provides response functions to mccrager nodejs apps

Copyright (c) 2015

Patrick Crager

*/

module.exports = {

	// send successful JSON response
	sendSuccess: function(res, data, cached) {
		var headers = {
			'Content-Type': 'application/json'
		}

		if (cached) {
			headers['Cache-Control'] = 'max-age=300';
		}

		res.writeHead(200, headers);
		res.end(JSON.stringify(data));
	},

	// send error JSON response
	sendError: function(res, error) {
		var headers = {
			'Content-Type': 'application/json'
		}

		res.writeHead(error.code, headers);
		res.end(JSON.stringify(error));

		// error logging
		console.error(error.desc);
	}

};
