/*
controllers.js
Controller module for the angular BeersApp

Copyright (c) 2014

Patrick Crager

*/

angular.module('BeersApp.controllers', []).

controller('mainController', function($scope) {
  
  // collapses the expanded navigation bar
  $scope.collapseNav = function() {
    $('.collapse.in').collapse('hide');
  };

}).

controller('beersController', function($scope, $beerAPIservice, $modal) {

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

  // fetch the beers through the list() service call
  document.getElementById('attribution').style.display = 'none';
  $beerAPIservice.list().
  success(function(data) {
    // sort holds initial sorting values for each list
    angular.forEach(data, function(beerList, index) {
      beerList.sort = {
        column: 'brewery',
        descending: false
      };
    });
    $scope.beersList = data;

    // remove the loading indication and show the main content
    document.getElementById('loading').style.display = 'none';
    document.getElementById('main').style.display = 'inherit';
    document.getElementById('attribution').style.display = 'inherit';
  }).
  error(function(error) {
    document.getElementById('loading').style.display = 'none';
    alert('Something went wrong when getting the Al\'s beer list!\n\nRefresh and try again.');
  });

  // enhances the numbering of "special" beer lists depending on title of list: cask, bottles, etc.
  $scope.prependBeerNumber = function(number, title) {
      var prepend = ''

      if (title.indexOf('cask') > -1) { 
        // F is for firkin/cask!
        prepend = 'F'; 
      }
      if (title.indexOf('bottle') > -1) { 
        // B is for bottle!
        prepend = 'B'; 
      }

      return prepend + number;
  };

  // updates "sort" variable onclick of table headings
  $scope.changeSorting = function(sort, column) {
      if (sort.column == column) {
        sort.descending = !sort.descending;
      } else {
        sort.column = column;
        sort.descending = false;
      }
  };

  // returns the appropriate CSS class for the sort direction
  $scope.sortClass = function(sort, column) {
    if (column !== sort.column) { return; }

    if (!sort.descending) {
      return 'glyphicon-sort-by-attributes';
    } else {
      return 'glyphicon-sort-by-attributes-alt';
    }
  };

  // calls the search API and opens a modal window upon success
  $scope.search = function(beer) {
    document.getElementById('overlay').style.display = 'inherit';

    $beerAPIservice.search(beer.brewery, beer.name).
    success(function(data) {
      var modal = $modal.open({
        templateUrl: 'templates/searchResultModal.html',
        controller: 'searchResultController',
        resolve: {
          beer: function() { return data; }
        }
      });
      modal.result.finally(function() {
        document.getElementById('overlay').style.display = 'none';
      });
    }).
    error(function(error) {
      if (error.code === 404) {
        alert('Beer couldn\'t be found on Untappd.\nSorry!');
      } else {
        alert('Something went wrong when looking up this beer!\nPlease try again.');
      }

      document.getElementById('overlay').style.display = 'none';
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
