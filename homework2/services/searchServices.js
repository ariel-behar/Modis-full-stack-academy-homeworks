import request from '../utilities/request.js'

let baseUrl = 'https://www.googleapis.com/books/v1/volumes?q='

export const searchBooks = searchTerm => {
    return request(`${baseUrl}${searchTerm}&maxResults=10`)
}