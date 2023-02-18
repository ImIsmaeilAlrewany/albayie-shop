const router = require('express').Router();
const user = require('../../controller/ar/user.controller.ar');

router.get('/register', user.register);
router.post('/register', user.registerLogic);
router.get('/login', user.login);
router.post('/login', user.loginLogic);

module.exports = router;