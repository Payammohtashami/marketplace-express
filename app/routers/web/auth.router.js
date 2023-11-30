const router = require('express').Router();

// login routes
const { LoginController } = require('http/controllers/web/auth/login.controller');
router.get('/login', LoginController.showLoginPage)

// register routes
const { RegisterController } = require('http/controllers/web/auth/register.controller');
router.get('/register', RegisterController.showRegisterPage)
router.post('/register', RegisterController.registerProccess)

module.exports = { authRouter: router }