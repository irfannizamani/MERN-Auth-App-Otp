import React, { useState, useEffect } from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';
import Header from './Header';
import Footer from './Footer';

const OtpCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get('email');
    if (!emailParam) {
     navigate('/forgetpass');
    } else {
      setEmail(emailParam);
    }
  }, [location.search, navigate]);

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      setAlertClass('alert-danger');
      setAlertMessage('Please fill in all fields.');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return;
    }

    axios.post('http://localhost:8000/submitotp', { otp, newPassword })
      .then(res => {
        setAlertClass('alert-success');
        setAlertMessage('Password changed successfully.');
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
        // Optionally, navigate to another page after changing password
        navigate('/signin');
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          setAlertClass('alert-danger');
          setAlertMessage(error.response.data.message);
        } else if (error.request) {
          setAlertClass('alert-danger');
          setAlertMessage('Network error: Unable to connect to the server');
        } else {
          setAlertClass('alert-danger');
          setAlertMessage('Something went wrong. Please try again.');
        }
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
      });
  };

  return (
    
    <>
    <Header/>
    <div className="card border-primary mt-5 mx-auto p-4" style={{ maxWidth: '30rem' }}>
        <img className='mt-2 mx-auto' src={Logo} width={100} alt='logo img' /> 
<h1 className="display-6 mt-3 text-center">MERN-Auth App</h1>
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">Change Password</h3>
      </div>
      <div className="card-body">
        {alertMessage && (
          <div className={`alert ${alertClass}`}>
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleChangePassword}>
          <div className="mb-3">
            <input
              value={email}
              className="form-control"
              type="text"
              disabled
            />
          </div>
          <div className="mb-3">
            <input
              placeholder='Enter OTP'
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              className="form-control"
              type="text"
              title="Please enter OTP"
            />
          </div>
          <div className="mb-3">
            <input
              placeholder='Enter New Password'
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className="form-control"
              type="password"
              title="Please enter new password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary form-control"
          >
            Change Password
          </button>
        </form>
      </div>
     



    </div>
    <Footer/>
    </>
  );
};

export default OtpCode;
