import { useState } from 'react'
import Modal from '../Common/Modal/Modal'
import JokeGenerator from '../JokeGenerator'
import { StyledJokesSection } from './JokesSection.styled'

function JokesSection() {
  let [leaveComment, setLeaveComment] = useState<boolean>(false)
  let [joke, setJoke] = useState<string>('')

  function toggleCommentForm(toggle: boolean, currentJoke:string) {
    if(toggle){
      setJoke(currentJoke)
      setLeaveComment(true)
      
    }
    else {
      setLeaveComment(false)
    }
  }

  return (
    <StyledJokesSection>
      <JokeGenerator toggleCommentForm={toggleCommentForm}/>

      {
        leaveComment
          ? <Modal joke={joke} comment={null} />
          : ""
      }

    </StyledJokesSection>
  )
}

export default JokesSection