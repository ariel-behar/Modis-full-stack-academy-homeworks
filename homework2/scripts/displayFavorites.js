import * as favoritesServices from '../services/favoritesServices.js'
import * as commentServices from '../services/commentsServices.js'

import displaySearchResults from "./displaySearchResults.js"
import addRemovetoFromFavorites from "./addRemovetoFromFavorites.js"
import openCommentModal from "./openCommentModal.js"
import clearSearchResultsSection from "./clearSearchResultsSection.js"

export default function displayFavorites() {
    return favoritesServices.getAll()
        .then(res => res.json())
        .then(books => {
            clearSearchResultsSection()

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
                                addRemovetoFromFavorites(e.currentTarget)
                            })
                        });

                        document.querySelectorAll('button[name="add-comment"]').forEach(btn => {
                            btn.addEventListener('click', () => {
                                let bookId = btn.parentElement.parentElement.parentElement.getAttribute('data-book-id')
                                
                                openCommentModal(bookId)
                            })
                        })
                    })
            } else {
                displaySearchResults(false, 'Favorites')
            }
        })
        .catch(err => console.log(err))
}