import React from 'react';
import './form.css';

export default class Form extends React.Component{
    constructor(props){
        super(props);
    }

    onSubmit(e){
        e.preventDefault();
        const guess = parseInt(this.textInput.value.trim(), 10);
        console.log('current guess is',guess);
        if(!(guess > 0 && guess <= 100)){
            alert("please enter a number between 1 and 100");
            this.textInput.value = '';
            return;
        }
        if(guess && this.props.checkGuess){
            this.props.checkGuess(guess);
        }
        this.textInput.value = '';
    }

    render(){
        // let guessList = this.props.guesses.map((number, index) =>{
        //     return (<li key={index}>{number}</li>);
        // });

        // if(this.props.resetGuess){
        //     guessList =[];
        // }

       return( 
           <form className='inputForm'>
                <input type="text" placeholder="1"
                ref={input =>this.textInput = input}
                 required />
                <br />
                {this.props.displaySubmit ? <button type='submit' onClick={(e)=>this.onSubmit(e)}>Submit </button> :null}
            </form>);
    }
}