import React, { useState } from "react"
import Modal from "../Common/Modal/Modal"
import { StyledCommentCardArticle } from "./CommentCard.styled"
import * as commentServices from '../../services/commentServices'

type CommentCardProps = {
    comment: {
        id: string,
        joke: string,
        title: string,
        content: string,
        createdAt: string,
        modifiedAt: string | undefined
    },
    updateComments: ()=> void
}

function CommentCard({comment, updateComments}: CommentCardProps) {
    const [editComment, setEditComment] = useState(false)

    function editCommentHandler(toggle: boolean) {
        setEditComment(toggle)
    }

    function deleteCommentHanlder() {
        commentServices.deleteComment(comment.id)
        updateComments()
    }

    function radioButtonHander(status: number) {
        console.log(status);
    }


    return (
        <StyledCommentCardArticle>
            <header>
                <p>{comment.joke}</p>
            </header>
            <hr/>
            <main>
                <div>
                    <h5>{comment.title}</h5>
                    <p>{comment.content}</p>
                </div>
                <p>Created at: <br/>{comment.createdAt}</p>
            </main>

            <footer>
                <button value="edit-comment" onClick={() => editCommentHandler(true)}>Edit Comment</button>
                <button value="delete-comment" onClick={deleteCommentHanlder}>Delete Comment</button>

                <form>
                    <label htmlFor="radio-public">Public</label>
                    <input type="radio" name="status" id="radio-public" value="1" onClick={e=> radioButtonHander(1)}/>

                    <label htmlFor="radio-suspended">Suspended</label>
                    <input type="radio" name="status" id="radio-suspended" value="2" onClick={e => radioButtonHander(2) }/>
                </form>
            </footer>

            {
                editComment 
                ? <Modal joke={comment.joke} comment={comment} editCommentHandler={editCommentHandler} updateComments={updateComments}/>
                : ""
            }

        </StyledCommentCardArticle>
    )
}

export default CommentCard