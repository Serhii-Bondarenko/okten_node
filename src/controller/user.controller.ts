import { NextFunction, Request, Response } from 'express';

import { IUser } from '../entity';
import { tokenService, userService } from '../services';
import { COOKIE } from '../constants';

class UserController {
    public async getUsers(req: Request, res: Response): Promise<Response<IUser[]>> {
        const users = await userService.getUsers();
        return res.json(users);
    }

    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }

    public async updateUserPassword(req: Request, res: Response): Promise<Response<IUser>> {
        const { id } = req.params;

        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenService.deleteUserTokenPair(Number(id));

        const { password } = req.body;
        const updatedPassword = await userService.updateUserPassword(Number(id), password);
        return res.json(updatedPassword);
    }

    public async deleteUser(req: Request, res: Response): Promise<void | object> {
        const { id } = req.params;
        const removedUser = await userService.deleteUser(Number(id));
        return res.json(removedUser);
    }

    public async getUserPagination(req: Request, res: Response, next: NextFunction) {
        try {
            const { page = 1, perPage = 25, ...other } = req.query;

            const userPagination = await userService.getUserPagination(
                other,
                Number(page),
                Number(perPage),
            );

            res.json(userPagination);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
