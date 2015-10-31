/*
ba.directives.NoResults.js
Provides formatted "no results" text.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.directives')
  .directive('noResults', ['Messages', NoResults]);

  function NoResults(Messages) {
    var directive = {
      restrict: 'EA',
      template: Messages.BA_NO_RESULTS
    };

    return directive;
  }

})();
