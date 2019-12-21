import React from 'react';
import { FavoriteItem } from '../Components/FavoriteItem/js/FavoriteItem'
import { shallow } from '../enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('Testing render FavoriteItem', function () {
    it("Loading", () => {
        const storage = {
            "city": "TEST LOADING CITY",
            "data": {}
        };
        const tree = shallow(<FavoriteItem value={storage} />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("Correct data", () => {
        const storage = {
            "city": "Kiev",
            "data": {
                CityName: "Kiev",
                Temperature: 2.98,
                Weather: "light intensity drizzle",
                Humidity: 93,
                Pressure: 1014,
                Wind: 4,
                Longitude: 30.52,
                Latitude: 50.43,
                Icon: "09n",
                Cod: 200
            }
        };
        const tree = shallow(<FavoriteItem value={storage} />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
});    