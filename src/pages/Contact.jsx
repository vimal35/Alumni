import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Alumni Association</h1>

      {/* Organization Info */}
      <div className="org-info">
        <h2>Organization Contact Information</h2>
        <p><strong>Address:</strong> 123 Alumni Avenue, Knowledge City, India</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Email:</strong> info@alumniconnect.com</p>
      </div>

      {/* Google Map */}
      <div className="map-container">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18..."
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Social Media */}
      <div className="social-buttons">
        <a href="#">Facebook</a>
        <a href="#">LinkedIn</a>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
      </div>

      {/* Contact Persons */}
      <div className="contact-persons">
        <div className="person-card">
          <h3>Mr. Rajesh Kumar</h3>
          <p>President</p>
          <p>📞 +91 90000 11111</p>
          <p>✉ rajesh@alumniconnect.com</p>
        </div>

        <div className="person-card">
          <h3>Ms. Ananya Singh</h3>
          <p>Event Coordinator</p>
          <p>📞 +91 90000 22222</p>
          <p>✉ ananya@alumniconnect.com</p>
        </div>

        <div className="person-card">
          <h3>Mr. Vikram Patel</h3>
          <p>Membership Head</p>
          <p>📞 +91 90000 33333</p>
          <p>✉ vikram@alumniconnect.com</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;