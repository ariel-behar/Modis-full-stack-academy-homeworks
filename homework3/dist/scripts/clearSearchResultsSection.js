let searchResultsDiv = document.querySelector('#search-results-section .search-results');
export default function clearSearchResultsSection() {
    while (searchResultsDiv.firstChild) {
        searchResultsDiv.removeChild(searchResultsDiv.lastChild);
    }
}
//# sourceMappingURL=clearSearchResultsSection.js.map