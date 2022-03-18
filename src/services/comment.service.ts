import { IComment } from '../entity';
import { commentRepository } from '../repositories';

class CommentService {
    public async createComment(comment: IComment): Promise<IComment> {
        return commentRepository.createComment(comment);
    }

    public async getCommentById(id: number): Promise<IComment[]> {
        return commentRepository.getCommentById(id);
    }

    public async actionOnComment(action: string, id: number): Promise<IComment | undefined> {
        return commentRepository.actionOnComment(action, Number(id));
    }
}

export const commentService = new CommentService();
