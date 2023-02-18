class Home {
  static showHome = (req, res) => {
    const isLogin = req.cookies.Authorization ? true : false;
    res.render('ar/home.ar.hbs', { pageTitle: 'Albayie - Online Shopping', path: 'ar', isLogin: isLogin });
  };

  static homeInArabic = (req, res) => {
    const isLogin = req.cookies.Authorization ? true : false;
    res.render('ar/home.ar.hbs', { pageTitle: 'Albayie - Online Shopping', path: 'ar', isLogin: isLogin });
  };

  static homeInEnglish = (req, res) => {
    const isLogin = req.cookies.Authorization ? true : false;
    res.render('en/home', { pageTitle: 'Albayie - Online Shopping', path: 'en', isLogin: isLogin });
  };
}

module.exports = Home;