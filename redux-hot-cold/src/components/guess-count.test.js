import React from 'react';
import {shallow, mount} from 'enzyme';
import {GuessCount} from './guess-count';

describe('<GuessCount />', () => {
    it('should render the component' ,() =>{
        const count = 5;
        shallow(<GuessCount guessCount={count} />);
    });

    it('should specify the number of guesses', () => {
        const count = 5;
        const wrapper = mount(<GuessCount guessCount={count} />);
        expect(wrapper.text()).toEqual(`You've made 5 guesses!`);
    });

});//End GuessCount tests