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
    validate(v) {
      if (!/^[A-Za-z0-9_-]{6,20}$/.test(v)) throw new Error('invalid sku');
    }
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
    clothing: {
      gender: {
        type: String,
        enum: ['male', 'female'],
        trim: true,
        lowercase: true
      },
      ageRange: {
        type: String,
        enum: ['children', 'adults'],
        trim: true,
        lowercase: true
      },
      size: {
        type: String,
        enum: ['xs', 's', 'm', 'l', 'xl'],
        trim: true,
        lowercase: true
      },
      color: {
        type: String,
        trim: true,
        lowercase: true
      },
      style: {
        type: String,
        enum: ['casual', 'formal', 'sportswear', 'streetwear', 'bohemian', 'vintage', 'preppy', 'punk'],
        trim: true,
        lowercase: true
      },
      material: {
        type: String,
        trim: true,
        lowercase: true
      }
    },
    electronics: {
      modelNumber: {
        type: String,
        trim: true,
        lowercase: true,
        validate(v) {
          if (!/^[a-zA-Z0-9]+$/.test(v)) throw new Error('invalid model');
        }
      },
      dimensions: {
        type: {
          width: {
            type: Number
          },
          height: {
            type: Number
          },
          depth: {
            type: Number
          }
        },
        validate: {
          validator: function (v) {
            if (typeof v.width !== 'number' || typeof v.height !== 'number' || typeof v.depth !== 'number') {
              return false;
            }
            if (v.width <= 0 || v.height <= 0 || v.depth <= 0) {
              return false;
            }
            if (!/^\d+(\.\d{1,2})?$/.test(v.width.toString()) || !/^\d+(\.\d{1,2})?$/.test(v.height.toString()) || !/^\d+(\.\d{1,2})?$/.test(v.depth.toString())) {
              return false;
            }
            return true;
          },
          message: props => `Invalid dimensions: ${props.value}`
        }
      },
      weight: {
        type: {
          value: {
            type: Number
          },
          unit: {
            type: String,
            enum: ['kg', 'g', 'lb', 'oz'],
            lowercase: true,
            trim: true
          }
        },
        validate: {
          validator: function (v) {
            if (typeof v.value !== 'number' || v.value <= 0) return false;
            else return true;
          },
          message: props => `Invalid weight: ${props.value}`
        }
      },
      screenSize: {
        type: String,
        trim: true,
        lowercase: true,
        validate(v) {
          if (!/^\d+(\.\d+)?$/.test(v)) throw new Error('incorrect screenSize');
        }
      },
      processor: {
        type: String,
        trim: true,
        lowercase: true
      },
      gpu: {
        type: String,
        trim: true,
        lowercase: true
      },
      storage: {
        type: {
          capacity: {
            type: Number
          },
          capacityUnit: {
            type: String,
            enum: ['mb', 'gb', 'tb'],
            trim: true,
            lowercase: true
          }
        },
        validate: {
          validator: function (v) {
            if (typeof v.value !== 'number' || v.value <= 0) return false;
            else return true;
          },
          message: props => `Invalid weight: ${props.value}`
        }
      },
      battery: {
        type: Number,
        min: 1,
        default: 0
      }
    },
    books: {

    }
  }
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);