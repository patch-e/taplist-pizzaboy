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
      element.addClass('pull-right top topScroller');
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
    restrict: 'A',
    templateUrl: 'templates/helpModal.html'
  };
}).

directive('modalAbout', function() {
  return {
    restrict: 'A',
    templateUrl: 'templates/aboutModal.html'
  };
}).

directive('overlay', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.attr('id', 'overlay');
      element.addClass('modal-backdrop fade in');
      element.css('display', 'none');
    }
  };
}).

directive('beerRating', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var options = {
        'type': 'number',
        'class': 'rating',
        'readonly': true,
        'min': 0,
        'max': 5,
        'step': 0.25,
        'size': 'xs',
        'showCaption': false,
        'showClear': false
      };

      $(element).rating(options);
      $(element).rating('update', attrs.value);
    }
  };
});
