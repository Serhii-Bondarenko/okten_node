import { Router } from 'express';

import { commentController } from '../controller';

const router = Router();

router.post('/', commentController.createComment);
router.post('/action', commentController.actionOnComment);
router.get('/:userId', commentController.getCommentById);

export const commentRouter = router;
