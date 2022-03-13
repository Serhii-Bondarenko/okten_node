import { Router } from 'express';

import { postController } from '../controller/post.controller';

const router = Router();

router.post('/', postController.createPost);
router.get('/:userId', postController.getPostById);
router.patch('/:postId', postController.updatePost);

export const postRouter = router;
