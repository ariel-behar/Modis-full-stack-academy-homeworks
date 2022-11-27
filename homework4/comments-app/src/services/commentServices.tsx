

export const add = (newCommentId:number, newComment:object) => {
    try {
        localStorage.setItem(newCommentId.toString(), JSON.stringify(newComment))
    } catch (err) {
        console.log(err);
    }
}