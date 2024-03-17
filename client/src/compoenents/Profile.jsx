import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Header from './Header';
import Footer from './Footer';

const Profile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      navigate('/signin');
    } else {
      const userEmail = localStorage.getItem('EMAIL');
      const userName = localStorage.getItem('NAME');
      const userSurname = localStorage.getItem('SURNAME');
      setEmail(userEmail);
      setName(userName);
      setSurname(userSurname);
      setLoggedIn(true);
    }
  }, [loggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('EMAIL');
    localStorage.removeItem('NAME');
    localStorage.removeItem('SURNAME');
    setLoggedIn(false);
    navigate('/signin');
  };

  return ( <>

  <Header/>
    <div className="card border-primary mt-5 mx-auto p-4" style={{ maxWidth: '30rem' }}>
      <img className='mt-2 mx-auto' src={Logo} width={100} alt='logo img' /> 
      <h1 className="display-6 mt-3 text-center">MERN-Auth App</h1>
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">Welcome</h3>
      </div>
      <div className="card-body">
        {loggedIn ? (
          <>
            <h4 className="card-title">Home</h4>
            <p className="card-text">Welcome back, <b>{name} {surname}</b></p>
            <p className="card-text">Email: {email}</p>
          </>
        ) : (
          <>
            <h4 className="card-title">Please Sign In</h4>
            <p className="card-text">Please sign in to access this page.</p>
          </>
        )}
      </div>
      <div className="card-footer">
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>

<Footer/>

    </>
  );
};

export default Profile;
