import bcrypt from 'bcrypt';

import { IUser } from '../entity/user';
import { userRepository } from '../repositories/user/user.repository';

class UserService {
    public async getUsers(): Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return userRepository.createUser(dataToSave);
    }

    public async updateUser(id: number, email: string, password: string): Promise<IUser | object> {
        return userRepository.updateUser(id, email, password);
    }

    public async deleteUser(id: number): Promise<void | object> {
        return userRepository.deleteUser(id);
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
