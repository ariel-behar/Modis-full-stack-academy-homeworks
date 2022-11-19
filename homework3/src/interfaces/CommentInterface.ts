import { Identifiable, IdType } from "../types/shared-types.js";

export interface CommentInterface extends Identifiable{
    id: IdType;
    createdAt: string;
}