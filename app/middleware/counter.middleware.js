const count = require('../database/models/count.model');

const counter = async (req, res, next) => {
  try {
    if (!req.cookies.pageViews) {
      if (!req.cookies.Authorization) {
        res.cookie('pageViews', 1, {
          httpOnly: true,
          secure: true
        });
        res.cookie('visitor', true, {
          httpOnly: true,
          secure: true
        });

        const date = new Date();
        const counter = await count.findById('6410899ea821615f4e4638e6');

        await count.findByIdAndUpdate('6410899ea821615f4e4638e6',
          { $inc: { visitors: 1, pageViews: 1 } });

        await counter.findMonthAndUpdate(date.getMonth(), 'visitors', 1);
        await counter.findMonthAndUpdate(date.getMonth(), 'pageViews', 1);
        await counter.save();
      } else {
        res.cookie('pageViews', 1, {
          httpOnly: true,
          secure: true
        });

        const date = new Date();
        const counter = await count.findById('6410899ea821615f4e4638e6');

        await count.findByIdAndUpdate('6410899ea821615f4e4638e6', { $inc: { pageViews: 1 } });

        await counter.findMonthAndUpdate(date.getMonth(), 'pageViews', 1);
        await counter.save();
      }
    } else {
      res.cookie('pageViews', (+req.cookies.pageViews + 1), {
        httpOnly: true,
        secure: true
      });

      const date = new Date();
      const counter = await count.findById('6410899ea821615f4e4638e6');

      await count.findByIdAndUpdate('6410899ea821615f4e4638e6', { $inc: { pageViews: 1 } });

      await counter.findMonthAndUpdate(date.getMonth(), 'pageViews', 1);
      await counter.save();
    }

    next();
  } catch (err) {
    if (req.cookies.lang === 'ar') {
      res.redirect('/ar');
    } else {
      res.redirect('/en');
    }
  }
};

module.exports = counter;