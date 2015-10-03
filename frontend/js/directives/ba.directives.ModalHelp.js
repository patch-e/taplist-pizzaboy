/*
ba.directives.ModalHelp.js
Helper directive to the help modal template.

Copyright (c) 2015

Patrick Crager

*/

angular.module('beersApp.directives')
.directive('modalHelp', function() {

  return {
    restrict: 'A',
    templateUrl: 'templates/modalHelp.html'
  };

});
