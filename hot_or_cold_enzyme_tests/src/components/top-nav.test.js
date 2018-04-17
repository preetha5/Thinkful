import React from 'react';
import {shallow, mount} from 'enzyme';
import TopNav from './top-nav';

describe('<TopNav />', () =>{

    it('should render component without crashing', () =>{
        shallow(<TopNav />);
    });

    it('should start a new game when new game link is clicked', () =>{
        const callback = jest.fn();
        const wrapper = mount(<TopNav onRestartGame={callback} />);
        const newGameLink  = wrapper.find('.new');
        newGameLink.simulate('click');
        expect(callback).toHaveBeenCalled();
    });

    it('should call generalAuralUpdate when "hear state of game" is clicked', () =>{
        const callback = jest.fn();
        const wrapper = mount(<TopNav onGenerateAuralUpdate={callback} />);
        const auralUpdateLink  = wrapper.find('a[href="#get-status"]');
        auralUpdateLink.simulate('click');
        expect(callback).toHaveBeenCalled();
    });


})