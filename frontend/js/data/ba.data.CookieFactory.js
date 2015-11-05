/*
ba.data.cookieFactory.js
Provides cookie related services to BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.data').factory('cookieFactory', cookieFactory);

  cookieFactory.$inject = ['$cookies'];

  function cookieFactory($cookies) {
    var factory = {
      isAuthenticated: !!(($cookies.get('untappdToken') || '').length)
    };

    return factory;
  }

})();
