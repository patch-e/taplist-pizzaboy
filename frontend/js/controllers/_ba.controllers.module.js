/*
ba.controllers.module.js
Module injection point for controller modules used by BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.controllers', [
    'beersApp.data',
    'beersApp.directives',
    'ui.bootstrap'
  ]);

})();
