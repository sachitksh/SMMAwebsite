const mongoose = require("mongoose");

const users = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: Number,
    required: true,
    unique: true,
    sparse: true,// allow null values for the phone field
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
});
users.index({ phone_number: 1 }, { unique: true, sparse: true });

users.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    if (error.keyPattern.email) {
      next(new Error('User with this email already exists.'));
    } else if (error.keyPattern.phone_number) {
      next(new Error('User with this phone number already exists.'));
    } else {
      next(error);
    }
  } else {
    next(error);
  }
});

const Register = mongoose.model("Register", users);
module.exports = Register;
