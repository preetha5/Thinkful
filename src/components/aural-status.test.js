import React from 'react';
import {shallow} from 'enzyme';
import AuralStatus from './aural-status';

describe('<AuralStatus />', () =>{
    it('should render component without crashing', () =>{
        shallow(<AuralStatus />);
    });

    it('should render the aural status passed in', () =>{
        const status = 'Make the guesses';
        const wrapper = shallow(<AuralStatus auralStatus={status} />);
        expect(wrapper.contains(status)).toEqual(true);
    });
})