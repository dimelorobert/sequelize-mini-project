'use strict';

const routerx = require('express-promise-router');
const userRouter = require('./usersRoutes');
const router = routerx();


router.use('/users', userRouter);
module.exports = router;