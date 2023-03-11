const userModel = require('../database/models/user.model');

const isLogin = (data) => data ? true : false;
const createCookie = (res, name, data) => {
  res.cookie(name, data, {
    httpOnly: true,
    secure: true
  });
};
class Home {
  static showHome = (req, res) => {
    createCookie(res, 'lang', 'ar');
    res.render('ar/home.ar.hbs', { pageTitle: 'Albayie - Online Shopping', path: 'ar', isLogin: isLogin(req.cookies.Authorization) });
  };

  static homeInArabic = (req, res) => {
    createCookie(res, 'lang', 'ar');
    res.render('ar/home.ar.hbs', { pageTitle: 'Albayie - Online Shopping', path: 'ar', isLogin: isLogin(req.cookies.Authorization) });
  };

  static homeInEnglish = (req, res) => {
    createCookie(res, 'lang', 'en');
    res.render('en/home', { pageTitle: 'Albayie - Online Shopping', path: 'en', isLogin: isLogin(req.cookies.Authorization) });
  };

}

module.exports = Home;