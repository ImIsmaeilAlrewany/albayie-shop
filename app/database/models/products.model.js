const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    minlength: 3
  },
  description: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    minlength: 3
  },
  sku: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: /^[A-Za-z0-9_-]{6,20}$/
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  productPics: {
    type: [String],
    maxlength: 4,
    required: true
  },
  productPoster: {
    type: String,
    default: this.productPics[0]
  },
  brand: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  properties: {

  }
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);