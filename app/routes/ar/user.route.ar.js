const router = require('express').Router();
const user = require('../../controller/ar/user.controller.ar');

router.get('/register', user.register);

module.exports = router;