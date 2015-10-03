/*
ba.controllers.SearchResultController.js
Controller used for displaying search results in BeersApp.

Copyright (c) 2015

Patrick Crager

*/

angular.module('beersApp.controllers')
.controller('SearchResultController', ['$scope', '$cookies', '$modalInstance', 'AppConfig', 'beer',
function($scope, $cookies, $modalInstance, AppConfig, beer) {

  $scope.isAuthenticated = !!(($cookies.get('untappdToken') || '').length);
  $scope.beer = beer;

  // close the modal
  $scope.close = function () {
    $modalInstance.dismiss();
  };

  // try to launch untappd to the beer's page if on a mobile phone
  // otherwise launch the default browser to the beer on untappd's website
  $scope.checkin = function(bid) {
    var isMobile = /(iPhone|Android|IEMobile)/.test(navigator.userAgent);

    if (isMobile) {
      document.location = AppConfig.BA_UNTAPPD_APP_SCHEME + bid;
    } else {
      window.open(AppConfig.BA_UNTAPPD_URL_SCHEME + bid);
    }
  };

}]);
