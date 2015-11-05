/*
ba.directives.FooterTimeStamp.js
Provides formatted timestamp text.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.directives').directive('footerTimestamp', footerTimestamp);

  function footerTimestamp() {
    var directive = {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<small>Generated @ <data-ng-transclude></data-ng-transclude></small>'
    };

    return directive;
  }

})();
