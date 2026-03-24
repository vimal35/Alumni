import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  // Mock data for easy customization
  const companyInfo = {
    name: "AlumniConnect",
    description: [
      "From the hallowed halls of CIT to boardrooms across the globe, our journey reflects shared memories, collective ambition, and lifelong camaraderie. The Bangalore Chapter was born from a simple idea — to extend the CIT experience beyond campus life and build a strong alumni ecosystem that thrives on connection and collaboration. Our purpose is simple yet impactful — to keep the CIT spirit alive while creating opportunities for alumni to connect, grow, and give back to society."
    ]
  };

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our History", path: "/history" },
    { name: "Events Calendar", path: "/events" },
    { name: "Member Directory", path: "/members" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact Support", path: "/contact" }
  ];

  const recentNews = [
    { date: "Oct 15, 2023", title: "Annual Reunion Gala 2023", type: "Event" },
    { date: "Sep 28, 2023", title: "New Scholarship Fund Launch", type: "News" },
    { date: "Sep 12, 2023", title: "Global Alumni Meet-up in NYC", type: "Event" }
  ];

  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        {/* 1st Grid: About Company */}
        <div className="footer-col col-about">
          <a href="/" className="footer-logo-link">
            {/* Replace src with your actual logo path */}
            <img src="images/logo.png" alt="CIT Alumni Logo" className="footer-logo-img" />
          </a>
          <div className="footer-text-block">
            {companyInfo.description.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>

        {/* 2nd Grid: Quick Links */}
        <div className="footer-col col-links">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-list">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path} className="footer-link-item">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3rd Grid: Latest News / Events */}
        <div className="footer-col col-news">
          <h3 className="footer-heading">Latest Updates</h3>
          <div className="news-list-wrapper">
            {recentNews.map((news, index) => (
              <div key={index} className="news-card-mini">
                <span className="news-date">{news.date}</span>
                <Link to="/news" className="news-title">{news.title}</Link>
                <span className={`news-tag ${news.type === 'Event' ? 'tag-event' : 'tag-news'}`}>
                  {news.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4th Grid: Contact & Socials */}
        <div className="footer-col col-contact">
          <h3 className="footer-heading">Get in Touch</h3>
          
          <div className="contact-info">
            <p className="contact-item">
              <span className="icon">📍</span> CIT Campus, Anna Nagar, Bangalore
            </p>
            <p className="contact-item">
              <span className="icon">📞</span> +91 98765 43210
            </p>
            <p className="contact-item">
              <span className="icon">✉️</span> alumni@cit.org.in
            </p>
          </div>

          <div className="social-icons-wrapper">
            <a href="#" className="social-icon fb">FB</a>
            <a href="#" className="social-icon inst">IG</a>
            <a href="#" className="social-icon ln">LN</a>
            <a href="#" className="social-icon wa">WA</a>
          </div>
        </div>

      </div>
      
      {/* Bottom Copyright Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CIT Alumni Association. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;