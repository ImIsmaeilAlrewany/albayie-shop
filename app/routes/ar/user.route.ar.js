const router = require('express').Router();
const user = require('../../controller/ar/user.controller.ar');
const auth = require('../../middleware/auth.middleware');
const counter = require('../../middleware/counter.middleware');

router.get('/register', counter, user.register);
router.post('/register', user.registerLogic);
router.get('/login', counter, user.login);
router.post('/login', user.loginLogic);
router.get('/logout', auth, user.logout);
router.get('/account', auth, counter, (req, res) => {
  res.render('ar/account.ar.hbs');
});

module.exports = router;