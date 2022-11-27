import React, { useState } from "react"

import { StyledCommentFormDiv } from "./CommentForm.styled"

import * as commentServices from "../../services/commentServices"
import { Comment, CommentStatus } from "../../model/Comment"

type CommentFormProps = {
    joke: string
    comment?: any,
    formType: string,
    closeModalHandler: () => void,
    updateComments: () => void
}

function CommentForm({ joke, comment, formType, closeModalHandler, updateComments }: CommentFormProps) {
    let [inputFeedback, setInputFeedback] = useState<boolean>(false)

    function onSubmitFormHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let formData = new FormData(e.currentTarget)
        let [commentTitle, commentContent] = Array.from(formData.values()) as string[];

        if ((commentTitle.length < 1 || commentTitle.length > 80) || (commentContent.length < 1 || commentContent.length > 512)) {
            setInputFeedback(true)
            setTimeout(() => {
                setInputFeedback(false)
            }, 3000);
        } else {

            if(formType === 'add') {
                try {
                    let newCommentId: number = Number((new Date()).getTime());
    
                    let newComment = new Comment(newCommentId, joke, commentTitle, commentContent, CommentStatus.Public, (new Date()))
    
                    commentServices.add(newComment)
    
                    closeModalHandler()
                    updateComments()
    
                } catch (err) {
                    console.log(err)
                }
            } else {
                try {
                    commentServices.edit(comment.id, commentTitle, commentContent)
                    closeModalHandler()
                    updateComments()
                } catch (err) {
                    console.log(err)
                }
            }
            
        }
    }

    return (
        <StyledCommentFormDiv>

            <h4>You are about to leave a comment on the following joke:</h4>
            <p>{joke}</p>

            <form onSubmit={onSubmitFormHandler}>
                <label htmlFor="comment-title">Comment Title</label>
                <input type="text" name="comment-title" id="comment-title" placeholder={comment ? comment.title : 'Enter title here...'}/>
                <span className="input-length-error" style={inputFeedback ? { display: "block" } : { display: "none" }}>Title should between 1 and 80 characters long</span>

                <label htmlFor="comment-content">Comment Content</label>
                <textarea name="comment-content" id="comment-content" rows={10} placeholder={comment ? comment.content : 'Enter Content here...'}></textarea>
                <span className="input-length-error" style={inputFeedback ? { display: "block" } : { display: "none" }}>Content should between 1 and 512 characters long</span>

                <input type="submit" value="Submit Comment" />
            </form>


        </StyledCommentFormDiv>
    )
}

export default CommentForm