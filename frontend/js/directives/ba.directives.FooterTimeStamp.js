/*
ba.directives.FooterTimeStamp.js
Provides formatted timestamp text.

Copyright (c) 2015

Patrick Crager

*/

angular.module('beersApp.directives')
.directive('footerTimestamp', function() {

  return {
    restrict: 'A',
    template: 'Generated @ {{beerList.timestamp | date: \'medium\'}}'
  };

});
