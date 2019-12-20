import React from 'react';
import { WeatherData } from '../Components/WeatherData/js/WeatherData';
import renderer from 'react-test-renderer';

describe('Testing render WeatherData', function () {
  it("Header weather", () => {
    const weatherData = { CityName: "Kiev", Temperature: 2.98, Weather: "light intensity drizzle", Humidity: 93, Pressure: 1014, Wind: 4, Longitude: 30.52, Latitude: 50.43, Icon: "09n", Cod: 200 };
    const tree = renderer.create(<WeatherData value={weatherData} isMain={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Favorite weather", () => {
    const weatherData = { CityName: "Kiev", Temperature: 2.98, Weather: "light intensity drizzle", Humidity: 93, Pressure: 1014, Wind: 4, Longitude: 30.52, Latitude: 50.43, Icon: "09n", Cod: 200 };
    const tree = renderer.create(<WeatherData value={weatherData} isMain={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});