/*
controllers.js
Controller module for the angular BeersApp

Copyright (c) 2014

Patrick Crager

*/

angular.module('BeersApp.controllers', []).
controller('beersController', function($scope, beerAPIservice) {

  // list of table headings for table view
  $scope.headings = [
    {display: '#',       column: 'number'},
    {display: 'Name',    column: 'name'},
    {display: 'Brewery', column: 'brewery'},
    {display: 'Style',   column: 'style'},
    {display: 'ABV',     column: 'abv'}
  ];

  // variable to hold current filter input
  $scope.searchFilter = null;

  // array that is populated after API call finishes
  $scope.beersList = [];

  // sorting functionality
  $scope.sort = {
    column: 'number',
    descending: false
  };
  $scope.changeSorting = function(column) {
      var sort = $scope.sort;
      if (sort.column == column) {
        sort.descending = !sort.descending;
      } else {
        sort.column = column;
        sort.descending = false;
      }
  };  

  // fetch the beers through the getBeers() service call
  beerAPIservice.getBeers().success(function(response) {
    $scope.beersList = response;
    
    // remove the background color, loading indication, and show the main content
    document.body.className = '';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('main').style.display = 'block';
  });

});