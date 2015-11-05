/*
ba.controllers.MainController.js
Main controller of BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.controllers').controller('MainController', MainController);

  MainController.$inject = ['cookieFactory', 'loadingFactory', 'appConfig'];

  function MainController(cookieFactory, loadingFactory, appConfig) {
    // controller as
    var vm = this;

    vm.loginURL = appConfig.BA_UNTAPPD_LOGIN_URL;
    vm.loginURL = vm.loginURL.replace('{0}', appConfig.BA_UNTAPPD_CLIENTID);
    vm.loginURL = vm.loginURL.replace('{1}', encodeURI(appConfig.BA_UNTAPPD_CALLBACK_URL));
    vm.logoutURL = appConfig.BA_LOGOUT_URL;
    vm.isAuthenticated = cookieFactory.isAuthenticated;

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
      return loadingFactory.isLoading;
    }

    // return the status of the initial load
    function isLoaded() {
      return loadingFactory.isLoaded;
    }
  }

})();
