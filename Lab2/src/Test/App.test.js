import React from 'react';
import { App } from '../Containers/App'
import { shallow } from '../enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('Testing render App', function () {
    it("Correct render", () => {
        const tree = shallow(<App />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
});
