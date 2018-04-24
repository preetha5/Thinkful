import React from 'react';
import {shallow} from 'enzyme';
import StatusSection from './status-section';

describe('<StatusSection />', () => {
    it('should render the component' ,() =>{
        shallow(<StatusSection />);
    })
});