import generateComments from "./generateComments.js";
import { isFavoriteBook } from "./isFavoriteBook.js";

export default async function createBook(book, googleBookId) {
    let isFavoriteResponse = await isFavoriteBook(googleBookId);
    
    let favoriteBookId = await isFavoriteResponse.bookId ? isFavoriteResponse.bookId : undefined;
    let addRemoveHTMLString = await isFavoriteResponse.htmlString;
    let comments = await isFavoriteResponse.bookObj?.comments.length > 0 ? isFavoriteResponse.bookObj.comments : false;

    let commentsResult = comments ? generateComments(comments) : `<h4>There are no comments for this book... Yet :)</h4>`
    
    let bookCard = document.createElement('article');
        bookCard.classList.add('book-card')
        bookCard.setAttribute('data-google-book-id', googleBookId)
        bookCard.setAttribute('data-book-id', favoriteBookId)
        bookCard.setAttribute('data-is-favorite', favoriteBookId ? 'yes' : 'no')

        bookCard.innerHTML = `
            <div class="favorites-div">
                <p class="add-remove-to-from-favorites-par">${ addRemoveHTMLString } </p>
            </div>
            <header class="book-heading">
                <h3 class="book-title">${book.title}</h3>
                <h4 class="book-author">by <span>${book.authors ? `${book.authors.join(' & ')}` : 'author unknown'}</span></h4>
            </header>
            <img class="book-image" src="${ book.imageLinks?.thumbnail ? book.imageLinks.thumbnail : book.imageUrl}">
            <p class="book-description">${book.description ? book.description : ''}</p>
            <div class="book-comments-section"> 
                <header>
                    <h3 class="book-comments-section-title">Comments</h3>
                    <button name="add-comment" value="add-comment">Add Comment</button>
                </header>
                <div class="book-comments">
                    ${ commentsResult }
                </div>
            </div>`
            
            
            
        ;

    return bookCard;
}
