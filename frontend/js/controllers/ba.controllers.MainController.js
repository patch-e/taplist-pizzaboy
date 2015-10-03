/*
ba.controllers.MainController.js
Main controller of BeersApp.

Copyright (c) 2015

Patrick Crager

*/

angular.module('beersApp.controllers')
.controller('MainController', ['$scope', '$cookies', 'AppConfig',
function($scope, $cookies, AppConfig) {

  $scope.loginURL = AppConfig.BA_UNTAPPD_LOGIN_URL;
  $scope.loginURL = $scope.loginURL.replace('{0}', AppConfig.BA_UNTAPPD_CLIENTID);
  $scope.loginURL = $scope.loginURL.replace('{1}', encodeURI(AppConfig.BA_UNTAPPD_CALLBACK_URL));
  $scope.logoutURL = AppConfig.BA_LOGOUT_URL;
  $scope.isAuthenticated = !!(($cookies.get('untappdToken') || '').length);

  // collapses the expanded navigation bar
  $scope.collapseNav = function() {
    $('.collapse.in').collapse('hide');
  };

}]);
