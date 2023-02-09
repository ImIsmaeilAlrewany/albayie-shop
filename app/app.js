const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../public/views'));
hbs.registerPartials(path.join(__dirname, '../public/layouts'));
app.use(express.static(path.join(__dirname, '../public/static')));

app.get('/', (req, res) => {
  res.render('en/home', { pageTitle: 'Albayie - Online Shopping' });
});

app.all('*', (req, res) => res.render('en/error404', { pageTitle: 'Albayie - Page Not Found' }));

module.exports = app;
