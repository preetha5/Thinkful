import React from 'react';
import {shallow} from 'enzyme';
import Game from './game';

describe('<Game />', () => {
    it('should render the component' ,() =>{
        shallow(<Game />);
    })
})