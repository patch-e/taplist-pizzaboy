/*
ba.controllers.module.js
Module injection point for controller modules used by BeersApp.

Copyright (c) 2015

Patrick Crager

*/

angular.module('beersApp.controllers', [
  'beersApp.data',
  'beersApp.directives',
  'ngCookies',
  'ui.bootstrap'
]);
