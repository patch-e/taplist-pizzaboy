angular.module('BeersApp.controllers', []).
controller('beersController', function($scope, beerAPIservice) {
    $scope.nameFilter = null;
    $scope.beersList = [];

    beerAPIservice.getBeers().success(function (response) {
        $scope.beersList = response;
    });
});