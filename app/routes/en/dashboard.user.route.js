const router = require('express').Router();
const user = require('../../controller/en/dashboard.user.controller');
const admin = require('../../middleware/admin.middleware');

router.get('/login', user.login);
router.post('/login', user.loginLogic);
router.get('/logout', admin, user.logout);

router.get('/users/create-user', admin, user.createUser);
router.post('/users/create-user', admin, user.createUserLogic);

router.get('/users/getAllAdmins', admin, user.admins);
router.get('/users/admin', admin, user.adminsTable);
router.get('/users/admin/profile/:id', admin, user.getProfile);

router.get('/users/getAllCustomers', admin, user.customers);
router.get('/users/customer', admin, user.customersTable);
router.get('/users/customer/profile/:id', admin, user.getProfile);

module.exports = router;