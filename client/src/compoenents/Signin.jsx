import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';
import Header from './Header';
import Footer from './Footer';

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlertClass('alert-danger');
      setAlertMessage('Please fill in all fields.');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/signin', { email, password });
      const { data } = response;
      const { token, name, surname } = data; // Extracting name and surname from the response
      localStorage.setItem('TOKEN', token);
      localStorage.setItem('EMAIL', email);
      localStorage.setItem('NAME', name); // Storing name in local storage
      localStorage.setItem('SURNAME', surname); // Storing surname in local storage
      setEmail('');
      setPassword('');
      navigate('/profile');
    } catch (error) {
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
    }
  };

  return (
<>
<Header/>
    
    <div className="card border-primary  mt-5 mx-auto p-4" style={{ maxWidth: '30rem' }}>
      <img className='mt-2 mx-auto' src={Logo} width={100} alt='logo img' /> 
      <h1 className="display-6 mt-3 text-center">MERN-Auth App</h1>
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">Sign In</h3>
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
              title="Please enter a valid email address"
            />
          </div>
          <div className="mb-3">
            <input
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary  form-control"
          >
            Sign In
          </button>
    
        </form>
      </div>
      
    </div>

    <Footer/>
    </>
  );
};

export default Signin;
