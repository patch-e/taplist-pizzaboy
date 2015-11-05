/*
ba.directives.Attribution.js
Provides formatted attribution text.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.directives').directive('attribution', attribution);

  function attribution() {
    var directive = {
      scope: {
        isLoading: '@'
      },
      restrict: 'EA',
      template: '<small><em>data provided by <a href="http://alsofhampden.com" target="_blank">alsofhampden.com</a></em></small>'
    };

    return directive;
  }

})();
