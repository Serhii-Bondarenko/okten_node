import { IUser } from '../../entity';
import { IPaginationResponse } from '../../interfaces';

export interface IUserRepository{
    getUsers(): Promise<IUser[]>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    createUser(user: IUser): Promise<IUser>;
    updateUserPassword(id: number, password: string): Promise<IUser | object>;
    deleteUser(id: number): Promise<void | object>;
    getNewUsers(): Promise<IUser[]>;
    getUserPagination(
        limit: number,
        page: number,
        searchObject: Partial<IUser>
    ): Promise<IPaginationResponse<IUser>>;
}
