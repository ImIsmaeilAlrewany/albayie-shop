const bcryptjs = require('bcryptjs');
const userModel = require('../../database/models/user.model');
class User {
  static register = (req, res) => {
    res.render('en/register', { pageTitle: 'Albayie - register', path: 'en/register' });
  };

  static registerLogic = async (req, res) => {
    try {
      const userData = userModel(req.body);
      await userData.save();
      const token = await userData.generateToken();
      res.cookie('Authorization', token, {
        httpOnly: true,
        secure: true
      });
      res.redirect('/en');
    }
    catch (err) {
      res.render('en/register', { pageTitle: 'Albayie - register', path: 'en/register', data: req.body, error: err.message });
    }
  };

  static login = (req, res) => {
    res.render('en/login', { pageTitle: 'Albayie - login', path: 'en/login' });
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

      userData.online = true;
      await userData.save();

      res.redirect('/en');
    }
    catch (err) {
      res.render('en/login', { pageTitle: 'Albayie - login', path: 'en/login', data: req.body, error: err.message });
    }
  };

  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(f => f.token !== req.token);
      req.user.online = false;
      await req.user.save();

      res.clearCookie('Authorization');
      res.redirect('/en');
    } catch (err) {
      res.send({ error: err.message });
    }
  };
}

module.exports = User;