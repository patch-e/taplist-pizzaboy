/*
services.js
Services module for the angular BeersApp

Copyright (c) 2014

Patrick Crager

*/

angular.module('BeersApp.services', []).
factory('beerAPIservice', function($http) {

  var beerAPI = {};

  // getBeers provides the JSON data to BeersApp
  beerAPI.getBeers = function() {
    return $http({
      method: 'GET',
      url: '/nodejs/beer'
    });
  }

  return beerAPI;

});