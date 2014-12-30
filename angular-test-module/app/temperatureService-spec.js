describe('temperatureService', function () {
    var temperatureSvc, mockSvc;

    beforeEach(module('app'));
    beforeEach(module('mockServiceModule'));

    beforeEach(function () {
        inject(function (temperatureService, mockService) {
            mockSvc = mockService;
            temperatureSvc = temperatureService;
        });
    });

    it('should convert 32 Fahrenheit to 0 Celsius', function () {
        // Arrange
        var f = 32, c = 0;
        mockSvc.configureTemperatureService(true, f, c);

        // Act
        temperatureSvc.toCelsius(f).then(function (response) {
            // Assert
            expect(response.data.value).toBe(c);
        });
        mockSvc.flush();
    });

    it('should convert 0 Celsius to 32 Fahrenheit', function () {
        // Arrange
        var f = 32, c = 0;
        mockSvc.configureTemperatureService(false, c, f);

        // Act
        temperatureSvc.toFahrenheit(c).then(function (response) {
            // Assert
            expect(response.data.value).toBe(f);
        });
        mockSvc.flush();
    });
});
