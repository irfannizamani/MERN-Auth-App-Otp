import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import statement

import Signup from "./compoenents/Signup";
import Signin from "./compoenents/Signin";
import Profile from './compoenents/Profile';
import ForgetPassword from './compoenents/ForgetPassword';
import OtpCode from './compoenents/OtpCode';
import Home from './compoenents/Home';
import NotFound from './compoenents/NotFound';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/signin" element={<Signin />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/forgetpass" element={<ForgetPassword />} /> 
        <Route path="/otpcode" element={<OtpCode />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
