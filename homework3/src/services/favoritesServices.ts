import request from '../utilities/request.js'

let baseUrl = 'http://localhost:9000';

export const getOneByGoogleBookId = (googleBookId: number) => request(`${baseUrl}/favorite-books?googleBookId=${googleBookId}`, 'GET')

export const getAll = () => request(`${baseUrl}/favorite-books`, 'GET')

export const add = (book: object) => request(`${baseUrl}/favorite-books`, 'POST', book)

export const deleteOne = (bookId: number) => request(`${baseUrl}/favorite-books/${bookId}`, 'DELETE')

