import generateComments from "./generateComments.js";
import { isFavoriteBook } from "./isFavoriteBook.js";

export default async function createBook(book, googleBookId, isFavorite) {
    let isFavoriteResponse = await isFavoriteBook(googleBookId);
    
    let favoriteBookId = await isFavoriteResponse.bookId ? isFavoriteResponse.bookId : undefined;
    let addRemoveHTMLString = await isFavoriteResponse.htmlString;
    let comments;
    if(isFavorite) {
        comments = book.comments[0]
    }
    
    let commentsResult = comments != undefined && comments.length > 0 ? generateComments(comments) : `<p>There are no comments for this book... Yet :)</p>`

    let noCommentsClass = comments != undefined && comments.length > 0 ? '' : 'no-comments';

    let commentsSection = isFavorite 
        ? ` <div class="book-comments-section"> 
            <header>
                <h5 class="book-comments-section-title">Comments</h5>
                <button name="add-comment">Add Comment</button>
            </header>
            <div class="book-comments ${noCommentsClass}">
                ${ commentsResult }
            </div>
        </div>` 
        : "";
    
    let bookCard = document.createElement('article');
        bookCard.classList.add('book-card')
        bookCard.setAttribute('data-google-book-id', googleBookId)
        bookCard.setAttribute('data-book-id', favoriteBookId)
        bookCard.setAttribute('data-is-favorite', favoriteBookId ? 'yes' : 'no')

        bookCard.innerHTML = `
            <div class="favorites-div">
                <h5 class="add-remove-to-from-favorites-par">${ addRemoveHTMLString } </h5>
            </div>
            <header class="book-heading">
                <h4 class="book-title">${book.title}</h4>
                <h5 class="book-author">by <span>${book.authors ? `${book.authors.join(' & ')}` : 'author unknown'}</span></h5>
            </header>
            <div class="book-content">
                <img class="book-image" src="${ book.imageLinks?.thumbnail ? book.imageLinks.thumbnail : book.imageUrl}">
                <p class="book-description">${book.description ? book.description : ''}</p>
            </div>
            ${commentsSection}`;
        
    return bookCard;
}
