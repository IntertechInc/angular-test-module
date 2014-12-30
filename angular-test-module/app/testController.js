(function () {
    'use strict';

    angular
        .module('app')
        .controller('testController', testController);

    testController.$inject = ['$scope', 'temperatureService'];

    function testController($scope, temperatureService) {
        $scope.model = {};

        $scope.toCelsius = function () {
            temperatureService.toCelsius($scope.model.fahrenheit)
            .then(function (response) {
                $scope.model.celsiusResult = 'Celsius: ' + response.data.value;
            });
        }

        $scope.toFahrenheit = function () {
            temperatureService.toFahrenheit($scope.model.celsius)
            .then(function (response) {
                $scope.model.fahrenheitResult = 'Fahrenheit: ' + response.data.value;
            });
        }
    }
})();
