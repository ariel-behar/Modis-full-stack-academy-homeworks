import request from '/utilities/request.js'

let mainSection = document.getElementById('main-section')
let searchForm = document.querySelector('.search-form')
let searchResultsSection = document.getElementById('search-results-section')

searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    let searchTerm = new FormData(e.currentTarget).get('searchTerm')
    if(searchTerm.length > 0) {
        let processedSearchTerm = searchTerm.split(' ').join('+')
    
        request(processedSearchTerm)
            .then(res => res.json())
            .then(data => displaySearchResults(data))
            .catch(err => console.log(err))
    }
})

function displaySearchResults(results) {
    while(searchResultsSection.firstChild){
        searchResultsSection.removeChild(searchResultsSection.lastChild)
    }
    
    for (const book of results.items) {
        createBook(book)
        
        searchResultsSection.style.opacity = "1";

        mainSection.style.height = '30vh';
        document.getElementById('search-term').value = '';

        document.querySelector('#main-section h1').style.display = 'none'
    }

}


function createBook(book) {
    let bookCardArticle = document.createElement('article');
    bookCardArticle.classList.add('book-card')

    let bookHeader = document.createElement('header')
    bookHeader.classList.add('book-heading')

    let bookTitle = document.createElement('h3')
    bookTitle.classList.add('book-title')
    bookTitle.textContent = book.volumeInfo.title

    let bookAuthor = document.createElement('h4')
    bookAuthor.classList.add('book-author')
    bookAuthor.textContent = book.volumeInfo.authors ? `by ${book.volumeInfo.authors.join(' & ')}` : 'author uknown'

    let bookImage = document.createElement('img')
    bookImage.classList.add('book-image')
    bookImage.src = book.volumeInfo.imageLinks.thumbnail

    let bookDescription = document.createElement('p')
    bookDescription.classList.add('book-description')
    if(book.volumeInfo.description) {
        if(book.volumeInfo.description.length >= 300) {
            let truncatedDescription = book.volumeInfo.description.slice(0,300)

            truncatedDescription = truncatedDescription.split(' ')
            truncatedDescription.push('...')
            console.log(truncatedDescription.join(' '))
            bookDescription.textContent = truncatedDescription.join(' ')
            console.log('places')
        } else {
            bookDescription.textContent = book.volumeInfo.description
            console.log('notep');
        }
    }

    let favoritesDiv = document.createElement('div')
    favoritesDiv.classList.add('favorites-div')

    let favoritesParagraph = document.createElement('p')
    favoritesParagraph.textContent = 'Add to favorites'

    let starSpan = document.createElement('span')
    starSpan.textContent = 'star'
    starSpan.classList.add('material-symbols-outlined')

    favoritesParagraph.appendChild(starSpan)
    favoritesDiv.appendChild(favoritesParagraph)

    bookHeader.appendChild(bookTitle)
    bookHeader.appendChild(bookAuthor)
    bookCardArticle.appendChild(bookHeader)
    bookCardArticle.appendChild(bookImage)
    bookCardArticle.appendChild(bookDescription)
    bookCardArticle.appendChild(favoritesDiv)

    searchResultsSection.appendChild(bookCardArticle)
}

