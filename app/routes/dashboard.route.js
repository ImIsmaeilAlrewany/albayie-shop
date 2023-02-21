const router = require('express').Router();
const dashboard = require('../controller/dashboard.controller');

router.get('/dash-board', dashboard.home);

module.exports = router;