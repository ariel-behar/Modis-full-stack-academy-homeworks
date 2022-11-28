import React, { useEffect, useState } from "react"
import Modal from "../Common/Modal/Modal"
import { StyledCommentCardArticle } from "./CommentCard.styled"
import * as commentServices from '../../services/commentServices'

type CommentCardProps = {
    comment: {
        id: string,
        joke: string,
        title: string,
        commentStatus: number,
        content: string,
        createdAt: string,
        modifiedAt: string | undefined
    },
    updateComments: () => void
}

function CommentCard({ comment, updateComments }: CommentCardProps) {
    const [editComment, setEditComment] = useState(false)
    const [checkedRadio, setCheckedRadio] = useState<number>(1)

    useEffect(() => {
        setCheckedRadio(comment.commentStatus)

    }, [])

    function editCommentHandler(toggle: boolean) {
        setEditComment(toggle)
    }

    function deleteCommentHanlder() {
        commentServices.deleteComment(comment.id)
        updateComments()
    }

    function radioButtonHander(radioBtnValue: number): void {
        setCheckedRadio(radioBtnValue)

        commentServices.editCommentStatus(comment.id, radioBtnValue)
    }

    return (
        <StyledCommentCardArticle>
            <header>
                <p>{comment.joke}</p>
            </header>
            <hr />
            <main>
                <div>
                    <h5>{comment.title}</h5>
                    <p>{comment.content}</p>
                </div>
                <div>
                    <p>Created at: <br />{comment.createdAt}</p>
                    <form>
                        <label htmlFor="radio-public">Public</label>
                        <input type="radio" name="status" id="radio-public" value="1" onChange={e => radioButtonHander(1)} checked={checkedRadio === 1 ? true : false} />

                        <label htmlFor="radio-suspended">Suspended</label>
                        <input type="radio" name="status" id="radio-suspended" value="2" onChange={e => radioButtonHander(2)} checked={checkedRadio === 2 ? true : false} />
                    </form>
                </div>
            </main>

            <footer>
                <button value="edit-comment" onClick={() => editCommentHandler(true)}>Edit Comment</button>
                <button value="delete-comment" onClick={deleteCommentHanlder}>Delete Comment</button>


            </footer>

            {
                editComment
                    ? <Modal joke={comment.joke} comment={comment} editCommentHandler={editCommentHandler} updateComments={updateComments} />
                    : ""
            }

        </StyledCommentCardArticle>
    )
}

export default CommentCard