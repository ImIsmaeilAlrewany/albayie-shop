const jwt = require('jsonwebtoken');
const userModel = require('../database/models/user.model');

require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.Authorization;
    if (!token) throw new Error('token not found');
    const breakPass = jwt.verify(token, process.env.KEY);
    const userData = await userModel.findOne({ _id: breakPass._id, 'tokens.token': token });
    if (!userData) throw new Error('can\'t access token');
    req.user = userData;
    req.token = token;
    next();
  } catch (err) {
    res.clearCookie('Authorization');
    res.redirect('ar/login');
  }
};

module.exports = auth;