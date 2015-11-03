/*
ba.data.LoadingFactory.js
Provides loading related services to BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.data').factory('LoadingFactory', LoadingFactory);

  function LoadingFactory() {
    var factory = {
      isLoading: false,
      isLoaded: false,
      startLoading: startLoading,
      stopLoading: stopLoading
    };

    function startLoading() {
      factory.isLoading = true;
    }

    function stopLoading() {
      factory.isLoading = false;
      factory.isLoaded = true;
    }

    return factory;
  }

})();
