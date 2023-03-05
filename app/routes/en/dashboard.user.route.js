const router = require('express').Router();
const user = require('../../controller/en/dashboard.user.controller');
const admin = require('../../middleware/admin.middleware');

router.get('/login', user.login);
router.post('/login', user.loginLogic);
router.get('/logout', admin, user.logout);
router.get('/create-user', admin, user.createUser);
router.post('/create-user', admin, user.createUserLogic);
router.get('/users/getAll', admin, user.all);
router.get('/users', admin, user.users);

module.exports = router;