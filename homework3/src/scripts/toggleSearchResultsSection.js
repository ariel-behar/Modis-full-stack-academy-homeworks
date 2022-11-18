import clearSearchResultsSection from './clearSearchResultsSection.js'

let mainSection = document.getElementById('main-section')
let searchResultsSection = document.getElementById('search-results-section')
let mainSectionHeading = document.querySelector('#main-section h1');
let shrinkSectionBtn = document.querySelector('.shrink-section-button')

export default function toggleSearchResultsSection(toggle) {
    if (toggle) {
        searchResultsSection.style.opacity = "1";

        mainSection.style.height = '30vh';
        document.getElementById('search-term').value = '';

        mainSectionHeading.style.display = 'none'
        shrinkSectionBtn.style.display = 'block'

        setTimeout(() => {
            shrinkSectionBtn.style.opacity = "1";
        }, 500);
    } else {
        searchResultsSection.style.opacity = "0";

        mainSection.style.height = '100vh';
        document.getElementById('search-term').value = '';

        mainSectionHeading.style.display = 'block'

        clearSearchResultsSection();

        shrinkSectionBtn.style.opacity = "0";

        setTimeout(() => {
            shrinkSectionBtn.style.display = 'none'
        }, 1000);
    }
}