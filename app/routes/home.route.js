const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const home = require('../controller/home.controller');
const count = require('../middleware/counter.middleware');

router.get('/', count, home.showHome);

router.get('/ar', count, home.homeInArabic);

router.get('/en', count, home.homeInEnglish);

router.post('/users/offline', auth, home.offline);

module.exports = router;