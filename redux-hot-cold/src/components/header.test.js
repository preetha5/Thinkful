import React from 'react';
import {shallow} from 'enzyme';
import Header from './header';

describe('<Header />', () => {
    it('should render the component' ,() =>{
        shallow(<Header />);
    })
})