import { IdType } from '../shared/common-types'

export const enum UserRole {
    USER = 1, ADMIN
}

export const enum UserStatus {
    ACTIVE = 1, SUSPENDED, DEACTIVATED
}

class User {
    constructor(
        readonly id: IdType,
        public firstName: string,
        public lastName: string,
        public username: string,
        public password: string,
        public gender: string,
        public userRole: UserRole.USER,
        public userImg: string,
        public description: string,
        public userStatus: UserStatus.ACTIVE,
        readonly createdAt: Date,
        public modifiedAt?: Date
    ){}
}

export default User;