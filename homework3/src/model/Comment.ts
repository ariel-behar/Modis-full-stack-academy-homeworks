import { CommentInterface } from "../interfaces/CommentInterface";

export class Comment implements CommentInterface {
    readonly id = (new Date()).getTime();
    public createdAt = (new Date()).toString();

    constructor(
        readonly bookId: number, 
        public title: string, 
        public content: string,
    ){}
}