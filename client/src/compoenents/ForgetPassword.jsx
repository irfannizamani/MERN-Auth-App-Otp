import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';
import Header from './Header';
import Footer from './Footer';



const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setAlertClass('alert-danger');
      setAlertMessage('Please enter your email.');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return;
    }

    axios.post('http://localhost:8000/sendotp', { email }) 
      .then(res => {
        setAlertClass('alert-success');
        setAlertMessage('OTP sent successfully. Check your email.');
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
        
        navigate(`/otpcode?email=${email}`);
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
        <h3 className="mb-0">Forget Password</h3>
      </div>
      <div className="card-body">
        {alertMessage && (
          <div className={`alert ${alertClass}`}>
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              type="email"
              title="Please enter your email"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary form-control"
          >
            Forget Password
          </button>
        </form>
      </div>
    
    </div>

    <Footer/>
    </>
  );
};

export default ForgetPassword;
