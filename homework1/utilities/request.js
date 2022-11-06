
let baseUrl = 'https://www.googleapis.com/books/v1/volumes?q='

export default function request(searchTerm){
    return fetch(`${baseUrl}${searchTerm}&maxResults=10`)
        
}