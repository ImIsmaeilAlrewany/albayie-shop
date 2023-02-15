class User {
  static register = (req, res) => {
    res.render('ar/register.ar.hbs', { pageTitle: 'Albayie - register', path: 'ar/register' });
  };

  static registerLogic = (req, res) => {

  };
}

module.exports = User;