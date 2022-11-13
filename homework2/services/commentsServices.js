import request from '../utilities/request.js'

let baseUrl = 'http://localhost:9000';

export const add = comment => request(`${baseUrl}/comments`, 'POST', comment)