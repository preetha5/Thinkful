import React from 'react';

export default function Info(props){
    const show = props.showInfo;
    if(show){
        return(
            <section id="howToPlay">
                <div className="content">
                    <h2>How to play?</h2>
                    <ul>
                        <li>The system has stored a random value of a number, and your
                        challenge is to guess that number</li>
                        <li>To begin, just input a number between 1 and 100 and submit</li>
                        <li>You will get feedback as to how close (HOT), somewhat close(KINDA HOT)
                        or really far way(COLD), you are from the right answer.</li>
                        <li>Use the hints to guess the right number</li>
                        <li>If you want to reset or start a new game, click on 
                        <strong>NEW GAME</strong> link.</li>
                    </ul>
                    <a className="close" href="#close" onClick={()=>props.onClose(false)}>Got It!</a>
            </div>
        </section>
        );
    } else {
        return('');
    }
}