import { Router } from 'express';

import { userRouter } from './user.router';
import { postRouter } from './post.router';
import { commentRouter } from './comment.router';
import { authRouter } from './auth.router';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/auth', authRouter);
// @ts-ignore
router.use('*', (err, req, res, next) => {
    console.log(err);
    res
        .status(err.code || 500)
        .json({
            message: err.message,
        });
});

export const apiRouter = router;
