const userModel = require('../../database/models/user.model');
const bcryptjs = require('bcryptjs');

class userDashboard {
  static login = (req, res) => {
    res.render('en/dashboard-login', { pageTitle: 'Albayie - Login Dashboard' });
  };

  static loginLogic = async (req, res) => {
    try {
      //get data using email or phone number
      const userData = await userModel.findOne({ email: req.body.authPortal }) || await userModel.findOne({ phoneNum: req.body.authPortal });
      if (!userData) throw new Error('invalid email or phone number');

      //check password if it's correct or not
      const password = await bcryptjs.compare(req.body.password, userData.password);
      if (!password) throw new Error('invalid password');

      const token = await userData.generateToken();
      res.cookie('Authorization', token, {
        httpOnly: true,
        secure: true
      });

      //check if this user is Admin
      const admin = userData.admin;
      if (!admin) throw new Error('user is\'t admin');

      res.redirect('/en/dash-board');
    }
    catch (err) {
      res.redirect('/en');
    }
  };

  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(f => f.token !== req.token);
      await req.user.save();
      res.clearCookie('Authorization');
      res.redirect('/en/dash-board/login');
    } catch (err) {
      res.send({ error: err.message });
    }
  };

  static createUser = (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');
      res.render('en/dashboard-createUser', { pageTitle: 'Albayie - Dashboard Create User' });
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static createUserLogic = async (req, res) => {
    try {
      const userData = userModel(req.body);
      await userData.save();
      res.redirect('/en/dash-board');
    }
    catch (err) {
      res.render('en/dashboard-createUser', { pageTitle: 'Albayie - Dashboard Create User', data: req.body, error: err.message });
    }
  };

  static all = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');

      let admins = await userModel.find({ admin: true });
      const allAdmins = admins.length;
      if (admins.length > 10) {
        admins = admins.slice(0, 10);
      }

      let customers = await userModel.find({ admin: false });
      const allCustomers = admins.length;
      if (customers.length > 10) {
        customers = customers.slice(0, 10);
      }

      const adminsTableInfo = {
        fAdminNum: 1,
        lAdminNum: 10,
        allAdmins: allAdmins,
        message: `Showing 1 to 10 of ${allAdmins} entries`
      };
      const customersTableInfo = {
        fCustomerNum: 1,
        lCustomerNum: 10,
        allCustomers: allCustomers,
        message: `Showing 1 to 10 of ${allCustomers} entries`
      };

      res.cookie('last_admin', 10);
      res.cookie('last_customer', 10);
      res.render('en/dashboard-usersTables', { pageTitle: 'Albayie - Dashboard Users\' Tables', user: req.user, path: '/en/dash-board/users', admins, adminsTableInfo, customers, customersTableInfo });
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

}


module.exports = userDashboard;