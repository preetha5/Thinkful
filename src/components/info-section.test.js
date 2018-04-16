import React from 'react';
import {shallow} from 'enzyme';
import InfoSection from './info-section';

describe('<InfoSection />', () =>{
    it('should render component without crashing', () =>{
        shallow(<InfoSection />);
    });
})