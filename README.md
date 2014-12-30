angular-test-module
===================

AngularJS module to centralize common unit testing initialization for Jasmine

##Introduction
When unit testing AngularJS code using Jasmine, there is a lot of duplicate code happening.  For example, unit testing a controller requires
injecting a _$controller_ and _$rootScope_ each time as shown below.

```javascript
beforeEach(function () {
    module('app');
    inject(function (_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    });
});
```

While this can be done in the beforeEach method, that doesn't help when you have multiple
spec files across your site.  And that's just a simple example.

For this reason and more, the mockServiceModule introduced here is a good way to centralize a lot of duplicate unit testing code.
It is meant as a starting place for the unit tests in your project so that you can focus on the tests and not the plumbing to get them working.

##Usage
To use mockServiceModule in your Jasmine tests, do the following:

```javascript
describe('testController', function () {
    var mockSvc;

    beforeEach(module('app'));
    beforeEach(module('mockServiceModule'));  // Include the module after the 'app'.

    beforeEach(function () {
		// Custom configuration goes here
        module(function ($provide, mockServiceProvider) {
            mockServiceProvider.mockTemperatureService($provide);
        });

        inject(function (mockService) {
            mockSvc = mockService;

			// Custom setup.
            mockSvc.configureTemperatureServiceMock();

            mockSvc.getController()('testController', {
                '$scope': mockSvc.getScope(),
                'temperatureService': mockSvc.getTemperatureServiceMock()
            });
        });
    });

    it('should set celsiusResult when toCelsius called', function () {
        // Arrange
        var expectedValue = '0';

        var scope = mockSvc.getScope();
        scope.model = { fahrenheit: 32 };

        // Act
        scope.toCelsius();

        mockSvc.resolveTSMock(true, expectedValue);
        scope.$apply();

        // Assert
        expect(scope.model.celsiusResult).toBe('Celsius: ' + expectedValue);
    });

    it('should set fahrenheitResult when toFahrenheit called', function () {
        // Arrange
        var expectedValue = '32';

        var scope = mockSvc.getScope();
        scope.model = { celsius: 0 };

        // Act
        scope.toFahrenheit();

        mockSvc.resolveTSMock(false, expectedValue);
        scope.$apply();

        // Assert
        expect(scope.model.fahrenheitResult).toBe('Fahrenheit: ' + expectedValue);
    });
});
```
