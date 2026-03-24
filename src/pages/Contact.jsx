import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">

      {/* HERO SECTION */}
      <div className="contact-hero">
        <h1>Connect with CIT Alumni – Bangalore Chapter</h1>
        <p>
          We warmly welcome all CIT alumni to reconnect, collaborate, and grow
          with the Bangalore Chapter. Whether you’re looking to engage with
          fellow alumni, participate in events, or explore new opportunities,
          we’re here to support your journey.
        </p>
      </div>

      {/* MAIN SECTION */}
      <div className="contact-container">

        {/* LEFT INFO */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            We encourage you to reach out for any queries, collaborations, or
            community involvement. Our team is always ready to assist and guide
            you in staying connected with the CIT alumni network.
          </p>

          <div className="info-box">
            <h4>Organization</h4>
            <p>CIT Alumni Bangalore Chapter</p>
          </div>

          <div className="info-box">
            <h4>Location</h4>
            <p>Bangalore, Tamil Nadu, India</p>
          </div>

          <div className="info-box">
            <h4>Email</h4>
            <p>alumni@citcommunity.org</p>
          </div>

          <div className="info-box">
            <h4>Phone</h4>
            <p>+91 XXXXX XXXXX</p>
          </div>

          {/* SOCIAL MEDIA */}
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="contact-form">
          <h2>Send a Message</h2>

          <form>
            <div className="input-group">
              <input type="text" required />
              <label>Your Name</label>
            </div>

            <div className="input-group">
              <input type="email" required />
              <label>Email Address</label>
            </div>

            <div className="input-group">
              <input type="text" required />
              <label>Subject</label>
            </div>

            <div className="input-group">
              <textarea rows="4" required></textarea>
              <label>Your Message</label>
            </div>

            <button type="submit">Send Message</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;