import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Alumni Connect Network. All Rights Reserved.</p>
        <div className="socials">
          {/* You would put icons here later */}
          <span>Privacy Policy</span> | <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;