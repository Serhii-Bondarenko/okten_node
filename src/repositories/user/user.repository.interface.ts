import { IUser } from '../../entity';

export interface IUserRepository{
    getUsers(): Promise<IUser[]>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    createUser(user: IUser): Promise<IUser>;
    updateUserPassword(id: number, password: string): Promise<IUser | object>;
    deleteUser(id: number): Promise<void | object>;
}
