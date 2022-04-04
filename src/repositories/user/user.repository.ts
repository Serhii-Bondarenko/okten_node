import dayjs from 'dayjs';
import uts from 'dayjs/plugin/utc';
import { EntityRepository, getManager, Repository } from 'typeorm';

import { IUser, User } from '../../entity';
import { IUserRepository } from './user.repository.interface';
import { IPaginationResponse } from '../../interfaces';

dayjs.extend(uts);

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

    public async updateUserPassword(id: number, password: string): Promise<IUser | object> {
        return getManager().getRepository(User)
            .update({ id }, {
                password,
            });
    }

    public async deleteUser(id: number): Promise<void | object> {
        return getManager()
            .getRepository(User)
            .softDelete({ id });
    }

    public getNewUsers(): Promise<IUser[]> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.createdAt >= :date', { date: dayjs().utc().startOf('day').format() })
            .getMany();
    }

    public async getUserPagination(
        limit: number,
        page: number = 1,
        searchObject: Partial<IUser> = {},
    )
        :Promise<IPaginationResponse<IUser>> {
        const skip = limit * (page - 1);

        console.log(searchObject);

        const [users, itemCount] = await getManager().getRepository(User)
            .findAndCount({ where: searchObject, skip, take: limit });

        return {
            page,
            perPage: limit,
            itemCount,
            data: users,
        };
    }
}

export const userRepository = new UserRepository();
