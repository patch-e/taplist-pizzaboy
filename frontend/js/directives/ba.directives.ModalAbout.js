/*
ba.directives.ModalAbout.js
Helper directive to the about modal template.

Copyright (c) 2015

Patrick Crager

*/

angular.module('beersApp.directives')
.directive('modalAbout', function() {

  return {
    restrict: 'A',
    templateUrl: 'templates/modalAbout.html'
  };

});
