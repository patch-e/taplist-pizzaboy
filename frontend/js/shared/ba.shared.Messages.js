/*
ba.shared.messages.js
Constant messages used by BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.shared').constant('messages', {

    BA_NO_RESULTS: 'No beers match entered filter criteria.',
    BA_LIST_ERROR: 'Something went wrong when getting the beer list!\n\nRefresh and try again.',
    BA_UNTAPPD_SEARCH_NOT_FOUND: 'Beer couldn\'t be found on Untappd.\nSorry!',
    BA_UNTAPPD_SEARCH_ERROR: 'Something went wrong when looking up this beer!\nPlease try again.',
    BA_UNTAPPD_TOKEN_EXPIRED: 'Your login token has expired, you will now be logged out.',

  });

})();
