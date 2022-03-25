import { Router } from 'express';

import { commentController } from '../controller';
import { commentMiddleware } from '../middlewares';

const router = Router();

router.post('/', commentMiddleware.checkCommentData, commentController.createComment);
router.post('/action', commentMiddleware.checkCommentData, commentController.actionOnComment);
router.get('/:userId', commentController.getCommentById);

export const commentRouter = router;
