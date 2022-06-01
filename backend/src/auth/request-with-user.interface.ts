/* eslint-disable prettier/prettier */
import { Request } from 'express';
import { User } from 'src/user/user.schema';

export interface UserWithId extends User {
    _id: string
}

interface RequestWithUser extends Request {
    user: UserWithId
}

export default RequestWithUser;