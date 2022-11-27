import { useState } from 'react'
import JokeGenerator from '../JokeGenerator'
import LeaveCommentForm from '../LeaveCommentForm/LeaveCommentForm'
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
          ? <LeaveCommentForm joke={joke} />
          : ""
      }

    </StyledJokesSection>
  )
}

export default JokesSection