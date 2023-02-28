const router = require('express').Router();
const dashboard = require('../controller/dashboard.controller');
const admin = require('../middleware/admin.middleware');

router.get('/dash-board', admin, dashboard.home);

module.exports = router;