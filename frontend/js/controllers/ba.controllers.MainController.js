/*
ba.controllers.MainController.js
Main controller of BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.controllers')
  .controller('MainController', ['$cookies', 'AppConfig', MainController]);

  function MainController($cookies, AppConfig) {
    // controller as
    var vm = this;

    vm.loginURL = AppConfig.BA_UNTAPPD_LOGIN_URL;
    vm.loginURL = vm.loginURL.replace('{0}', AppConfig.BA_UNTAPPD_CLIENTID);
    vm.loginURL = vm.loginURL.replace('{1}', encodeURI(AppConfig.BA_UNTAPPD_CALLBACK_URL));
    vm.logoutURL = AppConfig.BA_LOGOUT_URL;
    vm.isAuthenticated = !!(($cookies.get('untappdToken') || '').length);

    // vm functions
    vm.collapseNav = collapseNav;

    // collapses the expanded navigation bar
    function collapseNav() {
      $('.collapse.in').collapse('hide');
    }
  }

})();
