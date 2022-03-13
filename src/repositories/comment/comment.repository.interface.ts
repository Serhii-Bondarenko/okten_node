import { IComment } from '../../entity/comment';

export interface ICommentRepository {
    createComment(comment: IComment): Promise<IComment>;
    getCommentById(id: number): Promise<IComment[]>;
    actionOnComment(action: string, id: number): Promise<IComment | undefined>;
}
