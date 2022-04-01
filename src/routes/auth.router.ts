import { Router } from 'express';

import { authController } from '../controller';
import { authMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', userMiddleware.checkUserData, authController.registration);
router.post('/login', userMiddleware.checkUserData, userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

router.post('/forgotPassword', userMiddleware.checkValidEmail, userMiddleware.checkIsUserExist, authController.sendForgotPassword);
router.post('/forgotPassword/set', userMiddleware.checkValidPassword, authMiddleware.checkActionToken, authController.setPassword);

export const authRouter = router;
