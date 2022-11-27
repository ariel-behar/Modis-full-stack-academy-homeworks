import React, { useState } from "react"

import { StyledLeaveCommentFormDiv } from "./LeaveCommentForm.styled"

import * as commentServices from "../../services/commentServices"
import { Comment, CommentStatus } from "../../model/Comment"

type LeaveCommentFormProps = {
    joke: string
}

function LeaveCommentForm({ joke }: LeaveCommentFormProps) {
    let [inputFeedback, setInputFeedback] = useState<boolean>(false)
    let [commentSubmitted, setCommentSubmitted] = useState<boolean>(false)


    function onSubmitFormHandler(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        let formData = new FormData(e.currentTarget)
        let [commentTitle, commentContent] = Array.from(formData.values()) as string[];

        if((commentTitle.length < 1 || commentTitle.length > 80) || (commentContent.length < 1 || commentContent.length > 512)) {
            setInputFeedback(true)
            setTimeout(() => {
                setInputFeedback(false)
            }, 3000);
        } else {
            try {
                let newCommentId:number = Number((new Date()).getTime());

                let newComment = new Comment(newCommentId, joke, commentTitle, commentContent, CommentStatus.Public, (new Date()))

                commentServices.add(newCommentId, newComment)

                setCommentSubmitted(true)
            } catch(err) {
                console.log(err)
            }
        }
    }

    return (
        <StyledLeaveCommentFormDiv>
            {
                !commentSubmitted
                ? 
                <>
                    <h4>You are about to leave a comment on the following joke:</h4>
                    <p>{joke}</p>

                    <form onSubmit={onSubmitFormHandler}>
                        <label htmlFor="comment-title">Comment Title</label>
                        <input type="text" name="comment-title" id="comment-title" />
                        <span className="input-length-error" style={inputFeedback ? {display: "block"} : {display:"none"}}>Title should between 1 and 80 characters long</span>

                        <label htmlFor="comment-content">Comment Content</label>
                        <textarea name="comment-content" id="comment-content" rows={10}></textarea>
                        <span className="input-length-error" style={inputFeedback ? {display: "block"} : {display:"none"}}>Content should between 0 and 512 characters long</span>

                        <input type="submit" value="Submit Comment" />
                    </form>
                </>

                : <h4>. Thank you. Your comment has succesfully been submitted!</h4>

            }
          
        </StyledLeaveCommentFormDiv>
    )
}

export default LeaveCommentForm