const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: Number, required: false },
  name: { type: String, required: true },
  surname: { type: String, required: true }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;