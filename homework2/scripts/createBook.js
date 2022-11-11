import isFavoriteBook from "./isFavoriteBook.js";

export default async function createBook(book) {
    let bookCard = document.createElement('article');
        bookCard.classList.add('book-card')
        bookCard.setAttribute('data-google-book-id', book.id)
        bookCard.innerHTML = `<header class="book-heading">
                <h3 class="book-title">${book.volumeInfo.title}</h3>
                <h4 class="book-author">by <span>${book.volumeInfo.authors ? `${book.volumeInfo.authors.join(' & ')}` : 'author unknown'}</span></h4>
            </header><img class="book-image" src="${book.volumeInfo.imageLinks.thumbnail}">
            <p class="book-description">${book.volumeInfo.description ? book.volumeInfo.description : ''}</p>
            <div class="favorites-div">
                <p class="add-remove-to-from-favorites-par">${ await isFavoriteBook(book.id) }</p>
            </div>`;

    return bookCard;
}


    // function generateDescription(){
    //     if(book.volumeInfo.description) {
    //         if(book.volumeInfo.description.length >= 300) {
    //             let truncatedDescription = book.volumeInfo.description.slice(0,300)
    
    //             truncatedDescription = truncatedDescription.split(' ')
    //             truncatedDescription.push('...')
    //             return truncatedDescription.join(' ')
    //         } else {
    //             return book.volumeInfo.description
    //         }
    //     } else {
    //         return ''
    //     }
    // }