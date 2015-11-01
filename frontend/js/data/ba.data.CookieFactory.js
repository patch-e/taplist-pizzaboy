/*
ba.data.CookieFactory.js
Provides cookie related services to BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.data')
  .factory('CookieFactory', ['$cookies', CookieFactory]);

  function CookieFactory($cookies) {
    var factory = {
      isAuthenticated: !!(($cookies.get('untappdToken') || '').length)
    };

    return factory;
  }

})();
