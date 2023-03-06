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

  static admins = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');
      let admins;

      if (req.query.searchAdmin != 'undefined' && req.query.searchAdmin != '') {
        admins = await userModel.find({
          $or: [
            { fName: { $regex: req.query.searchAdmin }, admin: true },
            { lName: { $regex: req.query.searchAdmin }, admin: true },
            { phoneNum: { $regex: req.query.searchAdmin }, admin: true },
            { email: { $regex: req.query.searchAdmin }, admin: true },
          ]
        });
      } else {
        admins = await userModel.find({ admin: true });
      }

      res.status(200).json({ admins });
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static adminsTable = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');

      res.render('en/dashboard-adminsTable', { pageTitle: 'Albayie - Dashboard Admins\' Table', user: req.user, path: '/en/dash-board/users/admin' });
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static customers = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');
      let customers;

      if (req.query.searchCustomer != 'undefined' && req.query.searchCustomer != '') {
        customers = await userModel.find({
          $or: [
            { fName: { $regex: req.query.searchCustomer }, admin: false },
            { lName: { $regex: req.query.searchCustomer }, admin: false },
            { phoneNum: { $regex: req.query.searchCustomer }, admin: false },
            { email: { $regex: req.query.searchCustomer }, admin: false },
          ]
        });
      } else {
        customers = await userModel.find({ admin: false });
      }

      res.status(200).json({ customers });
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static customersTable = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');

      res.render('en/dashboard-customersTable', { pageTitle: 'Albayie - Dashboard Customers\' Table', user: req.user, path: '/en/dash-board/users/customer' });
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

}


module.exports = userDashboard;