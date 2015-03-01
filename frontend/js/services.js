/*
services.js
Services module for the angular BeersApp

Copyright (c) 2014

Patrick Crager

*/

angular.module('BeersApp.services', []).
factory('$beerAPIservice', function($http) {

  var beerAPI = {};

  // list provides the JSON beer list
  beerAPI.list = function() {
    return $http({
      method: 'GET',
      url: '/nodejs/beer'
    });
  };

  // search provides the JSON beer search result
  beerAPI.search = function(brewery, name) {
    return $http({
      method: 'GET',
      url: '/nodejs/beer/search',
      params: {
      	brewery: brewery,
      	name: name
      }
    });
  };

  return beerAPI;

});
