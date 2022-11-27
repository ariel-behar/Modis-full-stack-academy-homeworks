import { StyledLeaveCommentFormDiv } from "./LeaveCommentForm.styled"

type LeaveCommentFormProps = {
    joke: string
}

function LeaveCommentForm({ joke }: LeaveCommentFormProps) {
    return (
        <StyledLeaveCommentFormDiv>
            <h4>You are about to leave a comment on the following joke:</h4>
            <p>{joke}</p>

            <form>
                <label htmlFor="comment-title">Comment Title</label>
                <input type="text" name="comment-title" id="comment-title" />

                <label htmlFor="comment-content">Comment Content</label>
                <textarea name="comment-content" id="comment-content" rows={20}></textarea>

                <input type="submit" value="Submit Comment" />
            </form>
        </StyledLeaveCommentFormDiv>
    )
}

export default LeaveCommentForm