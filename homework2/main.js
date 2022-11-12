import * as googleBooksServices from './services/googleBooksServices.js'
import * as favoritesServices from './services/favoritesServices.js'

import createBook from './scripts/createBook.js'
import addRemovetoFromFavorites from './scripts/addRemovetoFromFavorites.js'

let mainSection = document.getElementById('main-section')
let searchForm = document.querySelector('.search-form')
let searchResultsSection = document.getElementById('search-results-section')
let searchResultsDiv = document.querySelector('#search-results-section .search-results')
let shrinkSectionButton = document.querySelector('.shrink-section-button')
let mainSectionHeading = document.querySelector('#main-section h1');
let showFavoritesBtn = document.querySelector('#main-section .show-favorites-button')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let searchTerm = new FormData(e.currentTarget).get('searchTerm')
    let processedSearchTerm = searchTerm.split(' ').join('+')

    if (searchTerm.length > 0) {
        googleBooksServices.search(processedSearchTerm)
            .then(res => res.json())
            .then(data => {
                clearSearchResultsSection();

                displaySearchResults(data.items, searchTerm)
                    .then(() => {
                        document.querySelectorAll('.add-remove-to-from-favorites-par').forEach(paragraph => {
                            paragraph.addEventListener('click', (e) => {
                                addRemovetoFromFavorites(e.currentTarget)
                            })
                        });
                    })
            })
            .catch(err => console.log(err))
    }
})

showFavoritesBtn.addEventListener('click', (e) => {
    e.preventDefault();

    favoritesServices.getAll()
        .then(res => res.json())
        .then(data => {
            clearSearchResultsSection()

            if(data.length > 0) {
                displaySearchResults(data, 'Favorites')
                    .then(() => {
                        document.querySelectorAll('.add-remove-to-from-favorites-par').forEach(paragraph => {
                            paragraph.addEventListener('click', (e) => {
                                addRemovetoFromFavorites(e.currentTarget)
                            })
                        });
                    })
            } else {
                displaySearchResults(false, 'Favorites')
            }
        })
        .catch(err => console.log(err))

})

function clearSearchResultsSection() {
    while (searchResultsDiv.firstChild) {
        searchResultsDiv.removeChild(searchResultsDiv.lastChild)
    }
}

function toggleSearchResultsSection(toggle) {
    if (toggle) {
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

async function displaySearchResults(books, searchTerm) {
    clearSearchResultsSection()

    document.querySelector('#search-results-section .search-results-heading span').textContent = searchTerm;

    if(books) {
        if(searchTerm == 'Favorites') {
            for (const book of books) {
                searchResultsDiv.appendChild(await createBook(book, book.googleBookId, true))
            }
        } else {
            for (const book of books) {
                searchResultsDiv.appendChild(await createBook(book.volumeInfo ? book.volumeInfo : book, book.id))
            }
        }
        toggleSearchResultsSection(true)
        
    } else {
        searchResultsDiv.innerHTML = `<h3>You have not added any favorites books... Yet :)</h3>`
        toggleSearchResultsSection(true)
    }

    

}

shrinkSectionButton.addEventListener('click', () => {
    toggleSearchResultsSection(false)
})

