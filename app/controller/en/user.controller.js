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
      res.cookie('loggedIn', true);
      res.redirect('/en');
    }
    catch (err) {
      res.render('en/register', { pageTitle: 'Albayie - register', path: 'en/register', data: req.body, error: err.message });
    }
  };
}

module.exports = User;