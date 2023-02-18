const router = require('express').Router();
const user = require('../../controller/en/user.controller');

router.get('/register', user.register);
router.post('/register', user.registerLogic);
router.get('/login', user.login);
// router.post('/login', user.loginLogic);

module.exports = router;