const router = require('express').Router();
const user = require('../../controller/en/dashboard.user.controller');
const admin = require('../../middleware/admin.middleware');

router.get('/dash-board/login', user.login);
router.post('/dash-board/login', user.loginLogic);
router.get('/dash-board/logout', admin, user.logout);
router.get('/dash-board/create-user', admin, user.createUser);
router.post('/dash-board/create-user', admin, user.createUserLogic);

module.exports = router;