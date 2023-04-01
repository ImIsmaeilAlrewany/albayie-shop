const bcryptjs = require('bcryptjs');
const userModel = require('../../database/models/user.model');
const count = require('../../database/models/count.model');

const changeLang = (lang, screen, id) => {
  let output;
  if (lang === 'ar') {
    output = screen ?
      `/ar/users/profile/${id}/general?screen=small-medium` :
      `/ar/users/profile/${id}/general`;
  } else if (lang === 'en') {
    output = screen ?
      `/en/users/profile/${id}/general?screen=small-medium` :
      `/en/users/profile/${id}/general`;
  }
  return output;
};
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

      await count.findByIdAndUpdate('6410899ea821615f4e4638e6', {
        $inc: { customers: 1 }
      });

      const date = new Date();
      const counter = await count.findById('6410899ea821615f4e4638e6');
      await counter.findMonthAndUpdate(date.getMonth(), 'customers', 1);
      await counter.save();

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

  static accountGeneralInfo = async (req, res) => {
    const smallScreen = req.query.screen === 'small-medium' ? true : false;
    const userData = await userModel.findById(req.params.id);
    const id = req.params.id;

    res.render('en/account', {
      pageTitle: 'Albayie - My Account', path: `en/users/profile/general`, smallScreen, data: { isLogin: true, user: userData }, arLink: changeLang('ar', smallScreen, id), enLink: changeLang('en', smallScreen, id)
    });
  };
}

module.exports = User;