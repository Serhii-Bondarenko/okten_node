import { NextFunction, Request, Response } from 'express';

import {
    authService, emailService, tokenService, userService,
} from '../services';
import { COOKIE, emailActionEnum } from '../constants';
import { IRequestExtended, ITokenData } from '../interfaces';
import { IUser } from '../entity';
import { tokenRepository } from '../repositories';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);

        await emailService.sendMail(req.body.email, emailActionEnum.WELCOME);

        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );

        return res.json(data);
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPasswords(password, hashPassword);
            await emailService.sendMail(email, emailActionEnum.USER_ENTER);

            const { accessToken, refreshToken } = await tokenService.generateTokenPair(
                {
                    userId: id,
                    userEmail: email,
                },
            );

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.body,
            });
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        res.clearCookie(COOKIE.nameRefreshToken);

        await tokenService.deleteUserTokenPair(id);

        return res.json('OK');
    }

    public async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email } = req.user as IUser;
            const currentRefreshToken = req.get('Authorization');

            await tokenService.deleteTokenPairByParams({ refreshToken: currentRefreshToken });

            const { refreshToken, accessToken } = await tokenService.generateTokenPair(
                {
                    userId: id,
                    userEmail: email,
                },
            );

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
