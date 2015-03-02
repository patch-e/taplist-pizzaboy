/*
directives.js
Directives module for the angular BeersApp

Copyright (c) 2015

Patrick Crager

*/

angular.module('BeersApp.directives', []).

directive('footerTopscroller', function() {
  return {
    restrict: 'A',
    template: '<span class="glyphicon glyphicon-chevron-up"></span>',
    link: function(scope, element, attrs) {
      element.attr('href', '');
      element.addClass('pull-right top');
      element.on('click', function() {
        $('html, body').animate({scrollTop: 0}, 'slow');
        return false;
      });
    }
  };
}).

directive('footerTimestamp', function() {
  return {
    restrict: 'A',
    template: 'Generated @ {{beerList.timestamp | date: \'medium\'}}'
  };
}).

directive('noResults', function() {
  return {
    restrict: 'A',
    template: 'No beers match entered filter criteria.'
  };
}).

directive('modalHelp', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/helpModal.html'
  };
}).

directive('modalAbout', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/aboutModal.html'
  };
});
