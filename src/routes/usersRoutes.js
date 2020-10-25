'use strict';

const { usersControllerCreate } = require('../controllers');
const routerx = require('express-promise-router');
const router = routerx();

router.post('/create', usersControllerCreate.create);

module.exports = router;