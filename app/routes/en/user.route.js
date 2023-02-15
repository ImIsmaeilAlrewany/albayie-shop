const router = require('express').Router();
const user = require('../../controller/en/user.controller');

router.get('/register', user.register);

module.exports = router;