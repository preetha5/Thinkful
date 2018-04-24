import React from 'react';
import {shallow, mount} from 'enzyme';

import {TopNav} from './top-nav';
import {restartGame, auralUpdate} from '../actions';

describe('TopNav', () => {
    it('renders without crashing', () => {
        shallow(<TopNav />);
    });

    it('should dispatch restartGame when New Game link is clicked', ()=>{
        const dispatch = jest.fn();
        const wrapper = mount(<TopNav dispatch={dispatch}/>);
        const link = wrapper.find('.new');
        link.simulate('click');
        expect(dispatch).toHaveBeenCalledWith(restartGame());

    });

    it('should dispatch auralUpdate when "Hear state of game" is selected', ()=>{
        const dispatch = jest.fn();
        const wrapper = mount(<TopNav dispatch={dispatch}/>);
        const link = wrapper.find('a.status-link');
        link.simulate('click');
        expect(dispatch).toHaveBeenCalledWith(auralUpdate());

    });

});//End Topnav tests
