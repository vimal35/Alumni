import React from "react";
import "./Pages.css";

function Gallery() {
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-title">
          <h1>Gallery</h1>
          <p>Memories from our alumni events and celebrations.</p>
        </div>

        <div className="section-grid">
          <div className="card-box">
            <h3>Reunion 2024</h3>
            <p>Snapshots from our most memorable reunion event.</p>
          </div>

          <div className="card-box">
            <h3>Community Outreach</h3>
            <p>Alumni volunteering activities and social impact programs.</p>
          </div>

          <div className="card-box">
            <h3>Webinars & Workshops</h3>
            <p>Professional development sessions conducted online.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;