export class Comment {
    constructor(bookId, title, content) {
        this.bookId = bookId;
        this.title = title;
        this.content = content;
        this.id = (new Date()).getTime();
        this.createdAt = (new Date()).toString();
    }
}
//# sourceMappingURL=Comment.js.map