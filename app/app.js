const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

hbs.registerHelper('compare', function (valOne, valTwo) {
  if (valOne === valTwo) return true;
  else return false;
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../public/views'));
app.use(express.static(path.join(__dirname, '../public/static')));
hbs.registerPartials(path.join(__dirname, '../public/layouts'));

app.get('/', (req, res) => {
  res.render('ar/home.rtl.hbs', { pageTitle: 'Albayie - Online Shopping', path: 'ar' });
});

app.get('/ar', (req, res) => {
  res.render('ar/home.rtl.hbs', { pageTitle: 'Albayie - Online Shopping', path: 'ar' });
});

app.get('/en', (req, res) => {
  res.render('en/home', { pageTitle: 'Albayie - Online Shopping', path: 'en' });
});

app.all('*', (req, res) => res.render('en/error404', { pageTitle: 'Albayie - Page Not Found' }));

module.exports = app;
