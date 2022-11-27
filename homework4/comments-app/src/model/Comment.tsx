import { IdType } from "../shared/common-types";


export const enum CommentStatus {
    Public = 1, Suspended
}

export class Comment {
    constructor(
        readonly id: IdType,
        public title: string,
        public content: string,
        public commentStatus: CommentStatus.Public,
        readonly createdAt: Date,
        public modifiedAt?: Date
    ){}
}