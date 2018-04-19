import React from 'react';
import './instructions.css';

export default function Instructions(props){
    return(
        <li>
            <a href='#howtoplay' onClick={()=> props.showInstructions(true)}
            aria-label="How to play">How to Play?</a>
        </li>
    );
}