/*
ba.directives.BeerRating.js
Provides a directive for the jQuery Star Rating plugin.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.directives').directive('beerRating', beerRating);

  function beerRating() {
    var directive = {
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

        element.rating(options);
        element.rating('update', attrs.value);
      }
    };

    return directive;
  }

})();
