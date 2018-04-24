import React from 'react';
import {shallow, mount} from 'enzyme';

import {GuessForm} from './guess-form';
import {makeGuess} from '../actions';

describe('GuessForm', () => {
    it('renders without crashing', () => {
        shallow(<GuessForm />);
    });

    it('should dispatch guessForm is submitted', ()=>{
        const dispatch = jest.fn();
        const val = '80';
        const wrapper = mount(<GuessForm dispatch={dispatch}/>);
        wrapper.find('input[type="number"]').instance().value = val;
        
        wrapper.simulate('submit');
        expect(dispatch).toHaveBeenCalledWith(makeGuess(val));
    });

    it('should clear the input when form is submitted', () =>{
        const dispatch = jest.fn();
        const wrapper = mount(<GuessForm dispatch={dispatch}/>);
        const input = wrapper.find('input[type="number"]');
        input.instance().value = '50';
        wrapper.simulate('submit');
        expect(input.instance().value).toEqual('');
    })
});//End guess form tests