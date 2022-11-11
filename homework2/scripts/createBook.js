import { isFavoriteBook } from "./isFavoriteBook.js";

export default async function createBook(book) {
    let googleBookId = book.id

    let isFavoriteResponse = await isFavoriteBook(googleBookId);
    
    let favoriteBookId = isFavoriteResponse ? undefined : isFavoriteResponse.bookId;
    let addRemoveHTMLString = isFavoriteResponse.htmlString;
    
    let bookCard = document.createElement('article');
        bookCard.classList.add('book-card')
        bookCard.setAttribute('data-google-book-id', book.id)
        bookCard.setAttribute('data-book-id', favoriteBookId)
        bookCard.setAttribute('data-is-favorite', favoriteBookId ? 'yes' : 'no')

        bookCard.innerHTML = `<header class="book-heading">
                <h3 class="book-title">${book.volumeInfo.title}</h3>
                <h4 class="book-author">by <span>${book.volumeInfo.authors ? `${book.volumeInfo.authors.join(' & ')}` : 'author unknown'}</span></h4>
            </header><img class="book-image" src="${book.volumeInfo.imageLinks.thumbnail}">
            <p class="book-description">${book.volumeInfo.description ? book.volumeInfo.description : ''}</p>
            <div class="favorites-div">
                <p class="add-remove-to-from-favorites-par">${ addRemoveHTMLString } </p>
            </div>`;

    return bookCard;
}
