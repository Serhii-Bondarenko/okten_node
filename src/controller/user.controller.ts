import { Request, Response } from 'express';

import { IUser } from '../entity/user';
import { userService } from '../services/user.service';

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

    public async updateUser(req: Request, res: Response): Promise<Response<IUser>> {
        const { id } = req.params;
        const { email, password } = req.body;
        const updatedUser = await userService.updateUser(Number(id), email, password);
        return res.json(updatedUser);
    }

    public async deleteUser(req: Request, res: Response): Promise<void | object> {
        const { id } = req.params;
        const removedUser = await userService.deleteUser(Number(id));
        return res.json(removedUser);
    }
}

export const userController = new UserController();
