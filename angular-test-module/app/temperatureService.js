(function () {
    'use strict';

    angular
        .module('app')
        .factory('temperatureService', temperatureService);

    temperatureService.$inject = ['$http'];

    function temperatureService($http) {
        var service = {
            toCelsius: fahrenheitToCelsius,
            toFahrenheit: celsiusToFahrenheit
        };

        return service;

        function fahrenheitToCelsius(f) {
            return $http.get('http://private-81ea-temperatureconverter.apiary-mock.com/toCelsius/' + f);
        }

        function celsiusToFahrenheit(c) {
            return $http.get('http://private-81ea-temperatureconverter.apiary-mock.com/toFahrenheit/' + c);
        }
    }
})();