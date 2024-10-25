import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Book Store</h1>
      <div className="nav-links">
        <Link to="/">Book List</Link>
        <Link to="/book/create">Add Book</Link>
      </div>
    </nav>
  );
};

export default Navbar;
