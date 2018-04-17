import React from 'react';
import {shallow, mount} from 'enzyme';
import Game from './game';


describe('<Game />', () => {

    it('should render component without crashing', ()=>{
        shallow(<Game />);
    })

    it('starts new game on clicking +New-Game',() =>{
        const wrapper = shallow(<Game />);
        wrapper.instance().setState({
            guesses: [12,23,55,22,34],
            feedback: 'Warm',
            correctAnswer: 30
       });
       //Check the number of guesses before and after restarting the game
       expect(wrapper.state('guesses').length).toEqual(5);
       wrapper.instance().restartGame();
       expect(wrapper.state('guesses').length).toEqual(0);
    });

    it('should make guesses and get the correct feedback', () =>{
        const wrapper = shallow(<Game />);
        wrapper.instance().setState({correctAnswer:76});

        wrapper.instance().makeGuess(20);
        expect(wrapper.state('feedback')).toEqual('You\'re Ice Cold...');

        wrapper.instance().makeGuess(45);
        expect(wrapper.state('feedback')).toEqual('You\'re Cold...');
   
        wrapper.instance().makeGuess(60);
        expect(wrapper.state('feedback')).toEqual('You\'re Warm.');
   
        wrapper.instance().makeGuess(75);
        expect(wrapper.state('feedback')).toEqual('You\'re Hot!');
        
        wrapper.instance().makeGuess(76);
        expect(wrapper.state('feedback')).toEqual('You got it!');
        
        
    });

    /* TBD : Find a method to check that 
    document title changes according to the feedback */
    // it('Has the right title', () =>{
    //     const wrapper = mount(<Game />);
    //     const title = wrapper.find('title').text();
    //     console.log("title is ", title);
    // });

    it('Can generate aural updates', () => {    
        const wrapper = shallow(<Game />);
    
        wrapper.setState({
          correctAnswer: 100
        });
    
        wrapper.instance().makeGuess(25);
        wrapper.instance().makeGuess(3);
        wrapper.instance().makeGuess(90);
    
        wrapper.instance().generateAuralUpdate();
    
        expect(wrapper.state('auralStatus')).toEqual('Here\'s the status of the game right now: You\'re Warm. You\'ve made 3 guesses. In order of most- to least-recent, they are: 90, 3, 25');
    }); //End of aural updates test
});