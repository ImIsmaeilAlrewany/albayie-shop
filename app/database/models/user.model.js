const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const userSchema = mongoose.Schema({
  fName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3
  },
  lName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3
  },
  phoneNum: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isMobilePhone(value, ['ar-EG'])) throw new Error('invalid phone number');
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error('invalid email');
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value) {
      if (!validator.isStrongPassword(value)) throw new Error('weak password');
    }
  },
  agree: {
    type: String,
    required: true,
    default: 'off',
    validate(value) {
      if (value === 'off') throw new Error('agree all term and privacy policy');
    }
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true });

//delete __v, password and tokens in response
userSchema.methods.toJson = function () {
  let del = ['__v', 'password', 'tokens'];
  const userData = this.toObject();
  del.forEach(d => delete userData[d]);
  return userData;
};

//encrypt the password before saving it
userSchema.pre('save', async function () {
  if (this.isModified('phoneNum'))
    if (this.phoneNum[0] !== '0')
      this.phoneNum = '0' + this.phoneNum;
  if (this.isModified('password'))
    this.password = await bcryptjs.hash(this.password, 12);
});

//create generateToken method to create tokens
userSchema.methods.generateToken = async function () {
  const userData = this;
  const token = jwt.sign({ _id: userData._id }, process.env.KEY);
  userData.tokens = userData.tokens.concat({ token });
  await userData.save();
  return token;
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;