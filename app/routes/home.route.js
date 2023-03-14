const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const home = require('../controller/home.controller');
const counter = require('../middleware/counter.middleware');

router.get('/', counter, home.showHome);

router.get('/ar', counter, home.homeInArabic);

router.get('/en', counter, home.homeInEnglish);

router.post('/users/offline', auth, home.offline);

module.exports = router;