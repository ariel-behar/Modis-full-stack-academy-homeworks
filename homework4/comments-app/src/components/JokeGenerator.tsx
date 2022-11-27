import { useEffect, useState } from 'react';
import { getJoke } from '../services/jokesServices';

function JokeGenerator() {
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
            })
    }

    function leaveCommentClickHandler() {
        
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