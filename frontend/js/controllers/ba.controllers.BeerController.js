/*
ba.controllers.BeerController.js
Controller used for displaying beer data in BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.controllers')
  .controller('BeerController', ['BeerDataFactory', '$modal', 'Messages', BeerController]);

  function BeerController(BeerDataFactory, $modal, Messages) {
    // controller as
    var vm = this;

    // list of table headings for table view
    vm.headings = [
      {display: '#',       column: 'number'},
      {display: 'Name',    column: 'name'},
      {display: 'Brewery', column: 'brewery'},
      {display: 'Style',   column: 'style'},
      {display: 'ABV',     column: 'abv'}
    ];
    // array that is populated after API call finishes
    vm.beersList = [];

    // vm functions
    vm.prependBeerNumber = prependBeerNumber;
    vm.changeSorting = changeSorting;
    vm.sortClass = sortClass;
    vm.search = search;

    init();

    function init() {
      // fetch the beers through the list() service call
      document.getElementById('attribution').style.display = 'none';
      BeerDataFactory.list()
        .success(function(data) {
          // sort holds initial sorting values for each list
          angular.forEach(data, function(beerList, index) {
            beerList.sort = {
              column: 'brewery',
              descending: false
            };
          });
          vm.beersList = data;

          // remove the loading indication and show the main content
          document.getElementById('loading').style.display = 'none';
          document.getElementById('main').style.display = 'inherit';
          document.getElementById('attribution').style.display = 'inherit';
        })
        .error(function(error) {
          document.getElementById('loading').style.display = 'none';
          alert(Messages.BA_LIST_ERROR);
        });
    }

    // enhances the numbering of "special" beer lists depending on title of list: cask, bottles, etc.
    function prependBeerNumber(number, title) {
        var prepend = '';

        if (title.indexOf('cask') > -1) {
          // F is for firkin/cask!
          prepend = 'F';
        }
        if (title.indexOf('bottle') > -1) {
          // B is for bottle!
          prepend = 'B';
        }

        return prepend + number;
    }

    // updates "sort" variable onclick of table headings
    function changeSorting(sort, column) {
        if (sort.column == column) {
          sort.descending = !sort.descending;
        } else {
          sort.column = column;
          sort.descending = false;
        }
    }

    // returns the appropriate CSS class for the sort direction
    function sortClass(sort, column) {
      if (column !== sort.column) { return; }

      if (!sort.descending) {
        return 'glyphicon-sort-by-attributes';
      } else {
        return 'glyphicon-sort-by-attributes-alt';
      }
    }

    // calls the search API and opens a modal window upon success
    function search(beer) {
      document.getElementById('overlay').style.display = 'inherit';

      BeerDataFactory.search(beer.brewery, beer.name)
        .success(function(data) {
          var modal = $modal.open({
            templateUrl: 'templates/modalSearchResult.html',
            controller: 'SearchResultController',
            controllerAs: 'vm',
            resolve: {
              beer: function() { return data; }
            }
          });
          modal.result.finally(function() {
            document.getElementById('overlay').style.display = 'none';
          });
        })
        .error(function(error) {
          var errorType;
          if (error.response) {
              errorType = error.response.body.meta.error_type;
          }

          if (error.code === 404) {
            alert(Messages.BA_UNTAPPD_SEARCH_NOT_FOUND);
          } else if (errorType && errorType === 'invalid_token') {
            alert(Messages.BA_UNTAPPD_TOKEN_EXPIRED);
            window.location.replace('/nodejs/beer/logout');
          } else {
            alert(Messages.BA_UNTAPPD_SEARCH_ERROR);
          }

          document.getElementById('overlay').style.display = 'none';
        });
    }
  }

})();
