var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import createBook from './createBook.js';
import clearSearchResultsSection from './clearSearchResultsSection.js';
import toggleSearchResultsSection from './toggleSearchResultsSection.js';
let searchResultsDiv = document.querySelector('#search-results-section .search-results');
export default function displaySearchResults(books, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        clearSearchResultsSection();
        document.querySelector('#search-results-section .search-results-term span').textContent = searchTerm;
        if (books) {
            if (searchTerm == 'Favorites') {
                for (const book of books) {
                    searchResultsDiv.appendChild(yield createBook(book, book.googleBookId, true));
                }
            }
            else {
                for (const book of books) {
                    searchResultsDiv.appendChild(yield createBook(book.volumeInfo ? book.volumeInfo : book, book.id));
                }
            }
            toggleSearchResultsSection(true);
        }
        else {
            searchResultsDiv.innerHTML = `<h3>You have not added any favorites books... Yet :)</h3>`;
            toggleSearchResultsSection(true);
        }
    });
}
//# sourceMappingURL=displaySearchResults.js.map