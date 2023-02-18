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

  // static loginLogic = async (req, res) => {
  //   try {

  //     const token = await userData.generateToken();
  //     res.cookie('Authorization', token, {
  //       httpOnly: true,
  //       secure: true
  //     });
  //     res.redirect('/en');
  //   }
  //   catch (err) {
  //     res.render('en/login', { pageTitle: 'Albayie - login', path: 'en/login', data: req.body, error: err.message });
  //   }
  // };
}

module.exports = User;