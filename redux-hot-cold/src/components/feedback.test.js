import React from 'react';
import {shallow} from 'enzyme';
import {Feedback} from './feedback';

describe('<Feedback />', () => {
    it('renders without crashing', () => {
        shallow(<Feedback />);
    });

    it('should display feedback passed in', () => {
        const feedback = "all is well";
        const wrapper = shallow(<Feedback feedback = {feedback} />);
        expect(wrapper.contains(feedback)).toEqual(true);
    })
})