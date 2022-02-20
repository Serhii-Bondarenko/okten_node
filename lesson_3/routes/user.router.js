const {Router} = require('express');

userRouter = Router();

const {userController} = require('../controllers');
const {userMiddlewere} = require('../middleware');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:userId', userMiddlewere.notFound, userController.getUserById);
userRouter.post('/:id', userController.removeUserById);

module.exports = userRouter;