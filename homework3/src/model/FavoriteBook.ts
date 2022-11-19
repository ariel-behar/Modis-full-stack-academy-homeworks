import { FavoriteBookInterface } from '../interfaces/FavoriteBookInterface.js';

export default class FavoriteBook implements FavoriteBookInterface {
    id = (new Date()).getTime()
    comments = [];

    constructor(
        public googleBookId: number, 
        public title: string, 
        public author: string, 
        public imageUrl: string, 
        public description: string
        ){}
}