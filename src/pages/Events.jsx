import React, { useRef } from "react";
import "./Events.css";

function Events() {

  const detailRef = useRef(null);

  const scrollToDetails = () => {
    detailRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="events-page">
      <h1>Upcoming Alumni Events</h1>

      <div className="events-grid">
        {[1,2,3,4,5,6].map((e) => (
          <div className="event-card" key={e}>
            <h3>Alumni Networking Meet {e}</h3>
            <p>Join us for meaningful conversations and collaboration opportunities.</p>
            <button onClick={scrollToDetails}>Read More</button>
          </div>
        ))}
      </div>

      <section className="event-details" ref={detailRef}>
        <img src="" alt="Event" />
        <div>
          <h2>Alumni Leadership Summit 2025</h2>
          <p>
            The Alumni Leadership Summit 2025 is our flagship annual event
            bringing together industry leaders, entrepreneurs, and innovators.
            This summit will focus on leadership transformation,
            emerging technologies, and global networking.
            Participants will gain insights from keynote speakers,
            attend interactive workshops, and expand their professional circle.
            The event will also include panel discussions,
            startup showcases, and mentorship sessions.
            It is designed to inspire collaboration and empower alumni success.
            This is a must-attend event for aspiring leaders.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Events;