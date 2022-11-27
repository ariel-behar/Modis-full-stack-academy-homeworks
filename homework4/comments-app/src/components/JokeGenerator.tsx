import React, { useEffect, useState } from 'react';
import { getJoke } from '../services/jokesServices';


type JokeGeneratorProps = {
    toggleCommentForm: (b: boolean, currentJoke: string) => void
}

function JokeGenerator({toggleCommentForm}: JokeGeneratorProps) {
    let [joke, setJoke] = useState<string>('')
    let [leaveCommentDisplay, setLeaveCommentDisplay] = useState<boolean>(false)

    useEffect(() => {
       getJoke()
            .then(res => res.json())
            .then(data => {
                setJoke(data);
                setLeaveCommentDisplay(true)
            })
        return () => {

        }
    }, [])

    function nextJokeClickHandler() {
        getJoke()
            .then(res => res.json())
            .then(data => {
                setJoke(data);
                setLeaveCommentDisplay(true)
                toggleCommentForm(false, joke)
            })
    }

    function leaveCommentClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
        toggleCommentForm(true, joke)
        setLeaveCommentDisplay(false)
        
    }

    return (
        <div className='joke-generator-div'>
            <span className='section-corner-title'>Joke</span>
            <h3>{joke}</h3>

            {
                joke ?
                    <div className='joke-generator-buttons'>
                        <button className="new-joke-btn" onClick={nextJokeClickHandler}>New Joke</button>
                        
                        {leaveCommentDisplay 
                        ? <button className="leave-comment-btn" onClick={e => leaveCommentClickHandler(e)}>Leave a comment</button>
                        : ''}
                        
                    </div>                
                : ''
            }
        </div>
    )
}

export default JokeGenerator