const bcryptjs = require('bcryptjs');
const userModel = require('../../database/models/user.model');
const count = require('../../database/models/count.model');
const path = require('path');
const fs = require('fs');

const checkScreen = (id, screen) => {
  if (screen === 'small-medium') {
    return `/ar/users/profile/${id}/general?screen=small-medium`;
  } else {
    return `/ar/users/profile/${id}/general`;
  }
};

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
    res.render('ar/register.ar.hbs', { pageTitle: 'Albayie - register', path: 'ar/register' });
  };

  static registerLogic = async (req, res) => {
    try {
      const userData = userModel(req.body);
      await userData.save();

      const token = await userData.generateToken();
      res.cookie('Authorization', token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      await count.findByIdAndUpdate('6410899ea821615f4e4638e6', {
        $inc: { customers: 1 }
      });

      const date = new Date();
      const counter = await count.findById('6410899ea821615f4e4638e6');
      await counter.findMonthAndUpdate(date.getMonth(), 'customers', 1);
      await counter.save();

      // res.cookie('loggedIn', true);
      res.redirect('/ar');
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
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
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

  static accountGeneralInfo = async (req, res) => {
    const smallScreen = req.query.screen === 'small-medium' ? true : false;
    const userData = await userModel.findById(req.params.id);
    const id = req.params.id;

    res.render('ar/account.ar.hbs', {
      pageTitle: 'Albayie - My Account', path: `ar/users/profile/general`, smallScreen, data: { isLogin: true, user: userData }, arLink: changeLang('ar', smallScreen, id), enLink: changeLang('en', smallScreen, id)
    });
  };

  static editData = async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(req.params.id, req.body);

      res.redirect(checkScreen(req.params.id, req.query.screen));
    } catch (err) {
      res.redirect(checkScreen(req.params.id, req.query.screen));
    }
  };

  static changePassword = async (req, res) => {
    try {
      const userData = await userModel.findOne({ _id: req.params.id });

      //check password if it's correct or not
      const password = await bcryptjs.compare(req.body.currentPassword, userData.password);

      if (!password) {
        res.cookie('wrongPass', true, {
          httpOnly: true,
          secure: true
        });
        throw new Error('wrong password');
      } else {
        res.clearCookie('wrongPass');
      }

      if (!req.body.newPassword) {
        res.cookie('emptyInput', true, {
          httpOnly: true,
          secure: true
        });
        throw new Error('no new password');
      } else {
        res.clearCookie('emptyInput');
      }

      userData.password = req.body.newPassword;
      await userData.save();

      res.redirect(checkScreen(req.params.id, req.query.screen));
    } catch (err) {
      // res.redirect(checkScreen(req.params.id, req.query.screen));
      const smallScreen = req.query.screen === 'small-medium' ? true : false;
      const userData = await userModel.findById(req.params.id);
      const id = req.params.id;
      let message = '';

      if (err.message === 'wrong password') {
        message = 'رقم السر الحالي خطأ حاول مجدداً';
      } else {
        message = 'حاول ادخال رقم سري جديد صحيح!';
      }

      res.render('ar/account.ar.hbs', {
        pageTitle: 'Albayie - My Account', path: `ar/users/profile/general`, smallScreen, data: { isLogin: true, user: userData }, arLink: changeLang('ar', smallScreen, id), enLink: changeLang('en', smallScreen, id), message
      });
    }
  };

  static delete = async (req, res) => {
    try {
      if (!req.body.delete) throw new Error('no value');

      await userModel.findOneAndDelete({ _id: req.params.id });
      await count.findByIdAndUpdate('6410899ea821615f4e4638e6', {
        $inc: { customers: -1 }
      });

      const date = new Date();
      const counter = await count.findById('6410899ea821615f4e4638e6');
      await counter.findMonthAndUpdate(date.getMonth(), 'customers', -1);
      await counter.save();

      res.redirect('/ar');
    } catch (err) {
      res.redirect(checkScreen(req.params.id, req.query.screen));
    }
  };

  static uploadImg = async (req, res) => {
    try {
      const dir = path.join(
        __dirname,
        '../../../public/static/images/uploaded/'
      );
      const userData = await userModel.findById(req.params.id);

      if (req.file && userData.profilePic) {
        if (fs.existsSync(dir + userData.profilePic)) {
          fs.unlinkSync(dir + userData.profilePic);
        }
      }

      if (req.file.mimetype !== 'image/jpeg') {
        fs.unlinkSync(dir + req.file.filename);
        throw new Error('image not jpg');
      }

      await userModel.findByIdAndUpdate(req.params.id, { profilePic: req.file.filename });

      res.redirect(checkScreen(req.params.id, req.query.screen));
    } catch (err) {
      res.redirect(checkScreen(req.params.id, req.query.screen));
    }
  };
}

module.exports = User;