import { useEffect, useState } from 'react'
import CommentCard from '../CommentCard/CommentCard'
import { StyledCommentsSection } from './CommentsSection.styled'

type CommentsSectionProps ={
	comments: any,
	updateComments: () => void
}

function CommentsSection({comments, updateComments}:CommentsSectionProps ) {
	return (
		<StyledCommentsSection>
			<span className='section-corner-title'>Comments</span>

			{
				comments.length > 0
					? comments.map((comment: any) => <CommentCard key={comment.id} comment={comment} updateComments={updateComments}/> )
					: <h4>There are no comments yet</h4>
			}
		</StyledCommentsSection>
	)
}

export default CommentsSection