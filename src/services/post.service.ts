import { IPost } from '../entity/post';
import { postRepository } from '../repositories/post/post.repository';

class PostService {
    public async createPost(post: IPost): Promise<IPost> {
        return postRepository.createPost(post);
    }

    public async getPostById(userId: number): Promise<IPost[]> {
        return postRepository.getPostById(userId);
    }

    public async updatePost(id: number, title: string, text: string): Promise<IPost | object> {
        return postRepository.updatePost(id, title, text);
    }
}

export const postService = new PostService();
