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
      res.cookie('loggedIn', true);
      res.redirect('/');
    }
    catch (err) {
      res.render('ar/register.ar', { pageTitle: 'Albayie - register', path: 'ar/register', data: req.body, error: err.message });
    }
  };
}

module.exports = User;