import * as googleBooksServices from './services/googleBooksServices.js'
import * as favoriteServices from './services/favoritesServices.js'

import createBook from './scripts/createBook.js'
import addRemovetoFromFavorites from './scripts/addRemovetoFromFavorites.js'


let mainSection = document.getElementById('main-section')
let searchForm = document.querySelector('.search-form')
let searchResultsSection = document.getElementById('search-results-section')
let searchResultsDiv = document.querySelector('#search-results-section .search-results')
let shrinkSectionButton = document.querySelector('.shrink-section-button')
let mainSectionHeading = document.querySelector('#main-section h1');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let submitBtnName = e.submitter.name;
    let searchTerm = new FormData(e.currentTarget).get('searchTerm')
    let processedSearchTerm = searchTerm.split(' ').join('+')

    if (submitBtnName == 'google') {
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
    } else if (submitBtnName == 'favorites') {
        favoriteServices.search(processedSearchTerm)
            .then(res => res.json())
            .then(data => {
                console.log('data:', data)
                clearSearchResultsSection();

                // YOU HAVE TO CONTINUE FROM HERE AND modify the searchQuert in request

                displaySearchResults(data, searchTerm)
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

    for (const book of books) {
        searchResultsDiv.appendChild(await createBook(book.volumeInfo ? book.volumeInfo : book))
        toggleSearchResultsSection(true)
    }

    document.querySelector('#search-results-section .search-results-heading span').textContent = searchTerm;
}

shrinkSectionButton.addEventListener('click', () => {
    toggleSearchResultsSection(false)
})

