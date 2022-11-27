import { useState } from "react"
import CommentForm from "../../CommentForm/CommentForm"
import { StyledModalDiv } from "./Modal.styled"

type ModalProps = {
    joke: string,
    comment?: object | null,
    editCommentHandler?: (b: boolean) => void,
    updateComments: () => void
}

function Modal(props: ModalProps) {
    const [showModal, setShowModal] = useState<boolean>(true)

    const modalType = props.comment ? 'edit' :'add';

    function closeModalHandler(){
        setShowModal(false)

        if(props.editCommentHandler) {
            props.editCommentHandler(false)
        }
    }

    return (
        <>
        {
            showModal 
            ? <StyledModalDiv>
                    <span className="close-modal-btn" onClick={closeModalHandler}>X</span>
                    {modalType === 'add'
                        ? <CommentForm 
                            joke={props.joke} 
                            comment={undefined} 
                            formType={'add'} 
                            closeModalHandler={closeModalHandler}
                            updateComments={props.updateComments}
                        />
                        : <CommentForm 
                            joke={props.joke} 
                            comment={props.comment!} 
                            formType={'edit'}
                            closeModalHandler={closeModalHandler}
                            updateComments={props.updateComments}
                            />
                    
                    }
                </StyledModalDiv>
            : ""
        }
        </>
    )
}

export default Modal