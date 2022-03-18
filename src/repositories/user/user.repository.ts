import { EntityRepository, getManager, Repository } from 'typeorm';

import { IUser, User } from '../../entity';
import { IUserRepository } from './user.repository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async getUsers(): Promise<IUser[]> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .leftJoin('Posts', 'posts', 'posts.userId = user.id')
            .getMany();
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async updateUser(id: number, email: string, password: string): Promise<IUser | object> {
        return getManager().getRepository(User)
            .update({ id }, {
                email,
                password,
            });
    }

    public async deleteUser(id: number): Promise<void | object> {
        return getManager()
            .getRepository(User)
            .softDelete({ id });
    }
}

export const userRepository = new UserRepository();
