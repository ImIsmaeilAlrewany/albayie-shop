const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const hbs = require('hbs');
const app = express();

require('./database/connection');

//custom handlebars helper to compare data
hbs.registerHelper('compare', function (valOne, valTwo) {
  if (valOne === valTwo) return true;
  else return false;
});

hbs.registerHelper('fullName', (fName, lName) => {
  if (fName && lName) return `${fName} ${lName}`;
  else throw new Error('full name needs first name and last name');
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using view engine which is handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../public/views'));
app.use(express.static(path.join(__dirname, '../public/static')));
hbs.registerPartials(path.join(__dirname, '../public/layouts'));

//import all routes
const homeRoutes = require('./routes/home.route');
const userRoutes = require('./routes/en/user.route');
const userRoutesAr = require('./routes/ar/user.route.ar');

//use routes in the right path
app.use('/', homeRoutes);
app.use('/en', userRoutes);
app.use('/ar', userRoutesAr);

//import dashboard routes
const dashboard = require('./routes/dashboard.route');
const userDashboard = require('./routes/en/dashboard.user.route');

//use dashboard routes
app.use('/en', dashboard);
app.use('/en', userDashboard);


app.all('*', (req, res) => {
  const lang = req.cookies.lang;
  res.render(lang === 'ar' ? 'ar/error404.ar.hbs' : 'en/error404', { pageTitle: 'Albayie - Page Not Found' });
});

module.exports = app;
