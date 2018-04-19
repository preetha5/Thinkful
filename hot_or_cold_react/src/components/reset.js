import React from 'react';

export default function Reset(props){
    return(
        <li onClick={(e)=> props.onReset(e)}>
            <a href='#reset' aria-label="Restart game">New Game</a>
        </li>
    )

}