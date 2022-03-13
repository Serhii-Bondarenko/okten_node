import { IUser } from '../../entity/user';

export interface IUserRepository{
    getUsers(): Promise<IUser[]>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    createUser(user: IUser): Promise<IUser>;
    updateUser(id: number, email: string, password: string): Promise<IUser | object>;
    deleteUser(id: number): Promise<void | object>;
}
