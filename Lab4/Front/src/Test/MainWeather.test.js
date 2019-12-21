import React from 'react';
import { MainWeather } from '../Components/MainWeather/js/MainWeather'
import renderer from 'react-test-renderer';
import { shallow } from '../enzyme';
import { shallowToJson } from 'enzyme-to-json';


describe("Testing render MainWeather", function () {
    beforeEach(() => {
        fetch.resetMocks();
    })


    it("Empty", () => {
        fetch.mockResponseOnce(JSON.stringify({ "cod": "400", "message": "Nothing to geocode" }))
        const tree = renderer.create(<MainWeather />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("Loading", () => {
        fetch.mockResponseOnce(JSON.stringify({ "cod": "400", "message": "Nothing to geocode" }))
        const tree = shallow(<MainWeather />);
        tree.setState({
            loading: true
        });
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("Success", () => {
        fetch.mockResponseOnce(JSON.stringify({ CityName: "Kiev", Temperature: 2.98, Weather: "light intensity drizzle", Humidity: 93, Pressure: 1014, Wind: 4, Longitude: 30.52, Latitude: 50.43, Icon: "09n", Cod: 200 }))
        const tree = shallow(<MainWeather />);
        const weatherData = { CityName: "Kiev", Temperature: 2.98, Weather: "light intensity drizzle", Humidity: 93, Pressure: 1014, Wind: 4, Longitude: 30.52, Latitude: 50.43, Icon: "09n", Cod: 200 };
        tree.setState({
            success: true,
            loading: false,
            data: weatherData
        });
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("No access", () => {
        fetch.mockImplementation(() => {
            throw new Error();
          });
        const tree = shallow(<MainWeather />);
        tree.setState({
            loading: false,
            access: false,
        });
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
});