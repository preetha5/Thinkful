import React from 'react';

export default function Nav(props){
    const link = '+NEW GAME';

    return (
        <nav>
            <ul>
                <li className="menu" onClick={(e)=> props.resetMenu(e)}>
                <a href='#'>{link}</a></li>
            </ul>
        </nav>
    )
}