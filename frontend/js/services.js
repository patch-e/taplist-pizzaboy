angular.module('BeersApp.services', []).
  factory('beerAPIservice', function($http) {

    var beerAPI = {};

    beerAPI.getBeers = function() {
      return $http({
        method: 'GET',
        url: '/nodejs/beer'
      });
    }

    return beerAPI;
  });