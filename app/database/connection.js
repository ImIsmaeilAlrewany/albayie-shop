const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', true);

// This is the new way instead of callback
// make a promise or put the connect func into asyn
mongoose.connect(process.env.DB)
.then(() => {
  console.log('Database connected successfully')
})
.catch (err => {
  console.log(`Error connecting to database: ${err}`)
})