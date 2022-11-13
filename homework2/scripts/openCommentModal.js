import Comment from '../model/Comment.js'

import * as commentServices from '../services/commentsServices.js'

import displayFavorites from './displayFavorites.js';

let body = document.querySelector('body')
let modalHtml = `
    <div class="modal">
        <p class="modal-exit-button"><span class="material-symbols-outlined">close</span></p>   
        <h3>Place your comment down below</h3>

        <form action="" class="modal-form">
            <label for="title">Comment title:</label>
            <input type="text" name="title" id="title" placeholder="Insert title here...">

            <label for="content">Comment content:</label>
            <textarea type="text" name="content" id="content" rows="6" placeholder="Insert content here..."></textarea>

            <input type="submit" name="add-edit-comment" value="">
        </form>
    </div>
`

export default function openCommentModal(bookId, commentObj) {
    body.insertAdjacentHTML('afterbegin', modalHtml);
    body.style.overflow = 'hidden';

    let modal = document.querySelector('.modal');
    let modalExitButton = document.querySelector('.modal .modal-exit-button')
    let modalForm = document.querySelector('.modal-form');
    
    if(commentObj) {
        document.querySelector('.modal #title').value = commentObj.title
        document.querySelector('.modal #content').textContent = commentObj.content
        document.querySelector('.modal input[name="add-edit-comment"]').value = 'Edit Comment';
    } else {
        document.querySelector('.modal input[name="add-edit-comment"]').value = 'Add Comment';
    }

    modalForm.addEventListener('submit', e => {
        e.preventDefault()

        let formData = new FormData(e.currentTarget);
        let title = formData.get('title');
        let content = formData.get('content');
        let modifiedAt = (new Date()).toString();

        let comment = new Comment(bookId, title, content);

        if(commentObj) {
            commentServices.edit(commentObj.commentId, {title, content, modifiedAt })
                .then(res => res.json())
                .then(data => {
                    displayFavorites()

                    body.removeChild(modal);
                    body.style.overflow = 'scroll';
                })
        } else {
            commentServices.add(comment)
                .then(res => res.json())
                .then(data => {
                    displayFavorites()

                    body.removeChild(modal);
                    body.style.overflow = 'scroll';
                })
                .catch(err => console.log(err))
        }
    })

    modalExitButton.addEventListener("click", (e) => {
        e.preventDefault();

        body.removeChild(modal);
        body.style.overflow = 'scroll';
    })


}   