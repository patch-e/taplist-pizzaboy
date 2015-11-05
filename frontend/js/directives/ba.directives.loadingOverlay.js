/*
ba.directives.LoadingOverlay.js
Provides a full screen loading overlay.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.directives').directive('loadingOverlay', loadingOverlay);

  function loadingOverlay() {
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
