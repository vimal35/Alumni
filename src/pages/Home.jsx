import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countersAnimated, setCountersAnimated] = useState(false);
  const statsRef = useRef(null);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Counter animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersAnimated) {
            setCountersAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [countersAnimated]);

  // Animate counters
  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + '+';
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + '+';
        }
      }, 16);
    });
  };

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <header id="header">
        <div className="container header-container">
          <div className="logo">
            <div className="logo-icon">CIT</div>
            <div className="logo-text">CIT <span>Alumni</span></div>
          </div>
          
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          
          <nav className={mobileMenuOpen ? 'active' : ''}>
            <ul>
              <li><a href="#" className="active">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">Members</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Gallery</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
          
          <div className="auth-buttons">
            <button className="btn btn-outline">Sign Up</button>
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Welcome to <span>CIT Alumni</span> – Chennai Chapter</h1>
            <p>A lifelong bond that began on campus continues to grow beyond it. The CIT Alumni Chennai Chapter is a thriving community of graduates who share a common legacy, professional ambition, and a deep connection to their alma mater.</p>
            <p>From reconnecting with classmates to building professional networks, mentoring future leaders, and celebrating achievements, the Chennai Chapter serves as a hub where memories evolve into meaningful connections.</p>
            <button className="btn btn-primary" style={{marginTop: '20px'}}>Join Our Community</button>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="CIT Alumni Community" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats" ref={statsRef}>
        <div className="container">
          <div className="section-title">
            <h2>Our Community at a Glance</h2>
            <p>A growing network of professionals across industries who continue to stay connected through the CIT alumni community.</p>
          </div>
          
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-number" data-count="1000">0</div>
              <div className="stat-text">Active Alumni</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-user-plus"></i>
              </div>
              <div className="stat-number" data-count="200">0</div>
              <div className="stat-text">New Members Every Year</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-history"></i>
              </div>
              <div className="stat-number" data-count="70">0</div>
              <div className="stat-text">Years of CIT Legacy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-title">
            <h2>What Makes Our Community Special</h2>
            <p>We provide a platform for alumni to connect, grow, and give back to the community</p>
          </div>
          
          <div className="features-container">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-network-wired"></i>
              </div>
              <div className="feature-content">
                <h3>Professional Networking</h3>
                <p>Build valuable connections with fellow CITians across industries and career stages. Access exclusive job opportunities and collaborative projects.</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="feature-content">
                <h3>Events & Gatherings</h3>
                <p>Participate in exclusive alumni events, reunions, knowledge sessions, and networking meetups designed to foster meaningful connections.</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
              <div className="feature-content">
                <h3>Mentorship & Support</h3>
                <p>Experienced alumni guide younger graduates through mentorship, career advice, and opportunities to accelerate professional growth.</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-hands"></i>
              </div>
              <div className="feature-content">
                <h3>Community Initiatives</h3>
                <p>Collaborate in social initiatives, knowledge sharing, and alumni-led programs that make a positive impact on society and future generations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs">
        <div className="container">
          <div className="section-title">
            <h2>Featured Programs</h2>
            <p>Our flagship initiatives designed to engage, empower, and connect CIT alumni</p>
          </div>
          
          <div className="programs-container">
            <div className="program-card">
              <div className="program-image">
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Alumni Day Celebrations" />
              </div>
              <div className="program-content">
                <span className="program-tag">Annual Event</span>
                <h3>Alumni Day Celebrations</h3>
                <p>An annual gathering where alumni from different batches reunite to celebrate memories, achievements, and the enduring CIT spirit.</p>
              </div>
            </div>
            
            <div className="program-card">
              <div className="program-image">
                <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="CIT Alumni Smart Card" />
              </div>
              <div className="program-content">
                <span className="program-tag">Exclusive Benefit</span>
                <h3>CIT Alumni Smart Card</h3>
                <p>A digital identity that provides exclusive alumni privileges, partner benefits, and seamless access to community resources and events.</p>
              </div>
            </div>
            
            <div className="program-card">
              <div className="program-image">
                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Entrepreneurship Network" />
              </div>
              <div className="program-content">
                <span className="program-tag">Business Network</span>
                <h3>Entrepreneurship Network</h3>
                <p>A platform for alumni founders and business leaders to collaborate, mentor, and grow together through shared knowledge and resources.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container cta-container">
          <h2>Stay Connected with CIT</h2>
          <p>The CIT experience does not end with graduation. It continues through friendships, collaboration, and shared success stories. Join the Chennai Chapter today and be part of a growing network that continues to inspire generations of CITians.</p>
          <button className="btn btn-cta">Become a Member Today</button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-container">
            <div className="footer-col">
              <div className="footer-logo">
                <div>CIT <span>Alumni</span></div>
              </div>
              <p>The CIT Alumni Chennai Chapter is a thriving community of graduates who share a common legacy, professional ambition, and a deep connection to their alma mater.</p>
            </div>
            
            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Members Directory</a></li>
                <li><a href="#">Events Calendar</a></li>
                <li><a href="#">Photo Gallery</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Alumni Benefits</a></li>
                <li><a href="#">Mentorship Program</a></li>
                <li><a href="#">Job Board</a></li>
                <li><a href="#">News & Updates</a></li>
                <li><a href="#">Contact EC Members</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h3>Contact Info</h3>
              <ul>
                <li><i className="fas fa-map-marker-alt"></i> CIT Campus, Chennai</li>
                <li><i className="fas fa-phone"></i> +91 44 1234 5678</li>
                <li><i className="fas fa-envelope"></i> contact@citalumnichennai.org</li>
              </ul>
              <div style={{marginTop: '20px'}}>
                <a href="#" style={{color: 'white', marginRight: '15px', fontSize: '20px'}}><i className="fab fa-facebook"></i></a>
                <a href="#" style={{color: 'white', marginRight: '15px', fontSize: '20px'}}><i className="fab fa-twitter"></i></a>
                <a href="#" style={{color: 'white', marginRight: '15px', fontSize: '20px'}}><i className="fab fa-linkedin"></i></a>
                <a href="#" style={{color: 'white', fontSize: '20px'}}><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          
          <div className="copyright">
            <p>&copy; 2024 CIT Alumni Chennai Chapter. All Rights Reserved. | Powered by Intelizest Consulting Pvt Ltd</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;