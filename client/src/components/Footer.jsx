import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
      <h1 className="text-center">All Right Reserved &copy; Ecom</h1>
      <p className="text-center mt-3">
        <NavLink to="/about">About</NavLink>|<NavLink to="/contact">Contact</NavLink>|
        <NavLink to="/policy">Privacy Policy</NavLink>
      </p>
    </div>
    );
};

export default Footer;