import request from '../utilities/request.js'

let baseUrl = 'http://localhost:9000';

export const add = (comment: object) => request(`${baseUrl}/comments`, 'POST', comment)

export const getAllbyBookId = (bookId:number) => request(`${baseUrl}/comments?bookId=${bookId}`, 'GET')

export const deleteOne = (commentId: number) => request(`${baseUrl}/comments/${commentId}`, 'DELETE')

export const deleteAll = (bookId:number) => request(`${baseUrl}/comments?bookId=${bookId}`, 'DELETE')

export const edit = (commentId: number, comment: object) => request(`${baseUrl}/comments/${commentId}`, 'PATCH', comment)