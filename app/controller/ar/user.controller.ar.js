const bcryptjs = require('bcryptjs');
const userModel = require('../../database/models/user.model');
class User {
  static register = (req, res) => {
    res.render('ar/register.ar.hbs', { pageTitle: 'Albayie - register', path: 'ar/register' });
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

      await count.findByIdAndUpdate('6410899ea821615f4e4638e6', {
        $inc: { customers: 1 }
      });

      res.cookie('loggedIn', true);
      res.redirect('/');
    }
    catch (err) {
      res.render('ar/register.ar.hbs', { pageTitle: 'Albayie - register', path: 'ar/register', data: req.body, error: err.message });
    }
  };

  static login = (req, res) => {
    res.render('ar/login.ar.hbs', { pageTitle: 'Albayie - login', path: 'ar/login' });
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
      userData.save();

      res.redirect('/ar');
    }
    catch (err) {
      res.render('ar/login.ar.hbs', { pageTitle: 'Albayie - login', path: 'ar/login', data: req.body, error: err.message });
    }
  };

  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(f => f.token !== req.token);
      req.user.online = false;
      await req.user.save();
      res.clearCookie('Authorization');
      res.redirect('/ar');
    } catch (err) {
      res.send({ error: err.message });
    }
  };
}

module.exports = User;