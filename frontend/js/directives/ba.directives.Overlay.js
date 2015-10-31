/*
ba.directives.Overlay.js
Provides a full page loading overlay.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.directives').directive('overlay', Overlay);

  function Overlay() {
    var directive = {
      restrict: 'E',
      replace: true,
      template: '<div></div>',
      link: function(scope, element, attrs) {
        element.attr('id', 'overlay');
        element.addClass('modal-backdrop fade in');
        element.css('display', 'none');
      }
    };

    return directive;
  }

})();
