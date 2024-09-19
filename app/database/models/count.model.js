const mongoose = require('mongoose');

const countSchema = mongoose.Schema({
  currentMonth: {type: Number, default: 0},
  admins: {type: Number, default: 0},
  customers: {type: Number, default: 0},
  visitors: {type: Number, default: 0,},
  pageViews: {type: Number, default: 0,},
  months: {
    Jan: {
      admins: {type: Number, default: 0},
      customers: {type: Number, default: 0},
      visitors: {type: Number, default: 0},
      pageViews: {type: Number, default: 0}
    },
    Feb: {
      admins: {type: Number, default: 0},
      customers: {type: Number, default: 0},
      visitors: {type: Number, default: 0},
      pageViews: {type: Number, default: 0}
    },
    Mar: {
      admins: {type: Number, default: 0},
      customers: {type: Number, default: 0},
      visitors: {type: Number, default: 0},
      pageViews: {type: Number, default: 0}
    },
    Apr: {
      admins: {type: Number, default: 0},
      customers: {type: Number, default: 0},
      visitors: {type: Number, default: 0},
      pageViews: {type: Number, default: 0}
    },
    May: {
      admins: {type: Number, default: 0},
      customers: {type: Number, default: 0},
      visitors: {type: Number, default: 0},
      pageViews: {type: Number, default: 0}
    },
    Jun: {
      admins: {type: Number, default: 0},
      customers: {type: Number, default: 0},
      visitors: {type: Number, default: 0},
      pageViews: {type: Number, default: 0}
    },
    Jul: {
      admins: {type: Number, default: 0},
      customers: {type: Number, default: 0},
      visitors: {type: Number, default: 0},
      pageViews: {type: Number, default: 0}
    },
    Aug: {
      admins: {type: Number, default: 0},
      customers: {type: Number, default: 0},
      visitors: {type: Number, default: 0},
      pageViews: {type: Number, default: 0}
    },
    Sep: {
      admins: {type: Number, default: 0},
      customers: {type: Number, default: 0},
      visitors: {type: Number, default: 0},
      pageViews: {type: Number, default: 0}
    },
    Oct: {
      admins: {type: Number, default: 0},
      customers: {type: Number, default: 0},
      visitors: {type: Number, default: 0},
      pageViews: {type: Number, default: 0}
    },
    Nov: {
      admins: {type: Number, default: 0},
      customers: {type: Number, default: 0},
      visitors: {type: Number, default: 0},
      pageViews: {type: Number, default: 0}
    },
    Dec: {
      admins: {type: Number, default: 0},
      customers: {type: Number, default: 0},
      visitors: {type: Number, default: 0},
      pageViews: {type: Number, default: 0}
    }
  }
});

// countSchema.methods.findMonthAndUpdate = async function (month, key, value) {
//   const counter = this;
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//   if (counter.currentMonth === month) {
//     counter.months[months[month]][key] = counter.months[months[month]][key] + value;
//   } else {
//     counter.currentMonth = month;
//     const keys = ['admins', 'customers', 'visitors', 'pageViews'];
//     keys.forEach(key => counter.months[months[month]][key] = 0);
//     counter.months[months[month]][key] = counter.months[months[month]][key] + value;
//   }

//   await counter.save();
// };

countSchema.methods.findMonthAndUpdate = async function (month, key, value) {
  const counter = this;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (month < 0 || month > 11) {
    throw new Error('Invalid month. Month should be between 0 and 11.');
  }

  const monthName = months[month];

  if (counter.currentMonth !== month) {
    counter.currentMonth = month;
    Object.keys(counter.months[monthName]).forEach(k => {
      counter.months[monthName][k] = 0;
    });
  }

  if (!counter.months[monthName].hasOwnProperty(key)) {
    throw new Error(`Invalid key: ${key}. Allowed keys are: admins, customers, visitors, pageViews.`);
  }

  counter.months[monthName][key] += value;
  counter[key] += value;  // Update the total count as well

  await counter.save();
  return counter;
};

module.exports = mongoose.model('count', countSchema);

//and when create new user or delete one will ref here
//as well as will change in the count middleware
//also will check every month to know if this a new one or not and if it's will
// start counting in the new one starts from 0