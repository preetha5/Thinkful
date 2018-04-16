import React from 'react';
import {shallow} from 'enzyme';
import Header from './header';

describe('<Header />', () =>{

    it('should render component without crashing', () =>{
        shallow(<Header />);
    })
})