import { Router } from 'express';

import { userController } from '../controller/user.controller';

const router = Router();

router.get('/', userController.getUsers);
router.get('/:email', userController.getUserByEmail);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export const userRouter = router;
