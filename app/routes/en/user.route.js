const router = require('express').Router();
const user = require('../../controller/en/user.controller');
const auth = require('../../middleware/auth.middleware');
const count = require('../../middleware/counter.middleware');
const upload = require('../../middleware/upload.middleware');

router.get('/register', count, user.register);
router.post('/register', user.registerLogic);
router.get('/login', count, user.login);
router.post('/login', user.loginLogic);
router.get('/logout', auth, user.logout);
router.get('/users/profile/:id/general', auth, count, user.accountGeneralInfo);

// this will be in a file to catch all wrong routes and redirect to home/login instead of only 404 page
// router.get('/users/profile//general', count, user.login);

router.post('/users/profile/:id/general', auth, user.editData);
router.post('/users/profile/:id/general/upload', auth, upload.single('profilePic'), user.uploadImg);
router.post('/users/profile/:id/general/newPass', auth, user.changePassword);
router.post('/users/profile/:id/general/delete', auth, user.delete);

module.exports = router;