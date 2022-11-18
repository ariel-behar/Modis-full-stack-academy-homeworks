var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as favoritesServices from '../services/favoritesServices.js';
import * as commentServices from '../services/commentsServices.js';
import { generateResponseString } from "./isFavoriteBook.js";
import FavoriteBook from '../model/FavoriteBook.js';
import displayFavorites from './displayFavorites.js';
export default function addRemovetoFromFavorites(currentTarget, favoritesView) {
    return __awaiter(this, void 0, void 0, function* () {
        let googleBookId = currentTarget.parentElement.parentElement.getAttribute('data-google-book-id');
        let isFavorite = currentTarget.parentElement.parentElement.getAttribute('data-is-favorite') == 'yes' ? true : false;
        let favoriteBookId = currentTarget.parentElement.parentElement.getAttribute('data-book-id');
        let deletionPromisesArr = [];
        if (favoritesView) {
            let commentsResponse = yield commentServices.getAllbyBookId(favoriteBookId);
            let comments = yield commentsResponse.json();
            for (const comment of comments) {
                deletionPromisesArr.push(commentServices.deleteOne(comment.id));
            }
        }
        if (isFavorite) {
            return Promise.all([favoritesServices.deleteOne(favoriteBookId)].concat(deletionPromisesArr))
                .then(data => {
                if (favoritesView) {
                    displayFavorites();
                }
                else {
                    generateResponseString(false, currentTarget);
                    currentTarget.parentElement.parentElement.setAttribute('data-is-favorite', 'no');
                }
            })
                .catch(err => console.log(err));
        }
        else {
            let bookTitle = currentTarget.parentElement.parentElement.children[1].children[0].textContent;
            let bookAuthor = currentTarget.parentElement.parentElement.children[1].children[1].children[0].textContent;
            let bookImage = currentTarget.parentElement.parentElement.children[2].children[0].getAttribute('src');
            let bookIbookDescription = currentTarget.parentElement.parentElement.children[2].children[1].textContent;
            let favoriteBook = new FavoriteBook(googleBookId, bookTitle, bookAuthor, bookImage, bookIbookDescription);
            return favoritesServices.add(favoriteBook)
                .then(res => res.json())
                .then(data => {
                generateResponseString(true, currentTarget);
                currentTarget.parentElement.parentElement.setAttribute('data-is-favorite', 'yes');
                currentTarget.parentElement.parentElement.setAttribute('data-book-id', data.id);
            })
                .catch(err => console.log(err));
        }
    });
}
//# sourceMappingURL=addRemovetoFromFavorites.js.map