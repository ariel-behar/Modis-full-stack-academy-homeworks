import * as favoritesServices from '../services/favoritesServices.js'
import * as commentServices from '../services/commentsServices.js'

import displaySearchResults from "./displaySearchResults.js"
import addRemovetoFromFavorites from "./addRemovetoFromFavorites.js"
import openModal from "./openModal.js"

export default function displayFavorites() {
    return favoritesServices.getAll()
        .then(res => res.json())
        .then(books => {
            if(books.length > 0) {
                for (const book of books) {
                    commentServices.getAllbyBookId(book.id)
                        .then(res => res.json())
                        .then(comment => {
                            book.comments.push(comment)
                        })
                }

                displaySearchResults(books, 'Favorites')
                    .then(() => {
                        document.querySelectorAll('.add-remove-to-from-favorites-par').forEach(paragraph => {
                            paragraph.addEventListener('click', (e) => {
                                addRemovetoFromFavorites(e.currentTarget, true)
                            })
                        });

                        document.querySelectorAll('button[name="add-comment"]').forEach(btn => {
                            btn.addEventListener('click', () => {
                                let bookId = btn.parentElement.parentElement.parentElement.getAttribute('data-book-id')
                                
                                openModal(bookId)
                            })
                        })

                        document.querySelectorAll('button[name="delete-comment"]').forEach(btn => {
                            btn.addEventListener('click', () => {
                                let commentId = btn.parentElement.parentElement.getAttribute('data-comment-id')

                                // The delete request is made inside the modal
                                openModal(null, null, true, commentId)
                                
                            })
                        })

                        document.querySelectorAll('button[name="edit-comment"]').forEach(btn => {
                            btn.addEventListener('click', () => {
                                let commentId = btn.parentElement.parentElement.getAttribute('data-comment-id')
                                let title = btn.parentElement.parentElement.children[0].textContent
                                let content = btn.parentElement.parentElement.children[1].textContent

                                let commentObj = {
                                    commentId,
                                    title, 
                                    content
                                }

                                openModal(null, commentObj)
                                
                                displayFavorites();
                            })
                        })

                        document.querySelectorAll('.hide-expand-comments').forEach(btn => {
                            btn.addEventListener('click', (e) => {
                                let currentCommentSection = e.currentTarget.parentElement.parentElement.children[1];

                                if(currentCommentSection.style.display == '') {
                                    currentCommentSection.style.display = 'flex';
                                } else if(currentCommentSection.style.display == 'none'){
                                    currentCommentSection.style.display = 'flex';
                                } else {
                                    currentCommentSection.style.display = 'none';
                                }
                                
                            })
                        })
                    })
            } else {
                displaySearchResults(false, 'Favorites')
            }
        })
        .catch(err => console.log(err))
}