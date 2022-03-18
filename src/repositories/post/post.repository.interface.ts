import { IPost } from '../../entity';

export interface IPostRepository {
    createPost(post: IPost): Promise<IPost> ;
    getPostById(userId: number): Promise<IPost[]>
    updatePost(id: number, title: string, text: string): Promise<IPost | object>
}
