// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo"><Link to="/">Alumni<span>Connect</span></Link></div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}><span></span><span></span><span></span></div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/news">News Room</Link></li>
          <li><Link to="/members">Members</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          
          <div className="nav-buttons">
            {user ? (
              <>
                <Link to="/dashboard" className="profile-link">Hello, {user.name.split(' ')[0]}</Link>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="login-btn">Login</Link>
                <Link to="/alumni-register" className="register-btn">Register</Link>
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;