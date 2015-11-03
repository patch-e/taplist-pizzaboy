/*
ba.controllers.MainController.js
Main controller of BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.controllers')
  .controller('MainController', ['CookieFactory', 'LoadingFactory', 'AppConfig', MainController]);

  function MainController(CookieFactory, LoadingFactory, AppConfig) {
    // controller as
    var vm = this;

    vm.loginURL = AppConfig.BA_UNTAPPD_LOGIN_URL;
    vm.loginURL = vm.loginURL.replace('{0}', AppConfig.BA_UNTAPPD_CLIENTID);
    vm.loginURL = vm.loginURL.replace('{1}', encodeURI(AppConfig.BA_UNTAPPD_CALLBACK_URL));
    vm.logoutURL = AppConfig.BA_LOGOUT_URL;
    vm.isAuthenticated = CookieFactory.isAuthenticated;

    // vm functions
    vm.collapseNav = collapseNav;
    vm.isLoading = isLoading;
    vm.isLoaded = isLoaded;

    // collapses the expanded navigation bar
    function collapseNav() {
      $('.collapse.in').collapse('hide');
    }

    // return the current loading indication
    function isLoading() {
      return LoadingFactory.isLoading;
    }

    // return the status of the initial load
    function isLoaded() {
      return LoadingFactory.isLoaded;
    }
  }

})();
