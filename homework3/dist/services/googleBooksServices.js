import request from '../utilities/request.js';
let baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
export const search = searchTerm => request(`${baseUrl}${searchTerm}&maxResults=10`);
//# sourceMappingURL=googleBooksServices.js.map