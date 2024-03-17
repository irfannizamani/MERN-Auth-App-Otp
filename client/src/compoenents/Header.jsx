import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Header = () => {
  return (
    <div  className='container'>

   
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded p-2">
        <div className="container-fluid">
          <img src={Logo} alt="Logo" width="30" height="30" className="d-inline-block align-top  me-2" />
          <Link className="navbar-brand" to="/">
            MERN-Auth App
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link " to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/forgetpass">Forgot Password</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    </div>
  )
}

export default Header