import request from '../utilities/request.js'

let baseUrl = 'http://localhost:9000';

export const getAll = () => {
    return request(`${baseUrl}/favorite-books`, 'GET')
}

export const add = book => {
    return request(`${baseUrl}/favorite-books`, 'POST', book)
}