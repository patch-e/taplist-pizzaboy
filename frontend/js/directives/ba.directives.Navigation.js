/*
ba.directives.Navigation.js
Provides the navigation template.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.directives').directive('navigation', navigation);

  function navigation() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/navigation.html'
    };

    return directive;
  }

})();
