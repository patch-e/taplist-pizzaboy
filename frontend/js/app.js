/*
BeersApp.js
- Bootstraps the AngularJS BeersApp.
- Configures routes.

Copyright (c) 2015

Patrick Crager

*/

angular.module('beersApp', [
  'ngRoute',
  'beersApp.shared',
  'beersApp.controllers'
])
.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/table', {
      templateUrl: 'partials/table.html',
      controller: 'BeerController'
    })
    .when('/block', {
      templateUrl: 'partials/block.html',
      controller: 'BeerController'
    })
    .when('/list', {
      templateUrl: 'partials/list.html',
      controller: 'BeerController'
    })
    .otherwise({
      redirectTo: '/table'
    });

}]);
