import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/cart" className="nav-link">Carrinho</Link>
    </nav>
  );
};

export default Navbar;