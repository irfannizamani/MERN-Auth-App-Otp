import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  return (
<>
<Header/>
<div className="container">


      {/* Landing Page */}
      <div className="text-center p-3">
        <img className='m-3' src={Logo} width={100} alt='logo img' /> 
        <h1 className="display-4 mt-2">Welcome to MERN-Auth App</h1>
        <p className="lead">Secure authentication with OTP using Nodemailer</p>
        <Link to="/signup" className="btn btn-primary">Get Started</Link>
      </div>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Key Features</h2>
          <div className="row">
            <div className="col-md-4">
              <h3 className='fw-normal'>Full-Stack MERN App</h3>
              <p>Build using MongoDB, Express.js, React, and Node.js</p>
            </div>
            <div className="col-md-4">
              <h3 className='fw-normal'>JWT Authentication</h3>
              <p>Secure authentication with JSON Web Tokens</p>
            </div>
            <div className="col-md-4">
              <h3 className='fw-normal'>OTP with Nodemailer</h3>
              <p>Forgot password functionality with one-time passwords</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Run Section */}
   
      <section className="py-5 bg-light rounded">
  <div className="container">
    <h2 className="text-center mb-4">How to Run the Project</h2>
    <p className="lead">Follow these steps to run the project on your local machine:</p>
    
    {/* Backend Setup */}
    <div className="mb-4">
      <h3>Backend Setup</h3>
      <ol>
        <li>
          Navigate to the <strong>server</strong> directory.
        </li>
        <li>
          Install backend dependencies with <code className="bg-primary text-light w-25 rounded p-1 fw-bold d-block">npm install</code>
        </li>
        <li>
          Start the backend server using <code className="bg-primary text-light  w-25  rounded p-1 fw-bold d-block">npm start</code>
        </li>
      </ol>
    </div>
    
    {/* Frontend Setup */}
    <div>
      <h3>Frontend Setup</h3>
      <ol>
        <li>
          Navigate to the <strong>client</strong> directory.
        </li>
        <li>
          Install frontend dependencies with <code className="bg-primary text-light w-25 rounded  p-1 fw-bold d-block">npm install</code>
        </li>
        <li>
          Start the frontend server using <code className="bg-primary text-light w-25  rounded p-1 fw-bold d-block">npm start</code>
        </li>
      </ol>
    </div>
  </div>
</section>



      {/* Message for Educational Purposes */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">For Educational Purposes Only</h2>
          <p className="lead">This project is provided for educational purposes. Feel free to explore, learn, and experiment with the code. Happy coding!</p>
        </div>
      </section>


    </div>
    
    <Footer/>
  </>
  );
};

export default Home;
