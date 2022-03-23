import { Response, NextFunction } from 'express';
import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories';
import { IUser } from '../entity';
import { userSchema } from '../validator';

class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction):
        Promise<IUser | undefined> {
        try {
            const userFromDb = userRepository.getUserByEmail(req.body.email);

            if (!userFromDb) {
                res.status(400).json('User not found');
                return;
            }

            req.user = await userFromDb;
            next();
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async checkUserData(req: IRequestExtended, res: Response, next: NextFunction):
        Promise<IUser | undefined> {
        try {
            const { error } = await userSchema.validate(req.body);

            if (error) {
                res.status(422).json({
                    message: 'Invalid request',
                    data: error.message,
                });

                return;
            }

            next();
        } catch (e: any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}

export const userMiddleware = new UserMiddleware();
