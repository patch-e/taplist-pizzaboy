/*
ba.directives.Overlay.js
Provides a full page loading overlay.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.directives').controller('OverlayController', OverlayController);

  function OverlayController() {
    // controller as
    var vm  = this;

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
