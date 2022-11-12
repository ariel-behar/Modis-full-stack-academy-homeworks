import createBook from './createBook.js'
import clearSearchResultsSection from './clearSearchResultsSection.js'
import toggleSearchResultsSection from './toggleSearchResultsSection.js'

let searchResultsDiv = document.querySelector('#search-results-section .search-results')

export default async function displaySearchResults(books, searchTerm) {
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