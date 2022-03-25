import { Router } from 'express';

import { postController } from '../controller';
import { postMiddleware } from '../middlewares';

const router = Router();

router.post('/', postMiddleware.checkPostData, postController.createPost);
router.get('/:userId', postController.getPostById);
router.patch('/:postId', postMiddleware.checkPostData, postController.updatePost);

export const postRouter = router;
