const UserModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');


module.exports.signup = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ code: 400, message: 'Email already exists' });
    }

    const newUser = new UserModel({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      surname: req.body.surname
    });

    await newUser.save();
    res.status(200).json({ code: 200, message: 'Signup success' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ code: 500, message: 'Signup error' });
  }
};


module.exports.signin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ code: 404, message: 'User not found' });
    }

    if (user.password !== req.body.password) {
      return res.status(401).json({ code: 401, message: 'Invalid password' });
    }

    // At this point, user is successfully authenticated
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Token expires in 1 hour
    });

    // Send user's name and surname along with the token
    res.status(200).json({ code: 200, message: 'Signin success', name: user.name, surname: user.surname, email: user.email, token });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ code: 500, message: 'Signin error' });
  }
};



module.exports.sendotp = async (req, res) => {
  console.log(req.body)
  const _otp = Math.floor(100000 + Math.random() * 900000)
  console.log(_otp)
  let user = await UserModel.findOne({ email: req.body.email })
  // send to user mail
  if (!user) {
      res.send({ code: 500, message: 'user not found' })
  }

  let testAccount = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
          user: process.env.email,
          pass: process.env.pass
      }
  })



  let info = await transporter.sendMail({
      from: process.env.email,
      to: req.body.email, // list of receivers
      subject: "[MERN-Auth App] - Reset Account OTP ", // Subject line
      text: `Your OTP is: ${_otp}`, // Include OTP in the text
      html: `<html><body>Hello ${req.body.email} <br/> Your MERN OTP is: ${_otp}</body></html>`, // Include OTP in the HTML body
 
  })

  if (info.messageId) {

      console.log(info, 84)
      UserModel.updateOne({ email: req.body.email }, { otp: _otp })
          .then(result => {
              res.send({ code: 200, message: 'otp send' })
          })
          .catch(err => {
              res.send({ code: 500, message: 'Server err' })

          })

  } else {
      res.send({ code: 500, message: 'Server err' })
  }
}


module.exports.submitotp = async (req, res) => {
  const { otp, newPassword } = req.body;

  try {
      const user = await UserModel.findOne({ otp });

      if (!user) {
          return res.status(404).json({ code: 404, message: 'OTP is invalid or has expired' });
      }

      // Update the user's password
      await UserModel.updateOne({ email: user.email }, { password: newPassword });

      return res.status(200).json({ code: 200, message: 'Password updated successfully' });
  } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({ code: 500, message: 'Server error' });
  }
};
