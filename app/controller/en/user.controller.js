class User {
  static register = (req, res) => {
    res.render('en/register', { pageTitle: 'Albayie - register', path: 'en/register' });
  };

  static registerLogic = (req, res) => {

  };
}

module.exports = User;