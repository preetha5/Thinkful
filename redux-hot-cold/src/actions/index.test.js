import {MAKE_GUESS, makeGuess, AURAL_UPDATE,auralUpdate, 
    RESTART_GAME, restartGame } from './index';


describe('makeGuess', () => {
    it('should return the action', () =>{
        const guess = 50;
        const action = makeGuess(guess);
        expect(action.type).toEqual(MAKE_GUESS);
        expect(action.guess).toEqual(guess);
    });
});

describe('restartGame', () => {
    it('should return the action', () =>{
        const action = restartGame();
        expect(action.type).toEqual(RESTART_GAME);
    });
});

describe('auralUpdate', () => {
    it('should return the action', () =>{
        const auralStatus = "All is well!";
        const action = auralUpdate(auralStatus);
        expect(action.type).toEqual(AURAL_UPDATE);
        expect(action.auralStatus).toEqual(auralStatus);
    });
});

