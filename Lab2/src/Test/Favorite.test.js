import React from 'react';
import Favorite from '../Components/Favorite/js/Favorite'
import { shallow } from '../enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

const initialState = {}
const mockStore = configureStore()

describe('Testing render Favorite', function () {
    it("Render from empty storage", () => {
        const storage = [];
        const store = mockStore(initialState);
        const tree = shallow(<Favorite value={storage} store={store} />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });

    it("Render from with loaded element", () => {
        const storage = [{
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
        }];
        const store = mockStore(initialState);
        const tree = shallow(<Favorite value={storage} store={store} />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("Render from empty with loading element", () => {
        const storage = [{
            "loading": true,
            "city": "TEST LOADING CITY",
            "data": {}
        }];
        const store = mockStore(initialState);
        const tree = shallow(<Favorite value={storage} store={store} />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
    it("Render from empty with both loading and loaded element", () => {
        const storage = [
            {
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
            },
            {
                "loading": true,
                "city": "TEST LOADING CITY",
                "data": {}
            }
        ];
        const store = mockStore(initialState);
        const tree = shallow(<Favorite value={storage} store={store} />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });

});
