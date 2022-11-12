import * as googleBooksServices from './services/googleBooksServices.js'
import * as favoritesServices from './services/favoritesServices.js'

import addRemovetoFromFavorites from './scripts/addRemovetoFromFavorites.js'
import displaySearchResults from './scripts/displaySearchResults.js'
import clearSearchResultsSection from './scripts/clearSearchResultsSection.js'
import toggleSearchResultsSection from './scripts/toggleSearchResultsSection.js'

let searchForm = document.querySelector('.search-form')
let shrinkSectionBtn = document.querySelector('.shrink-section-button')
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

shrinkSectionBtn.addEventListener('click', () => {
    toggleSearchResultsSection(false)
})

