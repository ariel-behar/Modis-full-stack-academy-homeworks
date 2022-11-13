import * as googleBooksServices from '../services/googleBooksServices.js'

import clearSearchResultsSection from './clearSearchResultsSection.js';
import displaySearchResults from './displaySearchResults.js';
import addRemovetoFromFavorites from './addRemovetoFromFavorites.js';

export default function displayGoogleSearchResults(searchTerm, processedSearchTerm) {
    return googleBooksServices.search(processedSearchTerm)
        .then(res => res.json())
        .then(data => {
            clearSearchResultsSection();

            displaySearchResults(data.items, searchTerm)
                .then(() => {
                    document.querySelectorAll('.add-remove-to-from-favorites-par').forEach(par => {
                        par.addEventListener('click', (e) => {
                            addRemovetoFromFavorites(e.currentTarget)
                        })
                    });
                })
        })
        .catch(err => console.log(err))
}