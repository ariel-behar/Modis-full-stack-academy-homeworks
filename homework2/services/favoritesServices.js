import request from '../utilities/request.js'

let baseUrl = 'http://localhost:9000';

export const search = searchTerm => {
    return request(`${baseUrl}/favorite-books?title=${searchTerm}`, 'GET')
}

export const getOneByGoogleBookId = (googleBookId) => {
    return request(`${baseUrl}/favorite-books?googleBookId=${googleBookId}`, 'GET')
}

export const getAll = () => {
    return request(`${baseUrl}/favorite-books`, 'GET')
}

export const add = book => {
    return request(`${baseUrl}/favorite-books`, 'POST', book)
}

export const remove = bookId => {
    return request(`${baseUrl}/favorite-books/${bookId}`, 'DELETE')
}

