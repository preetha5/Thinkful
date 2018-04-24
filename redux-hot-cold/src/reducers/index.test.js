import {gameReducer} from './index';
import {makeGuess, auralUpdate, restartGame } from '../actions';

describe('gameReducer', ()=>{
    //setup dummy data
    const guesses = [23, 33, 44, 55];
    const feedback = 'Hot';
    const auralStatus = 'You are getting closer';
    const correctAnswer = 60;

    it('Should set initial state, when no input is passed' ,() =>{
        const state = gameReducer(undefined, {type:'__UNKNOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.auralStatus).toEqual('');
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
    });

    it('Should return current state on unknown action', () =>{
        const currentState = {};
        const state = gameReducer(currentState, {type: '__UNKNOWN'});
        expect(state). toEqual(currentState);
    });

    describe('makeGuess', () => {
        it('Should compare guess with correct answer', () => {
            let currentState = {
                guesses: [],
                feedback: 'Make Your Guess',
                auralStatus: '',
                correctAnswer: correctAnswer
            }
            
            let state = gameReducer(currentState, makeGuess(10));
            expect(state.guesses).toEqual([10]);
            expect(state.feedback).toEqual('You\'re Ice Cold...');
            });
        }); //End makeguess tests

    describe('aural update', () => {
        it('Should aural status', () => {
            let currentState = {
                guesses: guesses,
                feedback: 'You\'re Hot!',
                auralStatus: '',
                correctAnswer: correctAnswer
            };

            let state = gameReducer(currentState, auralUpdate());
            let auralStatus = `Here's the status of the game right now: You're Hot! You've made 4 guesses. In order of most- to least-recent, they are: 55, 44, 33, 23`;
            expect(state.auralStatus).toEqual(auralStatus);
        });
    });// End aural update tests
    
    describe('restart game', () => {
        it('Should aural status', () => {
            let currentState = {
                guesses: guesses,
                feedback: 'You\'re Hot!',
                auralStatus: '',
                correctAnswer: correctAnswer
            };
            const state = gameReducer(currentState, restartGame() );
            expect(state.guesses).toEqual([]);
            expect(state.feedback).toEqual('Make your guess!');
            expect(state.auralStatus).toEqual('');
           });
        });//End restart game tests

});//End of all reducer tests
