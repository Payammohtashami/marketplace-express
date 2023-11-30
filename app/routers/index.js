const router = require('express').Router();

// admin router
const { adminRouter } = require('./admin/routes');
router.use('/admin', adminRouter);

// web router
const { webRouter } = require('./web/router');
router.use('/web', webRouter);

module.exports = { router };