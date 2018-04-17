import React from 'react';
import {shallow} from 'enzyme';
import GuessSection from './guess-section';

describe('<Header />', () =>{

    it('should render component without crashing', () =>{
        shallow(<GuessSection />);
    })
})