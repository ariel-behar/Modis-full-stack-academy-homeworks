import request from '../utilities/request.js';
let baseUrl = 'http://localhost:9000';
export const add = (comment) => request(`${baseUrl}/comments`, 'POST', comment);
export const getAllbyBookId = (bookId) => request(`${baseUrl}/comments?bookId=${bookId}`, 'GET');
export const deleteOne = (commentId) => request(`${baseUrl}/comments/${commentId}`, 'DELETE');
export const deleteAll = (bookId) => request(`${baseUrl}/comments?bookId=${bookId}`, 'DELETE');
export const edit = (commentId, comment) => request(`${baseUrl}/comments/${commentId}`, 'PATCH', comment);
//# sourceMappingURL=commentsServices.js.map