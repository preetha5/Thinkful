import React from 'react';
import {shallow, mount} from 'enzyme';
import {GuessList} from './guess-list';

describe('<GuessList />', () => {
    it('should render the component' ,() =>{
        shallow(<GuessList guesses={[]} />);
    });

    it('should add list items for all guesses', () => {
        const guesses = [10, 20, 30];
        const wrapper = mount(<GuessList guesses={guesses} />);
        const items = wrapper.find("li");
        expect(items.length).toEqual(guesses.length);
        guesses.forEach((guess, index) => {
            expect(items.at(index).text()).toEqual(guess.toString());
        })
    })
})