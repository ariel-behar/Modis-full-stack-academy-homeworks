import * as searchServices from './services/searchServices.js'
import * as favoritesServices from './services/favoritesServices.js'
import FavoriteBook from './model/FavoriteBook.js'

let mainSection = document.getElementById('main-section')
let searchForm = document.querySelector('.search-form')
let searchResultsSection = document.getElementById('search-results-section')
let searchResultsDiv = document.querySelector('#search-results-section .search-results')
let shrinkSectionButton = document.querySelector('.shrink-section-button')
let mainSectionHeading = document.querySelector('#main-section h1');

searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    let searchTerm = new FormData(e.currentTarget).get('searchTerm')
    if(searchTerm.length > 0) {
        let processedSearchTerm = searchTerm.split(' ').join('+')
    
        searchServices.searchBooks(processedSearchTerm)
            .then(res => res.json())
            .then(data => {
                displaySearchResults(data, searchTerm)
                document.querySelectorAll('.add-remove-to-from-favorites-par').forEach(paragraph => {
                    paragraph.addEventListener('click', (e) =>{
                        addRemovetoFromFavorites(e.currentTarget)
                    })
                });
                
            })
            .catch(err => console.log(err))
    }
})

function clearSearchResultsSection() {
    while(searchResultsDiv.firstChild){
        searchResultsDiv.removeChild(searchResultsDiv.lastChild)
    }
}

function toggleSearchResultsSection(toggle){
    if(toggle) {
        searchResultsSection.style.opacity = "1";

        mainSection.style.height = '30vh';
        document.getElementById('search-term').value = '';
    
        mainSectionHeading.style.display = 'none'
        shrinkSectionButton.style.display = 'block'
        
        setTimeout(() => {
            shrinkSectionButton.style.opacity = "1";
        }, 500);
    } else {
        searchResultsSection.style.opacity = "0";

        mainSection.style.height = '100vh';
        document.getElementById('search-term').value = '';
    
        mainSectionHeading.style.display = 'block'

        clearSearchResultsSection();

        shrinkSectionButton.style.opacity = "0";

        setTimeout(() => {
            shrinkSectionButton.style.display = 'none'
        }, 1000);
    }
}

function displaySearchResults(results, searchTerm) {
    clearSearchResultsSection()

    for (const book of results.items) {
        createBook(book)
        toggleSearchResultsSection(true)
    }

    document.querySelector('#search-results-section .search-results-heading span').textContent = searchTerm;
}

function createBook(book) {
    let bookCardArticle = document.createElement('article');
    bookCardArticle.classList.add('book-card')
    bookCardArticle.setAttribute('data-google-book-id', book.id)
    bookCardArticle.innerHTML = `<header class="book-heading">
            <h3 class="book-title">${book.volumeInfo.title}</h3>
            <h4 class="book-author">by <span>${book.volumeInfo.authors ? `${book.volumeInfo.authors.join(' & ')}` : 'author uknown'}</span></h4>
        </header><img class="book-image" src="${book.volumeInfo.imageLinks.thumbnail}">
        <p class="book-description">${book.volumeInfo.description ? book.volumeInfo.description : ''}</p>
        <div class="favorites-div">
            <p class="add-remove-to-from-favorites-par">Add to Favorites<span class="material-symbols-outlined">star</span></p>
        </div>`;


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

    searchResultsDiv.appendChild(bookCardArticle)
}

shrinkSectionButton.addEventListener('click', () =>{
    toggleSearchResultsSection(false)
})

function addRemovetoFromFavorites(currentTarget){
    // Need to continue from here
    let googleBookId = currentTarget.parentElement.parentElement.getAttribute('data-google-book-id');
    
    let bookTitle = currentTarget.parentElement.parentElement.children[0].children[0].textContent
    let bookAuthor = currentTarget.parentElement.parentElement.children[0].children[1].children[0].textContent
    let bookImage = currentTarget.parentElement.parentElement.children[1].getAttribute('src')
    
    let bookIbookDescription = currentTarget.parentElement.parentElement.children[2].textContent

    let favoriteBook = new FavoriteBook(googleBookId, bookTitle, bookAuthor, bookImage, bookIbookDescription)
    console.log('favoriteBook:', favoriteBook)
    
    favoritesServices.add(favoriteBook)
        .then(res => res.json())
        .then(data=> console.log(data))
        .catch(err => console.log(err))
}

    
    // let bookHeader = document.createElement('header')
    // bookHeader.classList.add('book-heading')

    // let bookTitle = document.createElement('h3')
    // bookTitle.classList.add('book-title')
    // bookTitle.textContent = book.volumeInfo.title

    // let bookAuthor = document.createElement('h4')
    // bookAuthor.classList.add('book-author')
    // bookAuthor.textContent = book.volumeInfo.authors ? `by ${book.volumeInfo.authors.join(' & ')}` : 'author uknown'

    // let bookImage = document.createElement('img')
    // bookImage.classList.add('book-image')
    // bookImage.src = book.volumeInfo.imageLinks.thumbnail

    // let bookDescription = document.createElement('p')
    // bookDescription.classList.add('book-description')

 

    // let favoritesDiv = document.createElement('div')
    // favoritesDiv.classList.add('favorites-div')
    // favoritesDiv.innerHTML =``

    // let favoritesParagraph = document.createElement('p')
    // favoritesParagraph.textContent = 'Add to Favorites'
    // favoritesParagraph.addEventListener('click', (e) =>{
    //     addRemovetoFromFavorites(e.currentTarget)
    // })

    // let starSpan = document.createElement('span')
    // starSpan.textContent = 'star'
    // starSpan.classList.add('material-symbols-outlined')

    // favoritesParagraph.appendChild(starSpan)
    // favoritesDiv.appendChild(favoritesParagraph)

    // bookHeader.appendChild(bookTitle)
    // bookHeader.appendChild(bookAuthor)
    // bookCardArticle.appendChild(bookHeader)
    // bookCardArticle.appendChild(bookImage)
    // bookCardArticle.appendChild(bookDescription)
    // bookCardArticle.appendChild(favoritesDiv)