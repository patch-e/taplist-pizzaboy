/*
controllers.js
Controller module for the angular BeersApp

Copyright (c) 2014

Patrick Crager

*/

angular.module('BeersApp.controllers', []).
controller('beersController', function($scope, beerAPIservice) {

  // html fragments
  $scope.templates = { 
    helpModal: {url: 'templates/helpModal.html'},
    aboutModal: {url: 'templates/aboutModal.html'}
  };

  // list of table headings for table view
  $scope.headings = [
    {display: '#',       column: 'number'},
    {display: 'Name',    column: 'name'},
    {display: 'Brewery', column: 'brewery'},
    {display: 'Style',   column: 'style'},
    {display: 'ABV',     column: 'abv'}
  ];

  // sorting functionality
  // sort holds initial sorting values
  $scope.sort = {
    column: 'number',
    descending: false
  };

  // variable to hold current filter input
  $scope.searchFilter = null;

  // array that is populated after API call finishes
  $scope.beersList = [];

  // fetch the beers through the getBeers() service call
  beerAPIservice.getBeers().success(function(response) {
    $scope.beersList = response;

    // remove the background color, loading indication, and show the main content
    document.body.className = '';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('main').style.display = 'block';
  });

  // updates "sort" variable onclick of table headings
  $scope.changeSorting = function(column) {
      var sort = $scope.sort;
      if (sort.column == column) {
        sort.descending = !sort.descending;
      } else {
        sort.column = column;
        sort.descending = false;
      }
  };
  // scrolls the page to the top in an animated fashion
  $scope.scrollToTop = function() {
    $('html, body').animate({scrollTop: 0}, 'slow');
    return false;
  };
  // collapses the expanded navigation bar
  $scope.collapseNav = function() {
    $('.collapse.in').collapse('hide');
  };
  // returns the appropriate CSS class for the sort direction
  $scope.sortClass = function(column) {
    if (column !== $scope.sort.column) { return; }
    if (!$scope.sort.descending) {
      return 'glyphicon-sort-by-attributes';
    } else {
      return 'glyphicon-sort-by-attributes-alt';
    }
  };

});
