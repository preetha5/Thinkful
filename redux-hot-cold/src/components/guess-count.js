import React from 'react';
import './guess-count.css';
import {connect} from 'react-redux';

export function GuessCount(props) {
    const isPlural = props.guessCount !== 1;
    const guessNoun = isPlural ? 'guesses' : 'guess';
    console.log("props.guessCount :", props.guessCount);
    return (
        <h2 id="guessCount">
            You've made <span id="count">{props.guessCount}</span> {guessNoun}!
        </h2>
    );
}

const mapStateToProps = state => ({
    guessCount: state.guesses.length
});

export default connect(mapStateToProps) (GuessCount);
