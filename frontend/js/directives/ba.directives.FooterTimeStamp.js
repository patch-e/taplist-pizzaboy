/*
ba.directives.FooterTimeStamp.js
Provides formatted timestamp text.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.directives').directive('footerTimestamp', FooterTimestamp);

  function FooterTimestamp() {
    var directive = {
      restrict: 'A',
      template: 'Generated @ {{beerList.timestamp | date: \'medium\'}}'
    };

    return directive;
  }

})();
