/*
ba.directives.Overlay.js
Provides a full page loading overlay.

Copyright (c) 2015

Patrick Crager

*/

angular.module('beersApp.directives')
.directive('overlay', function() {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.attr('id', 'overlay');
      element.addClass('modal-backdrop fade in');
      element.css('display', 'none');
    }
  };

});
