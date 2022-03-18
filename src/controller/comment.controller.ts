import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import { Comment, IComment } from '../entity';
import { commentService } from '../services';

class CommentController {
    public async createComment(req: Request, res: Response): Promise<Response<IComment>> {
        const createdComment = await commentService.createComment(req.body);
        return res.json(createdComment);
    }

    public async getCommentById(req: Request, res: Response): Promise<Response<IComment[]>> {
        const { userId } = req.params;
        const comments = await commentService.getCommentById(Number(userId));
        return res.json(comments);
    }

    public async actionOnComment(req: Request, res: Response):
        Promise<Response<IComment | undefined>> {
        const { action, commentId } = req.body;
        const queryRunner = getManager().getRepository(Comment);
        const comment = await commentService.actionOnComment(action, commentId);

        if (!comment) {
            console.log('wrong comment ID');
            return res.sendStatus(400);
        }

        if (action === 'like') {
            await queryRunner.update({ id: commentId }, { like: comment.like + 1 });
        }
        if (action === 'dislike') {
            await queryRunner.update({ id: commentId }, { dislike: comment.dislike + 1 });
        }

        return res.sendStatus(201);
    }
}

export const commentController = new CommentController();
