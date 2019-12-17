import React from 'react';
import Favorite from '../Components/Favorite'
import { shallow } from '../enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

const initialState = {}
const mockStore = configureStore()

describe('Testing render Favorite', function () {
    it("Render from empty storage", () => {
        const storage = [];
        const store = mockStore(initialState);
        const tree = shallow(<Favorite value={storage} store={store}/>);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    
    it("Render from with loaded element", () => {
        const storage = [{
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
        }];
        const store = mockStore(initialState);
        const tree = shallow(<Favorite value={storage} store={store}/>);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("Render from empty with loading element", () => {
        const storage = [{
            "loading": true,
            "city": "TEST LOADING CITY",
            "data": {}
        }];
        const store = mockStore(initialState);
        const tree = shallow(<Favorite value={storage} store={store}/>);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("Render from empty with both loading and loaded element", () => {
        const storage = [
            {
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
            },
            {
                "loading": true,
                "city": "TEST LOADING CITY",
                "data": {}
            }
        ];
        const store = mockStore(initialState);
        const tree = shallow(<Favorite value={storage} store={store}/>);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    
});
