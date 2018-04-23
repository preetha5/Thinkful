import * as actions from '../actions';

const initialState = {
    guesses: [],
    feedback: 'Make Your Guess',
    auralStatus: '',
    correctAnswer: Math.round(Math.random() * 100) + 1
}

export const gameReducer = (state=initialState, action) =>{
    if(action.type === actions.MAKE_GUESS){
        let feedback, guess;
        guess = parseInt(action.guess, 10);
        console.log("your guess is ", guess);
        console.log("action.correctAnswer is ", state.correctAnswer);
        if (isNaN(guess)) {
          feedback = 'Please enter a valid number';
          return;
        }
    
        const difference = Math.abs(guess - state.correctAnswer);

        if (difference >= 50) {
          feedback = 'You\'re Ice Cold...';
        } else if (difference >= 30) {
          feedback = 'You\'re Cold...';
        } else if (difference >= 10) {
          feedback = 'You\'re Warm.';
        } else if (difference >= 1) {
          feedback = 'You\'re Hot!';
        } else {
          feedback = 'You got it!';
        }
        console.log("feedback is ", feedback);

        // We typically wouldn't touch the DOM directly like this in React
        // but this is the best way to update the title of the page,
        // which is good for giving screen-reader users
        // instant information about the app.
        document.title = feedback ? `${feedback} | Hot or Cold` : 'Hot or Cold';
        
        return Object.assign({}, state, {
            feedback,
            guesses: [...state.guesses, guess]
        });
    } 
    else if( action.type === actions.AURAL_UPDATE){

        const pluralize = state.guesses.length !== 1;
        let  auralStatus = `Here's the status of the game right now: ${state.feedback} You've made ${state.guesses.length} ${pluralize ? 'guesses' : 'guess'}.`;
        if (state.guesses.length > 0) {
            auralStatus += ` ${pluralize ? 'In order of most- to least-recent, they are' : 'It was'}: ${state.guesses.reverse().join(', ')}`;
        }

        return Object.assign({}, state, {
            auralStatus: auralStatus
        });
    }

    else if(action.type === actions.RESTART_GAME){
        return Object.assign({}, state, {
            guesses: [],
            feedback: 'Make your guess!',
            auralStatus: '',
            correctAnswer: Math.floor(Math.random() * 100) + 1
        });
    }

    return state;
}