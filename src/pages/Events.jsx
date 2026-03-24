import React from 'react';
import './Events.css';
import { Calendar, MapPin, Monitor, Bell, Users, Lightbulb, Heart, TrendingUp } from 'lucide-react';

export default function Events() {

  const handleNotify = (e) => {
    e.preventDefault();
    alert("Thank you! You will now receive updates for all upcoming alumni events.");
    // Replace this with your actual subscription logic
  };

  return (
    <section className="events-page">
      <div className="events-container">

        {/* Page Header */}
        <div className="events-header">
          <h1>Events & Engagements</h1>
          <p className="lead-text">
            Stay connected, celebrate memories, and build meaningful networks through our curated alumni
            events.
          
            From professional meetups to social gatherings, every event is designed to strengthen the CIT alumni
            community.
          </p>
        </div>

        {/* <h2 className="section-title">Featured & Upcoming Experiences</h2> */}

        {/* Upcoming Events Grid */}
        <div className="events-grid">

          {/* Featured Main Event */}
          {/* <div className="event-card featured">
            <div className="featured-badge">FEATURED EVENT</div>
            <h3>Alumni Grand Meet 2024 – A Celebration of Legacy & Future</h3>
            
            <div className="event-meta">
              <div className="meta-item">
                <Calendar className="meta-icon" />
                <span>15 June 2024</span>
              </div>
              <div className="meta-item">
                <MapPin className="meta-icon" />
                <span>Premium Venue, Bengaluru</span>
              </div>
            </div>

            <p className="event-description">
              An exclusive evening bringing together distinguished alumni for celebration, recognition, and
              networking. The highlight of the event includes a prestigious alumni honor segment celebrating outstanding
              contributions.
            </p>
          </div> */}


          {/* Event 2 */}
          {/* <div className="event-card">
            <h3>Innovation Dialogue – Technology for Sustainable Growth</h3>
            
            <div className="event-meta">
              <div className="meta-item">
                <Calendar className="meta-icon" />
                <span>28 May 2024</span>
              </div>
              <div className="meta-item">
                <Monitor className="meta-icon" />
                <span className="hybrid-badge">Hybrid Online + Offline</span>
              </div>
            </div>

            <p className="event-description">
              A high-level discussion featuring industry experts and successful alumni exploring how technology
              drives sustainability. Gain insights, exchange ideas, and connect with leaders shaping the future.
            </p>
          </div> */}

          {/* Event 3 */}
          {/* <div className="event-card">
            <h3>🏖 Community Connect – Beach Drive & Social Gathering</h3>
            
            <div className="event-meta">
              <div className="meta-item">
                <Calendar className="meta-icon" />
                <span>12 May 2024</span>
              </div>
              <div className="meta-item">
                <MapPin className="meta-icon" />
                <span>Coastal Activity Zone</span>
              </div>
            </div>

            <p className="event-description">
              A meaningful initiative combining environmental responsibility with alumni bonding.
              Participants engage in a cleanup drive followed by recreational activities and refreshments.
            </p>
          </div> */}

          {/* Event 4 */}
          

        </div>


        {/* Past Events Section */}
        <div className="section-block">
          <h2 className="section-title">Memories & Milestones</h2>
          <p className="section-intro">
            Relive the moments that brought our alumni community closer.
            Our past events reflect the spirit of collaboration, celebration, and shared success.
          </p>

          <div className="past-events-grid">
            <div className="past-event-tag">Entrepreneurship & Innovation Summit</div>
            <div className="past-event-tag">Women in Leadership Networking Meet</div>
            <div className="past-event-tag">Alumni Sports League - Cricket Match</div>
            <div className="past-event-tag">Community Walkathon & Wellness Drive</div>
          </div>
        </div>


        {/* Stay Connected CTA Block */}
        <div className="cta-block">
          <div className="cta-content">
            <h3>Stay Connected</h3>
            <p>
              Unable to attend an event? You can still be part of the experience.
              Express your interest and receive updates on upcoming events tailored to your preferences.
            </p>

            <ul className="cta-benefits-list">
              <li>✅ Get notified about similar future events</li>
              <li>✅ Receive exclusive alumni invitations</li>
              <li>✅ Stay engaged with community activities</li>
            </ul>

            <button className="cta-button" onClick={handleNotify}>
              <Bell size={18} />
              Subscribe For Event Updates
            </button>
          </div>
        </div>


        {/* Why Participate Section */}
        <div className="section-block">
          <h2 className="section-title">Why Participate?</h2>
          <p className="section-intro">
            Our events are more than gatherings—they are opportunities to grow, connect, and give back.
            Be part of a thriving alumni network that values relationships and shared success.
          </p>

          <div className="benefits-grid">
            <div className="benefit-card">
              <TrendingUp className="benefit-icon" />
              <h4>Build Professional Connections</h4>
            </div>

            <div className="benefit-card">
              <Users className="benefit-icon" />
              <h4>Reconnect With Fellow Alumni</h4>
            </div>

            <div className="benefit-card">
              <Heart className="benefit-icon" />
              <h4>Community Driven Initiatives</h4>
            </div>

            <div className="benefit-card">
              <Lightbulb className="benefit-icon" />
              <h4>Stay Updated With Industry Trends</h4>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}