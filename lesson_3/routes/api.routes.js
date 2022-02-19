const {Router} = require('express');

const router = Router();

const userRouter = require('./user.router');
const loginRouter = require('./login.router');
const signInRouter = require('./signIn.router');

router.use('/login', loginRouter);
router.use('/users', userRouter);
router.use('/signIn', signInRouter);

router.use((request, response) => {
    response.render('notFound');
});

module.exports = router;