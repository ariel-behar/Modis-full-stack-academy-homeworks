import * as favoritesServices from '../services/favoritesServices.js'

export function isFavoriteBook(googleBookId, currentTarget = undefined){
    return favoritesServices.getOneByGoogleBookId(googleBookId)
        .then(res => res.json())
        .then(data => {
            let bookObj = data.length == 0 ? null : data[0] ;
            let bookId = bookObj == null ? null : bookObj.id
            
            let htmlString = generateResponseString(bookObj, currentTarget); 

            return {htmlString, bookObj, bookId};
        })
        .catch(err => {
            console.log(err)
        })
}

export function generateResponseString(bookObj, currentTarget){
    let addString = `<span class="add-to-favorites"> ADD to Favorites </span> <span class="material-symbols-outlined add-to-favorites">star</span>`
    let removeString = `<span class="remove-from-favorites"> REMOVE from Favorites </span> <span class="material-symbols-outlined filled-star remove-from-favorites">star</span>`

    if(currentTarget) {
        if(bookObj) {
            currentTarget.innerHTML = removeString;
        } else {
            currentTarget.innerHTML = addString;
        }
    } else {
        if(bookObj) {
            return removeString;
        } else {
            return addString;
        }
    }
}
