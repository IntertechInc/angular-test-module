(function () {
    'use strict';

    angular
        .module('mockServiceModule', [])
        .provider('mockService', function mockServiceProvider() {
            // Public service interface.
            var service = {
                getScope: function () { return scope; }
                , getController: function () { return controller; }
                , getQ: function () { return q; }
                , getTemperatureServiceMock: function () { return temperatureServiceMock; }
                , configureTemperatureService: configureTemperatureService
                , configureTemperatureServiceMock: configureTemperatureServiceMock
                , resolveTSMock: resolveTSMock
                , flush: function () { httpBackend.flush(); }
            };

            var q, scope, rootScope, controller, httpBackend;
            var temperatureServiceMock, tsCelsiusDefer, tsFahrenheitDefer;

            // Anything that is common to all tests are added here.
            this.initProvider = function (provide, options) {
                // Override $exceptionHandler in case it calls a service
                provide.value('$exceptionHandler', exceptionHandlerMock);
            };

            this.mockTemperatureService = function (provide) {
                temperatureServiceMock = jasmine.createSpyObj('temperatureService', ['toCelsius', 'toFahrenheit']);
                provide.value('temperatureService', temperatureServiceMock);
            };

            // When mockService is created, setup things that aren't available
            // at config time and return the service.
            this.$get = ['$q', '$rootScope', '$controller', '$httpBackend',
                function mockServiceFactory($q, $rootScope, $controller, $httpBackend) {
                    rootScope = $rootScope;
                    scope = $rootScope.$new();
                    controller = $controller;
                    q = $q;
                    httpBackend = $httpBackend;

                    return service;
                }];

            function exceptionHandlerMock(exception, cause) {
                if (cause) {
                    exception.message += ' (caused by "' + cause + '")';
                }
                expect(exception.message).toBe('');
            }

            function configureTemperatureService(isToCelsius, requestValue, responseValue) {
                var converter = 'toFahrenheit';
                if (isToCelsius) {
                    converter = 'toCelsius';
                }

                httpBackend.expect('GET', 'http://private-81ea-temperatureconverter.apiary-mock.com/' + converter + '/' + requestValue)
                    .respond({ value: responseValue });
            }

            function configureTemperatureServiceMock() {
                tsCelsiusDefer = q.defer();
                temperatureServiceMock.toCelsius.and.returnValue(tsCelsiusDefer.promise);
                tsFahrenheitDefer = q.defer();
                temperatureServiceMock.toFahrenheit.and.returnValue(tsFahrenheitDefer.promise);
            }

            function resolveTSMock(isToCelsius, value) {
                if (isToCelsius) {
                    tsCelsiusDefer.resolve({ data: { value: value } });
                }
                else {
                    tsFahrenheitDefer.resolve({ data: { value: value } });
                }
            }
        })
        .config(['$provide', 'mockServiceProvider', function ($provide, mockServiceProvider) {
            mockServiceProvider.initProvider($provide);
        }]);
})();