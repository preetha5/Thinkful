import React from 'react';
import {shallow, mount} from 'enzyme';
import GuessForm from './guess-form';

describe('<GuessForm />', () =>{

    it('should render component without crashing', () =>{
        shallow(<GuessForm />);
    });

    it('should call the Callback on submit event', () =>{
        const callback = jest.fn();
        const guess = 50;
        const wrapper = mount(<GuessForm onMakeGuess={callback} />);
        wrapper.find('#userGuess').instance().value=guess;
        wrapper.simulate('submit');
        expect(callback).toHaveBeenCalledWith(guess.toString());
    })
})