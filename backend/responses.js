/*
resonses.js
Module that provides response functions to mccrager nodejs apps

Copyright (c) 2015

Patrick Crager

*/

module.exports = {

	exceptions: {
		alsError: 'no response from alsofhampden',
		queryError: 'missing query string parameter(s)',
		databaseError: 'could not communicate with database',
		untappdError: 'no response from untappd',
		untappdLoginError: 'could not process untappd login',
		untappdSearchError: 'could not locate on untappd'
	},

	// send successful JSON response
	sendSuccess: function(res, data, cached) {
		var headers = {
			'Content-Type': 'application/json'
		};

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
		};

		// capture the current date/time
		var timestamp = new Date();
		error.timestamp = timestamp;

		// stringify what was passed in to log and send as the response
		var errorString = JSON.stringify(error);
		res.writeHead(error.code, headers);
		res.end(errorString);
		console.error(errorString + '\n');
	},

	// send redirect response via location header
	sendRedirect: function(res, data) {
		res.location(data.location);
		res.status(302).end();
	}

};
