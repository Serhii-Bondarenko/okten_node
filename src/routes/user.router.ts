import { Router } from 'express';

import { userController } from '../controller';
import { userMiddleware } from '../middlewares';

const router = Router();

router.get('/', userController.getUsers);
router.get('/:email', userMiddleware.checkEmailAsParams, userController.getUserByEmail);
router.patch('/:id', userMiddleware.checkUserData, userMiddleware.checkIsUserExist, userController.updateUserPassword);
router.delete('/:id', userController.deleteUser);

export const userRouter = router;
