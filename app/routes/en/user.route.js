const router = require('express').Router();
const user = require('../../controller/en/user.controller');
const auth = require('../../middleware/auth.middleware');
const count = require('../../middleware/counter.middleware');

router.get('/register', count, user.register);
router.post('/register', user.registerLogic);
router.get('/login', count, user.login);
router.post('/login', user.loginLogic);
router.get('/logout', auth, user.logout);
router.get('/account', auth, count, (req, res) => {
  res.render('en/account');
});

module.exports = router;