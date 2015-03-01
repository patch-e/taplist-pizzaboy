/*
directives.js
Directives module for the angular BeersApp

Copyright (c) 2015

Patrick Crager

*/

angular.module('BeersApp.directives', []).

directive('topScroller', function($timeout) {

  return {
    restrict: 'E',
    template: '<a href="" class="pull-right top"><span class="glyphicon glyphicon-chevron-up"></span></a>',
    link: function(scope, element, attrs) {
      element.on('click', function() {
        $('html, body').animate({scrollTop: 0}, 'slow');
        return false;
      });
    }
  };

});
