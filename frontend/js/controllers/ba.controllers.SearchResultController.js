/*
ba.controllers.SearchResultController.js
Controller used for displaying search results in BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.controllers')
  .controller('SearchResultController', ['$cookies', '$modalInstance', 'AppConfig', 'beer', SearchResultController]);

  function SearchResultController($cookies, $modalInstance, AppConfig, beer) {
    // controller as
    var vm = this;

    vm.isAuthenticated = !!(($cookies.get('untappdToken') || '').length);
    vm.beer = beer;

    // vm functions
    vm.close = close;
    vm.checkin = checkin;

    // close the modal
    function close() {
      $modalInstance.dismiss();
    }

    // try to launch untappd to the beer's page if on a mobile phone
    // otherwise launch the default browser to the beer on untappd's website
    function checkin(bid) {
      var isMobile = /(iPhone|Android|IEMobile)/.test(navigator.userAgent);

      if (isMobile) {
        document.location = AppConfig.BA_UNTAPPD_APP_SCHEME + bid;
      } else {
        window.open(AppConfig.BA_UNTAPPD_URL_SCHEME + bid);
      }
    }
  }

})();
