import React from 'react';
import { WeatherData } from '../Components/WeatherData';
import renderer from 'react-test-renderer';

describe('Testing render WeatherData', function () {
  it("Correct input", () => {
    const weatherData = { "coord": { "lon": 37.62, "lat": 55.75 }, "weather": [{ "id": 502, "main": "Rain", "description": "heavy intensity rain", "icon": "10n" }], "base": "stations", "main": { "temp": 1.45, "feels_like": -2.41, "temp_min": 0.56, "temp_max": 2.78, "pressure": 1012, "humidity": 100 }, "visibility": 8000, "wind": { "speed": 3, "deg": 210 }, "rain": { "1h": 8.89 }, "clouds": { "all": 90 }, "dt": 1576589135, "sys": { "type": 1, "id": 9029, "country": "RU", "sunrise": 1576562073, "sunset": 1576587379 }, "timezone": 10800, "id": 524901, "name": "Moscow", "cod": 200 };
    const tree = renderer.create(<WeatherData value={weatherData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});