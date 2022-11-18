var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import generateComments from "./generateComments.js";
import { isFavoriteBook } from "./isFavoriteBook.js";
export default function createBook(book, googleBookId, isFavorite) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let isFavoriteResponse = yield isFavoriteBook(googleBookId);
        let favoriteBookId = (yield isFavoriteResponse.bookId) ? isFavoriteResponse.bookId : undefined;
        let addRemoveHTMLString = yield isFavoriteResponse.htmlString;
        let comments;
        if (isFavorite) {
            comments = book.comments[0];
        }
        let commentsResult = comments != undefined && comments.length > 0 ? generateComments(comments) : `<p>There are no comments for this book... Yet :)</p>`;
        let noCommentsClass = comments != undefined && comments.length > 0 ? '' : 'no-comments';
        let commentsSection = isFavorite
            ? ` <div class="book-comments-section"> 
            <header>
                <h5 class="book-comments-section-title">Comments</h5>
                <p class="hide-expand-comments"></span> <span class="material-symbols-outlined">expand_content</span></button>
            </header>
            <div class="book-comments ${noCommentsClass}">
                <button name="add-comment">Add Comment </span> <span class="material-symbols-outlined">add</span></button>
                ${commentsResult}
            </div>
        </div>`
            : "";
        let bookCard = document.createElement('article');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-google-book-id', googleBookId);
        bookCard.setAttribute('data-book-id', favoriteBookId);
        bookCard.setAttribute('data-is-favorite', favoriteBookId ? 'yes' : 'no');
        bookCard.innerHTML = `
            <div class="favorites-div">
                <h4 class="add-remove-to-from-favorites-par">${addRemoveHTMLString} </h4>
            </div>
            <header class="book-heading">
                <h4 class="book-title">${book.title}</h4>
                <h5 class="book-author">by <span>${book.authors ? `${book.authors.join(' & ')}` : 'author unknown'}</span></h5>
            </header>
            <div class="book-content">
                <img class="book-image" src="${((_a = book.imageLinks) === null || _a === void 0 ? void 0 : _a.thumbnail) ? book.imageLinks.thumbnail : book.imageUrl}">
                <p class="book-description">${book.description ? book.description : ''}</p>
            </div>
            ${commentsSection}`;
        return bookCard;
    });
}
//# sourceMappingURL=createBook.js.map