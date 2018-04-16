import React from 'react';
import './game.css';
import Nav from './nav';
import Form from './form';

function makeRandomNumber(){
    return Math.floor(Math.random()*100+1);
}
export default class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = this.setInitialState()
    }

    setInitialState(){
        return {
            randomNumber:makeRandomNumber(),
            message:'',
            showSubmit:true,
            guessesList:[]
        }
    }
    resetGame(e){
        e.preventDefault();
        this.setState(this.setInitialState());   
    }

    setFeedback(message){
        this.setState({
            message
        });
    }
    checkGuess(num){
        console.log(typeof(num));
        //Add guess to GuessList
        this.setState(
            {guessesList : [...this.state.guessesList,num]}
        );
        if(num === this.state.randomNumber){
            //Hide the guess submit button after success
            this.setState({showSubmit:false})
            this.setFeedback('YOU ARE CORRECT! Click on New game to play again?');
            console.log("you are correct, start new game?");
        } else if((Math.abs(num-this.state.randomNumber))<10){
            //message = 'Sorry wrong guess. Try Again.';
            this.setFeedback('HOT');
        } else if((Math.abs(num-this.state.randomNumber))>9 &&
        ((Math.abs(num-this.state.randomNumber))<20)){
            //message = 'Sorry wrong guess. Try Again.';
            this.setFeedback('KINDA HOT');
        } else if((Math.abs(num-this.state.randomNumber))>19 &&
        ((Math.abs(num-this.state.randomNumber))<30)){
            //message = 'Sorry wrong guess. Try Again.';
            this.setFeedback('WARM');
        } else if ((Math.abs(num-this.state.randomNumber))>30){
            this.setFeedback('COLD');
        }
    }

    render(){
        return (
            <div>
                <Nav resetMenu={(e)=>this.resetGame(e)}/>
                <h1>Hot Or Cold? </h1>
                <div className="gameBoard">
                    <p>Take a guess. Pick a number between 1 and 100 </p>
                    <h2 className="feedback">{this.state.message}</h2>
                    <Form 
                        displaySubmit={this.state.showSubmit} 
                        random={this.state.randomNumber} 
                        checkGuess={num=> this.checkGuess(num)} 
                        guesses={this.state.guessesList} />
                </div>
            </div>
        )
    }

}
