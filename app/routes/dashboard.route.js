const router = require('express').Router();
const dashboard = require('../controller/dashboard.controller');
const admin = require('../middleware/admin.middleware');

router.get('/dash-board/login', dashboard.login);
router.post('/dash-board/login', dashboard.loginLogic);
router.get('/dash-board', admin, dashboard.home);
router.get('/dash-board/logout', admin, dashboard.logout);

module.exports = router;