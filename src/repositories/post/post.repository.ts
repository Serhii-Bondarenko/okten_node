import { EntityRepository, getManager, Repository } from 'typeorm';

import { IPost, Post } from '../../entity/post';
import { IPostRepository } from './post.repository.interface';

@EntityRepository(Post)
class PostRepository extends Repository<Post> implements IPostRepository {
    public async createPost(post: IPost): Promise<IPost> {
        return getManager().getRepository(Post).save(post);
    }

    public async getPostById(userId: number): Promise<IPost[]> {
        return getManager().getRepository(Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id: userId })
            .leftJoin('User', 'user', 'user.id = post.userId')
            .getMany();
    }

    public async updatePost(id: number, title: string, text: string): Promise<IPost | object> {
        return getManager().getRepository(Post)
            .update({ id }, {
                title,
                text,
            });
    }
}

export const postRepository = new PostRepository();
