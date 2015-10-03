/*
ba.directives.NoResults.js
Provides formatted "no results" text.

Copyright (c) 2015

Patrick Crager

*/

angular.module('beersApp.directives')
.directive('noResults', function() {

  return {
    restrict: 'A',
    template: 'No beers match entered filter criteria.'
  };

});
