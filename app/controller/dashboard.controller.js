class Dashboard {
  static home = (req, res) => {
    res.render('en/dashboard-home', { pageTitle: 'Albayie - Access Dashboard' });
  };
  static login = (req, res) => {
    res.render('en/dashboard-login', { pageTitle: 'Albayie - Login Dashboard' });
  };
  static loginLogic = (req, res) => {

  };

}

module.exports = Dashboard;