import React from 'react';
import {shallow} from 'enzyme';
import StatusSection from './status-section';

describe('<StatusSection />', () =>{
    const guesses = [1];
    it('should render component without crashing', () =>{
        shallow(<StatusSection guesses={guesses}/>);
    });
})