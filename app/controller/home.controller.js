class Home {
  static showHome = (req, res) => {
    res.render('ar/home.ar.hbs', { pageTitle: 'Albayie - Online Shopping', path: 'ar' });
  };

  static homeInArabic = (req, res) => {
    res.render('ar/home.ar.hbs', { pageTitle: 'Albayie - Online Shopping', path: 'ar' });
  };

  static homeInEnglish = (req, res) => {
    res.render('en/home', { pageTitle: 'Albayie - Online Shopping', path: 'en' });
  };
}

module.exports = Home;