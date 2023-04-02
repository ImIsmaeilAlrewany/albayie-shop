const userModel = require('../database/models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const isLogin = async (token) => {
  try {
    if (!token) throw new Error('no token');
    const breakPass = jwt.verify(token, process.env.KEY);
    const userData = await userModel.findOne({ _id: breakPass._id, 'tokens.token': token });
    if (!userData) throw new Error('can\'t access token');
    else return { isLogin: true, user: userData };
  } catch (err) {
    console.log(err.message);
  }
};
const createCookie = (res, name, data) => {
  res.cookie(name, data, {
    httpOnly: true,
    secure: true
  });
};
class Home {
  static showHome = async (req, res) => {
    createCookie(res, 'lang', 'ar');
    res.render('ar/home.ar.hbs', { pageTitle: 'Albayie - Online Shopping', path: 'ar', data: await isLogin(req.cookies.Authorization), arLink: '/ar', enLink: '/en' });
  };

  static homeInArabic = async (req, res) => {
    createCookie(res, 'lang', 'ar');
    res.render('ar/home.ar.hbs', { pageTitle: 'Albayie - Online Shopping', path: 'ar', data: await isLogin(req.cookies.Authorization), arLink: '/ar', enLink: '/en' });
  };

  static homeInEnglish = async (req, res) => {
    createCookie(res, 'lang', 'en');
    res.render('en/home', { pageTitle: 'Albayie - Online Shopping', path: 'en', data: await isLogin(req.cookies.Authorization), arLink: '/ar', enLink: '/en' });
  };

  static offline = async (req, res) => {
    req.user.online = req.body.online;
    await req.user.save();
  };
}

module.exports = Home;