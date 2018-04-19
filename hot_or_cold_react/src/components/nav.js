import React from 'react';
import Reset from './reset';
import Instructions from './instructions';
import './nav.css';

export default function Nav(props){
    
    return (
        <nav>
            <ul className="menu">
                <Reset onReset={()=>props.onReset()} />
                <Instructions showInstructions={(val)=>props.showInstructions(val)}/>
            </ul>
        </nav>
    )
}