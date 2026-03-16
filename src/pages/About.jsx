import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <div className="about-content">
          <h1>About Alumni Connect</h1>
          <p>
            Alumni Connect is a dynamic platform designed to bring together graduates,
            foster meaningful relationships, and build lifelong professional networks.
            We believe that the bond between alumni and their institution should continue
            long after graduation. Our platform empowers former students to connect,
            collaborate, mentor, and grow together.
            Over the years, our alumni have become industry leaders, entrepreneurs,
            innovators, and community changemakers.
            Through events, networking programs, and digital engagement,
            we aim to strengthen alumni ties across the globe.
            We celebrate achievements, share opportunities, and support each other’s journeys.
            Our goal is to create a powerful ecosystem where knowledge,
            experience, and opportunities flow seamlessly.
          </p>
        </div>

        {/* FIXED IMAGE USAGE */}
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
          alt="Alumni Meeting"
        />
      </section>

      <section className="mission-vision">
        <div className="box">
          <i className="icon">🎯</i>
          <h3>Our Vision</h3>
          <p>
            To create a global alumni ecosystem that fosters innovation,
            leadership, and collaborative success.
          </p>
        </div>

        <div className="box">
          <i className="icon">🚀</i>
          <h3>Our Mission</h3>
          <p>
            To empower alumni through networking, mentorship,
            professional development, and community engagement.
          </p>
        </div>
      </section>

      <section className="extra-section">
        <div className="extra-box">
          <h3>Global Alumni Network</h3>
          <p>We connect alumni across 25+ countries.</p>
        </div>

        <div className="extra-box">
          <h3>Career Development</h3>
          <p>Job referrals, leadership programs, and mentorship.</p>
        </div>
      </section>

    </div>
  );
}

export default About;