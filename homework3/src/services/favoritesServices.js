import request from '../utilities/request.js'

let baseUrl = 'http://localhost:9000';

export const getOneByGoogleBookId = (googleBookId) => request(`${baseUrl}/favorite-books?googleBookId=${googleBookId}`, 'GET')

export const getAll = () => request(`${baseUrl}/favorite-books`, 'GET')

export const add = book => request(`${baseUrl}/favorite-books`, 'POST', book)

export const deleteOne = bookId => request(`${baseUrl}/favorite-books/${bookId}`, 'DELETE')

