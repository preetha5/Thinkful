import React from 'react';
import {shallow} from 'enzyme';
import Feedback from './feedback';

describe('<Feedback />', () =>{

    it('should render component without crashing', () =>{
        shallow(<Feedback />);
    });

    it('should render feedback that is passed in', ()=>{
        const feedback = 'foobar';
        const wrapper = shallow(<Feedback feedback={feedback}/>);
        expect(wrapper.contains(feedback)).toEqual(true);

    });
})