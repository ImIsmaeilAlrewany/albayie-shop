class Dashboard {
  static home = (req, res) => {
    res.cookie('lang', 'en', {
      httpOnly: true,
      secure: true
    });

    res.render('en/dashboard-home', { pageTitle: 'Albayie - Access Dashboard', user: req.user, path: '/en/dash-board' });
  };

}

module.exports = Dashboard;