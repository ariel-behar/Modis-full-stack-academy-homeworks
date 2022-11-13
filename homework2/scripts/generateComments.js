export default function generateComments(comments){
    let result =''; 

    for (const comment of comments) {
        let commentResult = `<div class="comment" data-comment-id="${comment.id}">
                <h4 class="comment-title">${comment.title}</h4>
                <p class="comment-content">${comment.content}</p>
                <div class="comment-buttons">
                    <button name="edit-comment" value="edit-comment">Edit</button>
                    <button name="delete-comment" value="delete-comment">Delete</button>
                </div>
            </div>`
        
        result+= commentResult;
    }
    return result;
}