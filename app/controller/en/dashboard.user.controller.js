const userModel = require('../../database/models/user.model');
const count = require('../../database/models/count.model');
const bcryptjs = require('bcryptjs');
const path = require('path');
const fs = require('fs');

class userDashboard {
  static login = (req, res) => {
    res.render('en/dashboard-login', { pageTitle: 'Albayie - Login Dashboard' });
  };

  static loginLogic = async (req, res) => {
    try {
      //get data using email or phone number
      const userData = await userModel.findOne({ email: req.body.authPortal }) || await userModel.findOne({ phoneNum: req.body.authPortal });
      if (!userData) throw new Error('invalid email or phone number');

      //check password if it's correct or not
      const password = await bcryptjs.compare(req.body.password, userData.password);
      if (!password) throw new Error('invalid password');

      const token = await userData.generateToken();
      res.cookie('Authorization', token, {
        httpOnly: true,
        secure: true
      });

      //check if this user is Admin
      const admin = userData.admin;
      if (!admin) throw new Error('user is\'t admin');

      userData.online = true;
      await userData.save();

      res.redirect('/en/dash-board');
    }
    catch (err) {
      res.redirect('/en');
    }
  };

  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(f => f.token !== req.token);
      req.user.online = false;
      await req.user.save();

      res.clearCookie('Authorization');
      res.redirect('/en/dash-board/login');
    } catch (err) {
      res.send({ error: err.message });
    }
  };

  static overview = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');

      const counter = await count.findById('6410899ea821615f4e4638e6');

      res.render('en/dashboard-usersOverview', {
        pageTitle: 'Albayie - Dashboard - Users Overview',
        path: '/en/dash-board/users/overview',
        user: req.user,
        counter
      });
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static createUser = (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');
      res.render('en/dashboard-createUser', { pageTitle: 'Albayie - Dashboard Create User' });
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static createUserLogic = async (req, res) => {
    try {
      const date = new Date();
      const userData = userModel(req.body);
      await userData.save();

      const counter = await count.findById('6410899ea821615f4e4638e6');
      if (req.body.admin) {
        counter.admins = counter.admins + 1;
        await counter.findMonthAndUpdate(date.getMonth(), 'admins', 1);
      } else {
        counter.customers = counter.customers + 1;
        await counter.findMonthAndUpdate(date.getMonth(), 'customers', 1);
      }
      await counter.save();

      res.redirect('/en/dash-board/users/overview');
    }
    catch (err) {
      res.render('en/dashboard-createUser', { pageTitle: 'Albayie - Dashboard Create User', data: req.body, error: err.message });
    }
  };

  static admins = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');
      let admins;

      if (req.query.search != 'undefined' && req.query.searchAdmin != '') {
        admins = await userModel.find({
          $or: [
            { fName: { $regex: req.query.search }, admin: true },
            { lName: { $regex: req.query.search }, admin: true },
            { phoneNum: { $regex: req.query.search }, admin: true },
            { email: { $regex: req.query.search }, admin: true },
            { city: { $regex: req.query.search }, admin: true },
          ]
        });
      } else {
        admins = await userModel.find({ admin: true });
      }

      res.status(200).json({ admins });
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static adminsTable = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');

      res.render('en/dashboard-adminsTable', { pageTitle: 'Albayie - Dashboard Admins\' Table', user: req.user, path: '/en/dash-board/users/admin' });
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static customers = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');
      let customers;

      if (req.query.search != 'undefined' && req.query.search != '') {
        customers = await userModel.find({
          $or: [
            { fName: { $regex: req.query.search }, admin: false },
            { lName: { $regex: req.query.search }, admin: false },
            { phoneNum: { $regex: req.query.search }, admin: false },
            { email: { $regex: req.query.search }, admin: false },
            { city: { $regex: req.query.search }, admin: false },
          ]
        });
      } else {
        customers = await userModel.find({ admin: false });
      }

      res.status(200).json({ customers });
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static customersTable = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');

      res.render('en/dashboard-customersTable', { pageTitle: 'Albayie - Dashboard Customers\' Table', user: req.user, path: '/en/dash-board/users/customer' });
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static getProfile = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');

      let message;
      if (req.cookies.wrongPass) message = 'Current password is wrong';
      else if (req.cookies.emptyInput) message = 'New password input is empty';

      const userData = await userModel.findOne({ _id: req.params.id });
      // console.log('dashboard', userData.online);
      res.render('en/dashboard-userProfile', { pageTitle: `Albayie - Dashboard - ${userData.fName} ${userData.lName}'s Profile`, user: req.user, path: '/en/dash-board/users', profileData: userData, message });
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static editData = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');

      const userData = await userModel.findById(req.params.id);

      if (!req.body.admin) req.body.admin = false;
      if (!req.body.editor) req.body.editor = false;
      const data = await userModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body });
      await data.save();

      const date = new Date();
      const counter = await count.findById('6410899ea821615f4e4638e6');

      if (req.body.admin != userData.admin) {
        if (req.body.admin) {
          await count.findByIdAndUpdate('6410899ea821615f4e4638e6', {
            $inc: { admins: 1, customers: -1 }
          });
          await counter.findMonthAndUpdate(date.getMonth(), 'admins', 1);
          await counter.findMonthAndUpdate(date.getMonth(), 'customers', -1);
        } else {
          await count.findByIdAndUpdate('6410899ea821615f4e4638e6', {
            $inc: { admins: -1, customers: 1 }
          });
          await counter.findMonthAndUpdate(date.getMonth(), 'admins', -1);
          await counter.findMonthAndUpdate(date.getMonth(), 'customers', 1);
        }
      }
      await counter.save();

      if (req.body.admin) {
        res.redirect(`/en/dash-board/users/admin/profile/${data._id}`);
      } else {
        res.redirect(`/en/dash-board/users/customer/profile/${data._id}`);
      }
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static changeAdminPassword = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');

      const userData = await userModel.findOne({ _id: req.params.id });

      //check password if it's correct or not
      const password = await bcryptjs.compare(req.body.currentPassword, userData.password);

      if (!password) {
        res.cookie('wrongPass', true, {
          httpOnly: true,
          secure: true
        });
        return res.redirect(`/en/dash-board/users/admin/profile/${userData._id}`);
      } else {
        res.clearCookie('wrongPass');
      }

      if (!req.body.newPassword) {
        res.cookie('emptyInput', true, {
          httpOnly: true,
          secure: true
        });
        return res.redirect(`/en/dash-board/users/admin/profile/${userData._id}`);
      } else {
        res.clearCookie('emptyInput');
      }

      userData.password = req.body.newPassword;
      await userData.save();

      res.redirect(`/en/dash-board/users/admin/profile/${userData._id}`);
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static changeCustomerPassword = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');

      const userData = await userModel.findOne({ _id: req.params.id });

      //check password if it's correct or not
      const password = await bcryptjs.compare(req.body.currentPassword, userData.password);

      if (!password) {
        res.cookie('wrongPass', true, {
          httpOnly: true,
          secure: true
        });
        return res.redirect(`/en/dash-board/users/customer/profile/${userData._id}`);
      } else {
        res.clearCookie('wrongPass');
      }

      if (!req.body.newPassword) {
        res.cookie('emptyInput', true, {
          httpOnly: true,
          secure: true
        });
        return res.redirect(`/en/dash-board/users/customer/profile/${userData._id}`);
      } else {
        res.clearCookie('emptyInput');
      }

      userData.password = req.body.newPassword;
      await userData.save();

      res.redirect(`/en/dash-board/users/customer/profile/${userData._id}`);
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static deleteAdmin = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');
      if (!req.body.delete) throw new Error('no value');

      await userModel.findOneAndDelete({ _id: req.params.id });
      await count.findByIdAndUpdate('6410899ea821615f4e4638e6', {
        $inc: { admins: -1 }
      });

      const date = new Date();
      const counter = await count.findById('6410899ea821615f4e4638e6');
      await counter.findMonthAndUpdate(date.getMonth(), 'admins', -1);
      await counter.save();

      res.redirect('/en/dash-board/users/admin');
    } catch (err) {
      if (err.message === 'no value') {
        res.redirect(`/en/dash-board/users/admin/profile/${req.params.id}`);
      } else {
        res.redirect('/en/dash-board');
      }
    }
  };

  static deleteCustomer = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');
      if (!req.body.delete) throw new Error('no value');

      await userModel.findOneAndDelete({ _id: req.params.id });
      await count.findByIdAndUpdate('6410899ea821615f4e4638e6', {
        $inc: { customers: -1 }
      });

      const date = new Date();
      const counter = await count.findById('6410899ea821615f4e4638e6');
      await counter.findMonthAndUpdate(date.getMonth(), 'customers', -1);
      await counter.save();

      res.redirect('/en/dash-board/users/customer');
    } catch (err) {
      if (err.message === 'no value') {
        res.redirect(`/en/dash-board/users/customer/profile/${req.params.id}`);
      } else {
        res.redirect('/en/dash-board');
      }
    }
  };

  static block = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');
      const { block, blockMessage } = req.body;
      const userData = await userModel.findOne({ _id: req.params.id });

      if (block === 'no') {
        userData.block = [];
        await userData.save();
      } else if (block === 'day') {
        userData.block = userData.block.concat({
          message: blockMessage,
          days: 1,
          endOn: Date.now() + 8.64e+7,
        });
        await userData.save();
      } else if (block === 'week') {
        userData.block = userData.block.concat({
          message: blockMessage,
          days: 7,
          endOn: Date.now() + 6.048e+8,
        });
        await userData.save();
      }

      res.redirect(`/en/dash-board/users/customer/profile/${req.params.id}`);
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };

  static uploadImg = async (req, res) => {
    try {
      if (!req.user.editor) throw new Error('not editor');

      const dir = path.join(
        __dirname,
        '../../../public/static/images/uploaded/'
      );
      const userData = await userModel.findById(req.params.id);

      if (req.file && userData.profilePic) {
        if (fs.existsSync(dir + userData.profilePic)) {
          fs.unlinkSync(dir + userData.profilePic);
        }
      }

      if (req.file.mimetype !== 'image/jpeg') {
        fs.unlinkSync(dir + req.file.filename);
        throw new Error('image not jpg');
      }

      await userModel.findByIdAndUpdate(req.params.id, { profilePic: req.file.filename });

      if (userData.admin) {
        res.redirect(`/en/dash-board/users/admin/profile/${req.params.id}`);
      } else {
        res.redirect(`/en/dash-board/users/customer/profile/${req.params.id}`);
      }
    } catch (err) {
      res.redirect('/en/dash-board');
    }
  };
}


module.exports = userDashboard;