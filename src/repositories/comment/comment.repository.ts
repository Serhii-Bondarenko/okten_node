import { EntityRepository, getManager, Repository } from 'typeorm';

import { Comment, IComment } from '../../entity';
import { ICommentRepository } from './comment.repository.interface';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> implements ICommentRepository {
    public async createComment(comment: IComment): Promise<IComment> {
        return getManager().getRepository(Comment).save(comment);
    }

    public async getCommentById(id: number): Promise<IComment[]> {
        return getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
    }

    public async actionOnComment(action: string, id: number): Promise<IComment | undefined> {
        return getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .where('comment.id = :id', { id })
            .getOne();
    }
}

export const commentRepository = new CommentRepository();
