// const count = require('../database/models/count.model');

// const counter = async (req, res, next) => {
//   try {
//     if (!req.cookies.pageViews) {
//       if (!req.cookies.Authorization) {
//         res.cookie('pageViews', 1, {
//           httpOnly: true,
//           secure: true
//         });
//         res.cookie('visitor', true, {
//           httpOnly: true,
//           secure: true
//         });

//         const date = new Date();
//         const counter = await count.findById('6410899ea821615f4e4638e6');

//         await count.findByIdAndUpdate('6410899ea821615f4e4638e6',
//           { $inc: { visitors: 1, pageViews: 1 } });

//         await counter.findMonthAndUpdate(date.getMonth(), 'visitors', 1);
//         await counter.findMonthAndUpdate(date.getMonth(), 'pageViews', 1);
//         await counter.save();
//       } else {
//         res.cookie('pageViews', 1, {
//           httpOnly: true,
//           secure: true
//         });

//         const date = new Date();
//         const counter = await count.findById('6410899ea821615f4e4638e6');

//         await count.findByIdAndUpdate('6410899ea821615f4e4638e6', { $inc: { pageViews: 1 } });

//         await counter.findMonthAndUpdate(date.getMonth(), 'pageViews', 1);
//         await counter.save();
//       }
//     } else {
//       res.cookie('pageViews', (+req.cookies.pageViews + 1), {
//         httpOnly: true,
//         secure: true
//       });

//       const date = new Date();
//       const counter = await count.findById('6410899ea821615f4e4638e6');

//       await count.findByIdAndUpdate('6410899ea821615f4e4638e6', { $inc: { pageViews: 1 } });

//       await counter.findMonthAndUpdate(date.getMonth(), 'pageViews', 1);
//       await counter.save();
//     }

//     next();
//   } catch (err) {
//     // if (req.cookies.lang === 'ar') {
//     //   res.redirect('/ar');
//     // } else {
//     //   res.redirect('/en');
//     // }
//     console.log(err)
//   }
// };

// module.exports = counter;

const Count = require('../database/models/count.model');

const counter = async (req, res, next) => {
  try {
    const counterId = '6410899ea821615f4e4638e6';
    let counter = await Count.findById(counterId);

    if (!counter) {
      counter = new Count({ _id: counterId });
    }

    const date = new Date();
    const month = date.getMonth();

    if (!req.cookies.pageViews) {
      if (!req.cookies.Authorization) {
        res.cookie('pageViews', 1, { httpOnly: true, secure: true });
        res.cookie('visitor', true, { httpOnly: true, secure: true });

        await counter.findMonthAndUpdate(month, 'visitors', 1);
        await counter.findMonthAndUpdate(month, 'pageViews', 1);
      } else {
        res.cookie('pageViews', 1, { httpOnly: true, secure: true });
        await counter.findMonthAndUpdate(month, 'pageViews', 1);
      }
    } else {
      res.cookie('pageViews', (+req.cookies.pageViews + 1), { httpOnly: true, secure: true });
      await counter.findMonthAndUpdate(month, 'pageViews', 1);
    }

    await counter.save();
    next();
  } catch (err) {
    console.log(err);
    next(err);  // Pass the error to the next error-handling middleware
  }
};

module.exports = counter;