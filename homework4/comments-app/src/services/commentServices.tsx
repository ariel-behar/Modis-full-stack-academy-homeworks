import { CommentStatus } from '../model/Comment'

export const add = (newComment:object) => {
    let currentComments: null | string = localStorage.getItem('jokeComments')

    if(currentComments === null) {
        let newCommentsArray = [newComment]

        try {
            localStorage.setItem('jokeComments', JSON.stringify(newCommentsArray))
        } catch (err) {
            console.log(err);
        }
    } else {
        let updatedListComments: object[] = JSON.parse(currentComments)
        updatedListComments.push(newComment)

        try {
            localStorage.setItem('jokeComments', JSON.stringify(updatedListComments))
        } catch (err) {
            console.log(err);
        }
    }
}

export const edit = (commentId: string, commentTitle: string, commentContent: string) => {
    let currentComments:string | null = localStorage.getItem('jokeComments')

    if(currentComments !== null) {
        let parsedComments: object[] = JSON.parse(currentComments)

        let foundComment: any = parsedComments.find((comment: any) => comment.id === commentId)

        foundComment.title = commentTitle;
        foundComment.content = commentContent;
        foundComment.modifiedAt = (new Date())

        parsedComments[foundComment.id] = foundComment;

        localStorage.setItem('jokeComments', JSON.stringify(parsedComments))
    }
}

export const editCommentStatus = (commentId: string, commentStatus: number) => {
    let currentComments:string | null = localStorage.getItem('jokeComments')

    if(currentComments !== null) {
        let parsedComments: object[] = JSON.parse(currentComments)

        let foundComment: any = parsedComments.find((comment: any) => comment.id === commentId)

        foundComment.commentStatus = commentStatus === 1 ? CommentStatus.Public : CommentStatus.Suspended;

        parsedComments[foundComment.id] = foundComment;

        localStorage.setItem('jokeComments', JSON.stringify(parsedComments))
    }
}




export const deleteComment = (commentId: string) => {
    let currentComments:string | null = localStorage.getItem('jokeComments')

    if(currentComments !== null) {
        let parsedComments: object[] = JSON.parse(currentComments)

        let filteredComments: any = parsedComments.filter((comment: any) => comment.id !== commentId)

        localStorage.setItem('jokeComments', JSON.stringify(filteredComments))
    }
}