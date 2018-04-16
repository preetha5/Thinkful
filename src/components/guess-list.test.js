import React from 'react';
import {shallow} from 'enzyme';
import GuessList from './guess-list';

describe('<GuessList />', () =>{
    const guesses = [1, 25, 32, 28];
    it('should render component without crashing', () =>{
        shallow(<GuessList guesses={guesses}/>);
    });

    it('should show the lists of guesses passed in', () =>{
        const wrapper = shallow(<GuessList guesses={guesses}/>);
        const items = wrapper.find('li');
        expect(items.length).toEqual(guesses.length);
        items.forEach((item, index) => {
            expect(item.text()).toEqual(guesses[index].toString());
        });
    })
})