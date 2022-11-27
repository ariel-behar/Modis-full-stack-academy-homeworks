import React, { useEffect, useState } from 'react';
import { getJoke } from '../services/jokesServices';


type JokeGeneratorProps = {
    toggleCommentForm: (b: boolean, currentJoke: string) => void
}



function JokeGenerator({toggleCommentForm}: JokeGeneratorProps) {
    let [joke, setJoke] = useState<string>('')


    useEffect(() => {
       getJoke()
            .then(res => res.json())
            .then(data => {
                setJoke(data);
            })
        return () => {

        }
    }, [])

    function nextJokeClickHandler() {
        getJoke()
            .then(res => res.json())
            .then(data => {
                setJoke(data);
                toggleCommentForm(false, joke)
            })
        
    }

    function leaveCommentClickHandler() {
        toggleCommentForm(true, joke)
    }

    return (
        <div>
            <p>{joke}</p>

            {
                joke ?
                <>
                    <button onClick={nextJokeClickHandler}>New Joke</button>
                    <button onClick={leaveCommentClickHandler}>Leave a comment</button>
                </>                
                : ''
            }


        </div>
    )
}

export default JokeGenerator