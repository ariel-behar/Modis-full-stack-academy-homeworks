export default class FavoriteBook {
    constructor(googleBookId, title, author, imageUrl, description) {
        this.googleBookId = googleBookId;
        this.title = title;
        this.author = author;
        this.imageUrl = imageUrl;
        this.description = description;
        this.id = (new Date()).getTime();
        this.comments = [];
    }
}
//# sourceMappingURL=FavoriteBook.js.map