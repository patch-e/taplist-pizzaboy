/*
ba.directives.NoResults.js
Provides formatted "no results" text.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.directives').directive('noResults', noResults);

  noResults.$inject = ['messages'];

  function noResults(messages) {
    var directive = {
      restrict: 'EA',
      template: messages.BA_NO_RESULTS
    };

    return directive;
  }

})();
