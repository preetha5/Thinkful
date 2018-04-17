import React from 'react';
import {shallow} from 'enzyme';
import GuessCount from './guess-count';

describe('<GuessCount />', () =>{

    it('should render component without crashing', () =>{
        shallow(<GuessCount />);
    });

    it('should render the right number of guesses',() =>{
        const numGuesses = 5
        const wrapper = shallow(<GuessCount guessCount={numGuesses} />);
        expect(wrapper.text()).toEqual(`You've made ${numGuesses} guesses!`);
    })
})