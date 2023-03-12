const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const home = require('../controller/home.controller');

router.get('/', home.showHome);

router.get('/ar', home.homeInArabic);

router.get('/en', home.homeInEnglish);

router.post('/users/offline', auth, home.offline);

module.exports = router;