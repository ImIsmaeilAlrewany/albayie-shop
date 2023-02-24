const userModel = require('../database/models/user.model');
const bcryptjs = require('bcryptjs');

class Dashboard {
  static home = (req, res) => {
    res.render('en/dashboard-home', { pageTitle: 'Albayie - Access Dashboard' });
  };

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

}

module.exports = Dashboard;