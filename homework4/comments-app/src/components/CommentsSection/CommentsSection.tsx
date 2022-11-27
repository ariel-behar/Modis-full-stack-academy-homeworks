import { useEffect, useState } from 'react'
import CommentCard from '../CommentCard/CommentCard'
import { StyledCommentsSection } from './CommentsSection.styled'

function CommentsSection() {
	let [comments, setComments] = useState<any[]>([])

	useEffect(() => {
		try {
			updateComments()
		}
		catch (err) {
			console.log(err)
		}

	}, [comments])
	
	function updateComments(){
		let storedComments: string | null = localStorage.getItem('jokeComments')

		if (typeof storedComments === 'string') {
			if(storedComments !== JSON.stringify(comments)) {
				setComments(JSON.parse(storedComments))
			}
		}
	}


	return (
		<StyledCommentsSection>
			<span className='section-corner-title'>Comments</span>

			{
				comments.length > 0
					? comments.map(comment => <CommentCard key={comment.id} comment={comment} updateComments={updateComments}/> )
					: <h4>There are no comments yet</h4>
			}
		</StyledCommentsSection>
	)
}

export default CommentsSection