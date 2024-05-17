import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="brand">Crochet Store</Link>
        <div className="nav-links">
          <Link to="/list">List</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {!isAuthenticated && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
