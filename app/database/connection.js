const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB, () => {
  console.log('MongoDB Connected Successfully');
});