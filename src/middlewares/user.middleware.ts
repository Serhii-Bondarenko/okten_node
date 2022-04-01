import { Response, NextFunction } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories';
import { IUser } from '../entity';
import { userSchema } from '../validator';
import { ErrorHandler } from '../error/error.handler';

class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction):
        Promise<IUser | undefined> {
        try {
            const userFromDb = userRepository.getUserByEmail(req.body.email);

            if (!userFromDb) {
                next(new ErrorHandler('User not found', 404));
                return;
            }

            req.user = await userFromDb;
            next();
        } catch (e) {
            next(e);
        }
    }

    async checkUserData(req: IRequestExtended, res: Response, next: NextFunction):
        Promise<IUser | undefined> {
        try {
            let issue = await userSchema.create.validate(req.body);

            if (Object.keys(req.body).length === 2) {
                issue = await userSchema.login.validate(req.body);
            }

            if (Object.keys(req.body).length === 1) {
                issue = await userSchema.updatePassword.validate(req.body);
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

    async checkEmailAsParams(req: IRequestExtended, res: Response, next: NextFunction):
        Promise<string | undefined> {
        try {
            const { error } = await userSchema.emailParams.validate(req.params);
            if (error) {
                next(new ErrorHandler(error.message, 400));
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }

    async checkValidEmail(req: IRequestExtended, res: Response, next: NextFunction):
        Promise<string | undefined> {
        try {
            const { error } = await userSchema.emailParams.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.message, 400));
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }

    async checkValidPassword(req: IRequestExtended, res: Response, next: NextFunction):
        Promise<string | undefined> {
        try {
            const { error } = await userSchema.updatePassword.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.message, 400));
                return;
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
