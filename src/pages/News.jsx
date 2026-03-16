import React from "react";
import "./News.css";

function News() {
  return (
    <div className="news-page">
      <h1>Alumni News Room</h1>

      <div className="news-grid">
        <div className="news-card">
          <h3>Annual Alumni Meet 2025 Announced</h3>
          <p>Grand reunion scheduled this December with global participation.</p>
        </div>

        <div className="news-card">
          <h3>Alumni Startup Wins National Award</h3>
          <p>One of our alumni-founded startups recognized nationally.</p>
        </div>

        <div className="news-card">
          <h3>New Scholarship Program Launched</h3>
          <p>Financial support initiative for deserving students.</p>
        </div>

        <div className="news-card">
          <h3>International Alumni Chapter Opened</h3>
          <p>New chapter established in Singapore.</p>
        </div>
      </div>
    </div>
  );
}

export default News;