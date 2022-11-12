import { generateResponseString } from "./isFavoriteBook.js";
import FavoriteBook from '../model/FavoriteBook.js'
import * as favoritesServices from '../services/favoritesServices.js'

export default async function addRemovetoFromFavorites(currentTarget){
    let googleBookId = currentTarget.parentElement.parentElement.getAttribute('data-google-book-id');
    let isFavorite = currentTarget.parentElement.parentElement.getAttribute('data-is-favorite') == 'yes' ? true : false;
    let favoriteBookId = currentTarget.parentElement.parentElement.getAttribute('data-book-id');

    if(isFavorite) {
        return favoritesServices.remove(favoriteBookId)
            .then(res => res.json())
            .then(data=> {
                generateResponseString(false, currentTarget)
                
                currentTarget.parentElement.parentElement.setAttribute('data-is-favorite', 'no');

                console.log('record has been removed')
            })
            .catch(err => console.log(err))
    } else {
        let bookTitle = currentTarget.parentElement.parentElement.children[0].children[0].textContent
        let bookAuthor = currentTarget.parentElement.parentElement.children[0].children[1].children[0].textContent
        let bookImage = currentTarget.parentElement.parentElement.children[1].getAttribute('src')
        let bookIbookDescription = currentTarget.parentElement.parentElement.children[2].textContent
        
        let favoriteBook = new FavoriteBook(googleBookId, bookTitle, bookAuthor, bookImage, bookIbookDescription)

        return favoritesServices.add(favoriteBook)
            .then(res => res.json())
            .then(data=> {
                generateResponseString(true, currentTarget)

                currentTarget.parentElement.parentElement.setAttribute('data-is-favorite', 'yes');
                currentTarget.parentElement.parentElement.setAttribute('data-book-id', data.id);
                
                console.log('record has been added')
            })
            .catch(err => console.log(err))
    }

}