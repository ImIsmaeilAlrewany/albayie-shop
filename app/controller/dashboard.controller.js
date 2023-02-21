class Dashboard {
  static home = (req, res) => {
    res.render('en/dashboard-home', { pageTitle: 'Albayie - access dashboard' });
  };

}

module.exports = Dashboard;