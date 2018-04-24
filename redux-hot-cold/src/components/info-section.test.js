import React from 'react';
import {shallow} from 'enzyme';
import InfoSection from './info-section';

describe('<InfoSection />', () => {
    it('should render the component' ,() =>{
        shallow(<InfoSection />);
    })
});