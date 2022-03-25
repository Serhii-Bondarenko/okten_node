import { Response, NextFunction } from 'express';

import { IRequestExtended } from '../interfaces';
import { IComment } from '../entity';
import { ErrorHandler } from '../error/error.handler';
import { postSchema } from '../validator';

class PostMiddleware {
    async checkPostData(req: IRequestExtended, res: Response, next: NextFunction):
        Promise<IComment | undefined> {
        try {
            let issue = await postSchema.create.validate(req.body);

            if (Object.keys(req.body).length === 2) {
                issue = await postSchema.update.validate(req.body);
            }
            if (issue.error) {
                next(new ErrorHandler(issue.error.message, 422));
                return;
            }
            next();
        } catch (e: any) {
            next(e);
        }
    }
}

export const postMiddleware = new PostMiddleware();
