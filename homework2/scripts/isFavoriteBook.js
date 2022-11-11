import * as favoritesServices from '../services/favoritesServices.js'

export default function isFavoriteBook(googleBookId, currentTarget = undefined){
    return favoritesServices.getAll()
        .then(res => res.json())
        .then(data => {
            let result = data.find(entry => {
                return entry.googleBookId == googleBookId;
            })
            
            if(currentTarget) {
                if(result) {
                    console.log('innerHTML')
                    currentTarget.innerHTML = `REMOVE from Favorites <span class="material-symbols-outlined filled-star">star</span>`
                } else {
                    currentTarget.innerHTML = `ADD to Favorites <span class="material-symbols-outlined">star</span>`
                }
            } else {
                if(result) {
                    return `REMOVE from Favorites <span class="material-symbols-outlined filled-star">star</span>`
                } else {
                    return `ADD to Favorites <span class="material-symbols-outlined">star</span>`
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
}