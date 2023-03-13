const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const hbs = require('hbs');
const app = express();

require('./database/connection');

//custom handlebars helper to compare data
hbs.registerHelper('compare', (valOne, valTwo) => {
  if (valOne === valTwo) return true;
  else return false;
});

//custom handlebars helper to work as or
hbs.registerHelper('or', (value, ...others) => {
  others.length--;
  let output = false;
  others.forEach(ele => {
    if (value === ele) {
      output = true;
    }
  });
  return output;
});

//custom handlebars helper to return full name
hbs.registerHelper('fullName', (fName, lName) => {
  if (fName && lName) return `${fName} ${lName}`;
  else throw new Error('full name needs first name and last name');
});

//custom handlebars helper to fix time
hbs.registerHelper('time', (time) => {
  if (time) return time.toLocaleString();
  else throw new Error('there\'s no time');
});

//custom handlebars helper to get time left
hbs.registerHelper('timeLeft', (date) => {
  let output = 0;
  let timeLeft = 0;

  if (date) {
    for (const key in date) {
      timeLeft = date[key].endOn - Date.now();

      if (output < timeLeft) {
        output = timeLeft;
      } else {
        break;
      }
    }
    return Math.round(output / 3600000);
  } else {
    throw new Error('there\'s no date to compare it');
  }
});

//custom handlebars helper to get block days in all objects
hbs.registerHelper('getDays', (date) => {
  let days = 0;

  if (date) {
    for (const key in date) {
      if (days < date[key].days) {
        days = date[key].days;
      } else {
        break;
      }
    }
    return days;
  } else {
    throw new Error('there\'s no days to compare it');
  }
});


app.use(cors());
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
app.use('/en/dash-board', userDashboard);


app.all('*', (req, res) => {
  const lang = req.cookies.lang;
  res.render(lang === 'ar' ? 'ar/error404.ar.hbs' : 'en/error404', { pageTitle: 'Albayie - Page Not Found' });
});

module.exports = app;
