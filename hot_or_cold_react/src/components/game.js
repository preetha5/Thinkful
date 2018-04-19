import React from 'react';
import './game.css';
import Nav from './nav';
import Form from './form';
import Feedback from './feedback';
import GuessList from './guesslist';
import Info from './info';

export default class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            randomNumber:Math.floor(Math.random()*100+1),
            message:'Take a guess. Pick a number between 1 and 100.',
            showSubmit:true,
            guessesList:[],
            showInfo: false
        }
    }

    restartGame(){
        window.location.reload(); 
    }

    onClose(){
        document.getElementById("info").innerHTML='';
    }
    showInstructions(val){
        this.setState({
            showInfo :val
        })
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
        console.log(this.state.randomNumber);
        const difference = Math.abs(num-this.state.randomNumber);

        if(difference === 0){
            //Hide the guess submit button after success
            this.setState({showSubmit:false})
            this.setFeedback('YOU ARE CORRECT! Click on New game to play again?');
            console.log("you are correct, start new game?");
        } else 
        if(difference < 10){
            this.setFeedback('HOT');
        } else 
        if(difference < 20){
            this.setFeedback('KINDA HOT');
        } else 
        if(difference < 30){
            this.setFeedback('WARM');
        } else 
        if (difference >= 30){
            this.setFeedback('COLD');
        }
    }

    render(){
        return (
            <div>
                <Nav onReset={()=>{this.restartGame()}}
                showInstructions = {(val) => this.showInstructions(val)}/>
                <h1>Hot Or Cold? </h1>
                <div className="gameBoard">
                    <Feedback message= {this.state.message} />
                    <Form 
                        displaySubmit={this.state.showSubmit} 
                        random={this.state.randomNumber} 
                        checkGuess={num=> this.checkGuess(num)} 
                        guesses={this.state.guessesList} />
                    <GuessList guesses={this.state.guessesList} />
                </div>
                <Info showInfo={this.state.showInfo} onClose={(val)=>this.showInstructions(val)}/>
            </div>
        )
    }

}
