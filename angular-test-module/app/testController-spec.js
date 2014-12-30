describe('testController', function () {
    var mockSvc;

    beforeEach(module('app'));
    beforeEach(module('mockServiceModule'));

    beforeEach(function () {
        module(function ($provide, mockServiceProvider) {
            mockServiceProvider.mockTemperatureService($provide);
        });

        inject(function (mockService) {
            mockSvc = mockService;
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
