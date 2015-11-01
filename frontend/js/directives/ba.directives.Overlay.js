/*
ba.directives.Overlay.js
Provides a full page loading overlay.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.directives').directive('loadingOverlay', LoadingOverlay);

  function LoadingOverlay() {
    var directive = {
      scope: {
        isShowing: '@'
      },
      restrict: 'E',
      replace: true,
      template: '<div></div>',
      link: function(scope, element, attrs) {
        element.addClass('modal-backdrop fade in');
      }
    };

    return directive;
  }

})();
