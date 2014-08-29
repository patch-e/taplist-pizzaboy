angular.module('BeersApp.controllers', []).
controller('beersController', function($scope, beerAPIservice) {

  $scope.searchFilter = null;
  $scope.beersList = [];

  beerAPIservice.getBeers().success(function (response) {
    document.getElementById('intro').style.display = 'none';
    document.body.className = '';
    $scope.beersList = response;
  });

});