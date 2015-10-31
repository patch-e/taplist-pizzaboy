/*
ba.data.DataFactory.js
Wraps $http to provide data to BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.data')
  .factory('BeerDataFactory', ['$http', BeerDataFactory]);

  function BeerDataFactory($http) {
    var factory = {
      list: list,
      search: search
    };

    function list() {
      return $http.get('/nodejs/beer');
    }

    function search(b, n) {
      return $http.get('/nodejs/beer/search', {
        params: {
          brewery: b,
          name: n
        }
      });
    }

    return factory;
  }

})();
