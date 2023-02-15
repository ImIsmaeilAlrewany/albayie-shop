const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();

require('./database/connection');

//custom handlebars helper to compare data
hbs.registerHelper('compare', function (valOne, valTwo) {
  if (valOne === valTwo) return true;
  else return false;
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using view engine which is handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../public/views'));
app.use(express.static(path.join(__dirname, '../public/static')));
hbs.registerPartials(path.join(__dirname, '../public/layouts'));

//import all routes
const homeRoutes = require('./routes/home.route');

//use routes in the right path
app.use('/', homeRoutes);

app.all('*', (req, res) => res.render('en/error404', { pageTitle: 'Albayie - Page Not Found' }));

module.exports = app;
