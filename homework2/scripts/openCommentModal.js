import Comment from '../model/Comment.js'
import * as commentServices from '../services/commentsServices.js'

let body = document.querySelector('body')
let modalHtml = `
    <div class="modal">
        <p class="modal-exit-button"><span class="material-symbols-outlined">close</span></p>   
        <form action="" class="modal-form">
            <label for="title">Comment title:</label>
            <input type="text" name="title" id="title">

            <label for="content">Comment content:</label>
            <textarea type="text" name="content" id="content" rows="6"></textarea>

            <input type="submit" name="add-comment" value="Add Comment">
        </form>
    </div>
`


export default function openCommentModal(bookId) {
    body.insertAdjacentHTML('afterbegin', modalHtml);
    body.style.overflow = 'hidden';

    let modal = document.querySelector('.modal');
    let modalExitButton = document.querySelector('.modal .modal-exit-button')
    let modalForm = document.querySelector('.modal-form');

    modalForm.addEventListener('submit', e => {
        e.preventDefault()

        let formData = new FormData(e.currentTarget);
        let title = formData.get('title');
        let content = formData.get('content');

        let comment = new Comment(bookId, title, content);
        console.log('comment:', comment)

        commentServices.add(comment)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

    })
        
    modalExitButton.addEventListener("click", (e) => {
        e.preventDefault();

        body.removeChild(modal);
        body.style.overflow = 'scroll';
    })


}   