const router = require('express').Router();
const home = require('../controller/home.controller');

router.get('/', home.showHome);

router.get('/ar', home.homeInArabic);

router.get('/en', home.homeInEnglish);

module.exports = router;