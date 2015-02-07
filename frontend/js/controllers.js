/*
controllers.js
Controller module for the angular BeersApp

Copyright (c) 2014

Patrick Crager

*/

angular.module('BeersApp.controllers', []).

controller('mainController', function($scope) {

  // html fragments
  $scope.templates = { 
    helpModal: {url: 'templates/helpModal.html'},
    aboutModal: {url: 'templates/aboutModal.html'}
  };

}).

controller('beersController', function($scope, beerAPIservice, $modal) {

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

  // fetch the beers through the list() service call
  beerAPIservice.list().
  success(function(data) {
    $scope.beersList = data;

    // remove the background color, loading indication, and show the main content
    document.body.className = '';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('main').style.display = 'block';
  }).
  error(function(error) {
    document.getElementById('loading').style.display = 'none';
    alert('Something went wrong when getting the Al\'s beer list!\n\nRefresh and try again.');
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

  // calls the search API and opens a modal window upon success
  $scope.search = function(beer) {
    beerAPIservice.search(beer.brewery, beer.name).
    success(function(data) {
      var modalInstance = $modal.open({
        templateUrl: 'templates/searchResultModal.html',
        controller: 'searchResultController',
        resolve: { beer: function() { return data; } }
      });
    }).
    error(function(error) {
      if (error.code === 404) {
        alert('This beer couldn\'t be located on untappd.\nSorry!');
        return;
      }
      alert('Something went wrong when looking up this beer!\nPlease try again.');
    });
  };

}).

controller('searchResultController', function($scope, $modalInstance, beer) {

  $scope.beer = beer;

  // close the modal
  $scope.close = function () {
    $modalInstance.dismiss();
  };

  // try to launch untappd to the beer's page if on a mobile phone
  // otherwise launch the default browser to the beer on untappd's website
  $scope.checkin = function(bid) {
    var isMobile = /(iPhone|Android|IEMobile)/.test(navigator.userAgent);
    if (isMobile) {
      document.location = 'untappd:///?beer=' + bid;
    } else {
      window.open('http://untappd.com/beer/' + bid);
    }
  };

});
