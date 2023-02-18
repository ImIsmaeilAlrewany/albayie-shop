const router = require('express').Router();
const user = require('../../controller/en/user.controller');
const auth = require('../../middleware/auth.middleware');

router.get('/register', user.register);
router.post('/register', user.registerLogic);
router.get('/login', user.login);
router.post('/login', user.loginLogic);
router.get('/logout', auth, user.logout);

module.exports = router;