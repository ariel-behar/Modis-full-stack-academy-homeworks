export default class Comment {
    constructor(bookId, title, content) {
        this.id = (new Date()).getTime();
        this.bookId = bookId;
        this.title = title;
        this.content = content;
        this.createdAt = (new Date()).toString();
    }
}
//# sourceMappingURL=Comment.js.map