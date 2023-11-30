const router = require('express').Router();
const { HomeController } = require('../../http/controllers/web/home/home.controller');
const { authRouter } = require('./auth.router');

router.use('/auth', authRouter)
router.get('/', HomeController.IndexPage)

module.exports = { webRouter: router }