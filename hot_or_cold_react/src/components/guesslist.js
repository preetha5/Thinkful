import React from 'react';

export default function GuessList(props){
    let guessList = props.guesses.map((number, index) =>{
        return (<li key={index}>{number}</li>);
    });

    return (
        <div>
            <p>Guesses so far:</p>
            <ul className="guessList" >
                {guessList}
            </ul>
        </div>);
}