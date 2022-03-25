import { Response, NextFunction } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories';
import { ErrorHandler } from '../error/error.handler';
import { headers } from '../constants';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const authToken = req.get(headers.AUTHORIZATION);

            if (!authToken) {
                next(new ErrorHandler('No token', 404));
                return;
            }

            const { userEmail } = tokenService.verifyToken(authToken);
            const userFromToken = await userService.getUserByEmail(userEmail);
            req.user = userFromToken;

            next();
        } catch (e: any) {
            next(e);
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get(headers.AUTHORIZATION);

            if (!refreshToken) {
                next(new ErrorHandler('No token', 404));
                return;
            }

            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDb = await tokenRepository.findTokenByParams({ refreshToken });

            if (!tokenPairFromDb) {
                next(new ErrorHandler('Token not valid', 400));
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid', 400));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
