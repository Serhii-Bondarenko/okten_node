import { Router } from 'express';

import { authController } from '../controller/auth.controller';

const router = Router();

router.post('/registration', authController.registration);

export const authRouter = router;
