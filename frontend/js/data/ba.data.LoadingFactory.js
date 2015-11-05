/*
ba.data.loadingFactory.js
Provides loading related services to BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.data').factory('loadingFactory', loadingFactory);

  function loadingFactory() {
    var factory = {
      isLoading: false,
      isLoaded: false,
      startLoading: startLoading,
      stopLoading: stopLoading
    };

    return factory;

    function startLoading() {
      factory.isLoading = true;
    }

    function stopLoading() {
      factory.isLoading = false;
      factory.isLoaded = true;
    }
  }

})();
