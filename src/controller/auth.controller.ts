import { NextFunction, Request, Response } from 'express';

import {
    authService, emailService, tokenService, userService,
} from '../services';
import { COOKIE, EmailActionEnum, headers } from '../constants';
import { IRequestExtended, ITokenData } from '../interfaces';
import { IUser } from '../entity';
import { actionTokenRepository, tokenRepository } from '../repositories';
import { ActionTokenTypes } from '../enums/actionTokenTypes.enum';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);

        await emailService.sendMail(req.body.email, EmailActionEnum.WELCOME, {
            userName: req.body.email,
        });

        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );

        return res.json(data);
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {
                id, email, password: hashPassword, firstName,
            } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPasswords(password, hashPassword);
            await emailService.sendMail(email, EmailActionEnum.USER_ENTER, {
                userName: firstName,
            });

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

    async sendForgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, firstName } = req.user as IUser;

            const token = tokenService.generateActionToken({ userId: id, userEmail: email });

            await actionTokenRepository.createActionToken({
                actionToken: token,
                type: ActionTokenTypes.forgotPassword,
                userId: id,
            });

            await emailService.sendMail(email, EmailActionEnum.FORGOT_PASSWORD, {
                token,
                userName: firstName,
            });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    async setPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id } = req.user as IUser;
            const actionToken = req.get(headers.AUTHORIZATION);

            await userService.updateUserPassword(id, req.body.password);
            await actionTokenRepository.deleteByParams({ actionToken });

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
