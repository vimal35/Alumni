import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/news", label: "News Room" },
    { to: "/members", label: "Members" },
    { to: "/events", label: "Events" },
    { to: "/gallery", label: "Gallery" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src="images/logo.png" alt="AlumniConnect Logo" />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <ul className="nav-links nav-links--desktop">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={location.pathname === to ? "active" : ""}
              >
                {label}
                <span className="nav-underline" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="nav-buttons nav-buttons--desktop">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn--outline">
                <span className="btn-icon">👤</span>
                Hello, {user.name.split(" ")[0]}
              </Link>
              <button onClick={handleLogout} className="btn btn--primary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--outline">Login</Link>
              <Link to="/alumni-register" className="btn btn--primary">Register</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`nav-overlay ${menuOpen ? "nav-overlay--visible" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`nav-drawer ${menuOpen ? "nav-drawer--open" : ""}`}>
        <div className="nav-drawer__header">
          <span className="nav-drawer__title">Menu</span>
        </div>

        <ul className="nav-drawer__links">
          {navLinks.map(({ to, label }, i) => (
            <li
              key={to}
              className="nav-drawer__item"
              style={{ animationDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
            >
              <Link
                to={to}
                className={`nav-drawer__link ${location.pathname === to ? "nav-drawer__link--active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-drawer__link-text">{label}</span>
                <span className="nav-drawer__arrow">›</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-drawer__footer">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="btn btn--outline btn--full"
                onClick={() => setMenuOpen(false)}
              >
                👤 Hello, {user.name.split(" ")[0]}
              </Link>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="btn btn--primary btn--full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn--outline btn--full"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/alumni-register"
                className="btn btn--primary btn--full"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;