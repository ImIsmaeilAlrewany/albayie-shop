const mongoose = require('mongoose');

module.exports = mongoose.model('count', {
  visitors: {
    type: Number,
    default: 0,
    require: true
  },
  pageViews: {
    type: Number,
    default: 0,
    require: true
  }
});