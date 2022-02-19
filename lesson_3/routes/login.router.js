const {Router} = require('express');

const {loginController} = require("../controllers");
const {userMiddlewere} = require("../middleware");

const loginRouter = Router();

loginRouter.get('/', loginController.renderLoginForm);
loginRouter.post('/',userMiddlewere.emptyData, userMiddlewere.copy, loginController.createUser);


module.exports = loginRouter;