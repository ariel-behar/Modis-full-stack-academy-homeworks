import Comment from '../model/Comment.js'

import * as commentServices from '../services/commentsServices.js'

import displayFavorites from './displayFavorites.js';

let body = document.querySelector('body')
let modalHtmlForm = `
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

let modalHtmlConfirm = `
    <div class="modal">
        <p class="modal-exit-button"><span class="material-symbols-outlined">close</span></p>

        <h3>Are you sure you want to delete this comment?</h3>
        <div class="modal-buttons">
            <p class="user-confirm user-confirm-yes">YES <span class="material-symbols-outlined filled-star">done</span> </p>
            <p class="user-confirm user-confirm-no">No <span class="material-symbols-outlined filled-star">close</span> </p>
        </div> 
    </div>`

export default function openCommentModal(bookId, commentObj, confirmationModal, commentId) {
    body.style.overflow = 'hidden';

    if(confirmationModal) {
        body.insertAdjacentHTML('afterbegin', modalHtmlConfirm);

        document.querySelectorAll('.user-confirm').forEach(par => {
            par.addEventListener('click', e => {
          
                if(e.currentTarget.classList.contains('user-confirm-yes')) {
                    commentServices.deleteOne(commentId)
                        .then(res => res.json())
                        .then(data => {
                            displayFavorites()
    
                            body.removeChild(modal);
                            body.style.overflow = 'scroll';
                        })

                    return true;
                } else {
                    body.removeChild(modal);
                    body.style.overflow = 'scroll';

                    return false;
                }
                
            })
        })

    } else {
        body.insertAdjacentHTML('afterbegin', modalHtmlForm);
        
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
    }

    let modalExitButton = document.querySelector('.modal .modal-exit-button')
    let modal = document.querySelector('.modal');

    modalExitButton.addEventListener("click", (e) => {
        e.preventDefault();

        body.removeChild(modal);
        body.style.overflow = 'scroll';
    })


  

  


}   