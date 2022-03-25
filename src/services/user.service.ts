import bcrypt from 'bcrypt';

import { IUser } from '../entity';
import { userRepository } from '../repositories';

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

    public async updateUserPassword(id: number, password: string): Promise<IUser | object> {
        const hashedPassword = await this._hashPassword(password);
        return userRepository.updateUserPassword(id, hashedPassword);
    }

    public async deleteUser(id: number): Promise<void | object> {
        return userRepository.deleteUser(id);
    }

    public async compareUserPasswords(password: string, hash: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('Email or password is wrong');
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
