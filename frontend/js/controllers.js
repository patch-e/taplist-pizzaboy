/*
controllers.js
Controller module for the angular BeersApp

Copyright (c) 2014

Patrick Crager

*/

angular.module('BeersApp.controllers', []).
controller('beersController', function($scope, beerAPIservice) {

  $scope.searchFilter = null;
  $scope.beersList = [];

  beerAPIservice.getBeers().success(function (response) {
    $scope.beersList = response;
    
    // remove the loading indication
    document.getElementById('loading').style.display = 'none';
    document.body.className = '';    
  });

});