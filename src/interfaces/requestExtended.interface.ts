import { Request } from 'express';

import { IPost, IUser } from '../entity';

export interface IRequestExtended extends Request{
    user?: IUser,
    post?:IPost,
}
