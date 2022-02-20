const {Router} = require('express');

const userRouter = require('./user.router');
const loginRouter = require('./login.router');
const signInRouter = require('./signIn.router');

const router = Router();

router.use('/login', loginRouter);
router.use('/users', userRouter);
router.use('/signIn', signInRouter);

router.use(({query: {error}}, response) => {
    response.render('error', {error});
});

router.use((request, response) => {
    response.render('notFound');
});

module.exports = router;