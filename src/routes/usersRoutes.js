'use strict';

const {
    create,
    list,
    byId
} = require('../controllers/');
const routerx = require('express-promise-router');
const router = routerx();

router.post('/create', create);
router.get('/list', list);
router.get('/:id', byId);

module.exports = router;