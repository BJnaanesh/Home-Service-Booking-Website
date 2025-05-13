import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ isLoggedIn, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const username = localStorage.getItem('username')
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  const handleLogout = () => {
    onLogout();
    closeMenu();
  };
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <h1>HomeService</h1>
        </Link>
        
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        <nav className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <ul className="navbar-links">
            <li className={isActive('/home')}>
              <Link to="/home" onClick={closeMenu}>Home</Link>
            </li>
            <li className={isActive('/bookings')}>
              <Link to="/bookings" onClick={closeMenu}>Bookings</Link>
            </li>
            <li className={isActive('/aboutus')}>
              <Link to="/aboutus" onClick={closeMenu}>About Us</Link>
            </li>
          </ul>
          
          <div className="navbar-auth">
            {isLoggedIn ? (
              <div className="navbar-user-menu">
                <Link to="/profile" className="user-profile-link" onClick={closeMenu}>
                  <FaUser /> {username}
                </Link>
                <button className="logout-button" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-button" onClick={closeMenu}>
                Login / Signup
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;