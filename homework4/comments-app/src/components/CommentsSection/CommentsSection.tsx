import { useEffect, useState } from 'react'
import CommentCard from '../CommentCard/CommentCard'
import { StyledCommentsSection } from './CommentsSection.styled'

type CommentsSectionProps = {
	comments: any,
	updateComments: () => void
}




function CommentsSection({ comments, updateComments }: CommentsSectionProps) {
	const [checkedRadio, setCheckedRadio] = useState<number>(1)
	const [selectedComments, setSelectedComments] = useState<object[]>([])

	useEffect(() => {
		let filtered = comments.filter((comment:any) => comment.commentStatus === checkedRadio)
		
		setSelectedComments(filtered)

		return () => {
		}
	}, [checkedRadio])


	function radioButtonHander(radioBtnValue: number): void {
		setCheckedRadio(radioBtnValue)

		updateComments()
	}

	return (
		<StyledCommentsSection>
			<span className='section-corner-title'>Comments</span>

			{
				comments.length > 0
					?
					<>
						<div className='comments-radio-buttons'>
							<label htmlFor="radio-public">Public</label>
							<input type="radio" name="status" id="radio-public" value="1" onChange={e => radioButtonHander(1)} checked={checkedRadio === 1 ? true : false} />

							<label htmlFor="radio-suspended">Suspended</label>
							<input type="radio" name="status" id="radio-suspended" value="2" onChange={e => radioButtonHander(2)} checked={checkedRadio === 2 ? true : false} />
						</div>

						{selectedComments.map((comment: any) => <CommentCard key={comment.id} comment={comment} updateComments={updateComments} />)}
					</>

					: <h4>There are no comments yet</h4>
			}
		</StyledCommentsSection>
	)
}

export default CommentsSection