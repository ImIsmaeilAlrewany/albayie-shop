const mongoose = require('mongoose');

module.exports = mongoose.model('count', {
  admins: {
    type: Number,
    default: 0
  },
  customers: {
    type: Number,
    default: 0
  },
  visitors: {
    type: Number,
    default: 0,
  },
  pageViews: {
    type: Number,
    default: 0,
  },
  months: {
    Jan: {
      admins: {
        type: Number,
        default: 0
      },
      customers: {
        type: Number,
        default: 0
      },
      visitors: {
        type: Number,
        default: 0
      },
      pageViews: {
        type: Number,
        default: 0
      }
    },
    Feb: {
      admins: {
        type: Number,
        default: 0
      },
      customers: {
        type: Number,
        default: 0
      },
      visitors: {
        type: Number,
        default: 0
      },
      pageViews: {
        type: Number,
        default: 0
      }
    },
    Mar: {
      admins: {
        type: Number,
        default: 0
      },
      customers: {
        type: Number,
        default: 0
      },
      visitors: {
        type: Number,
        default: 0
      },
      pageViews: {
        type: Number,
        default: 0
      }
    },
    Apr: {
      admins: {
        type: Number,
        default: 0
      },
      customers: {
        type: Number,
        default: 0
      },
      visitors: {
        type: Number,
        default: 0
      },
      pageViews: {
        type: Number,
        default: 0
      }
    },
    May: {
      admins: {
        type: Number,
        default: 0
      },
      customers: {
        type: Number,
        default: 0
      },
      visitors: {
        type: Number,
        default: 0
      },
      pageViews: {
        type: Number,
        default: 0
      }
    },
    Jun: {
      admins: {
        type: Number,
        default: 0
      },
      customers: {
        type: Number,
        default: 0
      },
      visitors: {
        type: Number,
        default: 0
      },
      pageViews: {
        type: Number,
        default: 0
      }
    },
    Jul: {
      admins: {
        type: Number,
        default: 0
      },
      customers: {
        type: Number,
        default: 0
      },
      visitors: {
        type: Number,
        default: 0
      },
      pageViews: {
        type: Number,
        default: 0
      }
    },
    Aug: {
      admins: {
        type: Number,
        default: 0
      },
      customers: {
        type: Number,
        default: 0
      },
      visitors: {
        type: Number,
        default: 0
      },
      pageViews: {
        type: Number,
        default: 0
      }
    },
    Sep: {
      admins: {
        type: Number,
        default: 0
      },
      customers: {
        type: Number,
        default: 0
      },
      visitors: {
        type: Number,
        default: 0
      },
      pageViews: {
        type: Number,
        default: 0
      }
    },
    Oct: {
      admins: {
        type: Number,
        default: 0
      },
      customers: {
        type: Number,
        default: 0
      },
      visitors: {
        type: Number,
        default: 0
      },
      pageViews: {
        type: Number,
        default: 0
      }
    },
    Nov: {
      admins: {
        type: Number,
        default: 0
      },
      customers: {
        type: Number,
        default: 0
      },
      visitors: {
        type: Number,
        default: 0
      },
      pageViews: {
        type: Number,
        default: 0
      }
    },
    Dec: {
      admins: {
        type: Number,
        default: 0
      },
      customers: {
        type: Number,
        default: 0
      },
      visitors: {
        type: Number,
        default: 0
      },
      pageViews: {
        type: Number,
        default: 0
      }
    }
  }
});




//and when create new user or delete one will ref here
//as well as will change in the count middleware
//also will check every month to know if this a new one or not and if it's will
// start counting in the new one starts from 0
