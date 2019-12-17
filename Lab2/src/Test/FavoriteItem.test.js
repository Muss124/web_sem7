import React from 'react';
import { FavoriteItem } from '../Components/FavoriteItem'
import { shallow } from '../enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('Testing render FavoriteItem', function () {
    it("Loading", () => {
        const storage = {
            "loading": true,
            "city": "TEST LOADING CITY",
            "data": {}
        };
        const tree = shallow(<FavoriteItem value={storage} />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("Correct data", () => {
        const storage = {
            "loading": false,
            "city": "Kiev",
            "data": {
                "coord": { "lon": 30.52, "lat": 50.43 },
                "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n" }],
                "base": "stations",
                "main": { "temp": 6.29, "feels_like": 2.93, "temp_min": 4, "temp_max": 7.78, "pressure": 1017, "humidity": 87 },
                "visibility": 10000,
                "wind": { "speed": 3, "deg": 230 },
                "clouds": { "all": 30 },
                "dt": 1576604944,
                "sys": { "type": 1, "id": 8903, "country": "UA", "sunrise": 1576561989, "sunset": 1576590872 },
                "timezone": 7200,
                "id": 703448,
                "name": "Kiev",
                "cod": 200
            }
        };
        const tree = shallow(<FavoriteItem value={storage} />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
});    