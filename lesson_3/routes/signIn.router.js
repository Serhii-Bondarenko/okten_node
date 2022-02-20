const {Router} = require('express');

const {signInController} = require('../controllers');
const {userMiddlewere} = require('../middleware');

const signInRouter = Router();

signInRouter.get('/', signInController.renderSignInForm);
signInRouter.post('/', userMiddlewere.auth, signInController.signIn);

module.exports = signInRouter;