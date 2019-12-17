import React from 'react';
import { FavoriteSearch } from '../Components/FavoriteSearch'
import { shallow } from '../enzyme';
import { shallowToJson } from 'enzyme-to-json';


describe('Testing render FavoriteSearch', function () {
    it("Correct render", () => {
        const tree = shallow(<FavoriteSearch />);
        expect(shallowToJson(tree)).toMatchSnapshot();
    });
});
