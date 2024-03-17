import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Header from './Header';
import Footer from './Footer';

const NotFound = () => {
  return (<>

  <Header/>
    <section className="container my-5 py-5">
      <div className="text-center">
        <img src={Logo} width={100} alt='logo img' />
        <h2 className="display-4 mb-4">MERN-Auth App</h2>
        <h4 className="display-4 mb-4">404 - Page Not Found</h4>
        <p className="lead">Oops! The page you're looking for does not exist.</p>
        <Link to="/" className="btn btn-primary mt-3">Go to Homepage</Link>
      </div>
    </section>

    <Footer/>
    </>
  );
};

export default NotFound;
