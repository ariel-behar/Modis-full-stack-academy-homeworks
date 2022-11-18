import displayGoogleSearchResults from './scripts/displayGoogleSearchResults.js';
import toggleSearchResultsSection from './scripts/toggleSearchResultsSection.js';
import displayFavorites from './scripts/displayFavorites.js';
let searchForm = document.querySelector('.search-form');
let shrinkSectionBtn = document.querySelector('.shrink-section-button');
let showFavoritesBtn = document.querySelector('#main-section .show-favorites-button');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchTerm = new FormData(e.currentTarget).get('searchTerm');
    let processedSearchTerm = searchTerm.split(' ').join('+');
    if (searchTerm.length > 0) {
        displayGoogleSearchResults(searchTerm, processedSearchTerm);
    }
    else {
        document.querySelector('.form-feedback-message').innerText = 'Book name needs to be at least 1 character long.';
        setTimeout(() => {
            document.querySelector('.form-feedback-message').innerText = '';
        }, 3000);
    }
});
showFavoritesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    displayFavorites();
});
shrinkSectionBtn.addEventListener('click', () => {
    toggleSearchResultsSection(false);
});
//# sourceMappingURL=main.js.map