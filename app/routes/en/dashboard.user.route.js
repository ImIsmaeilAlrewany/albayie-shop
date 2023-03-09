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
router.post('/users/admin/profile/:id/delete', admin, user.deleteAdmin);

router.get('/users/getAllCustomers', admin, user.customers);
router.get('/users/customer', admin, user.customersTable);
router.get('/users/customer/profile/:id', admin, user.getProfile);
router.post('/users/customer/profile/:id/delete', admin, user.deleteCustomer);


module.exports = router;