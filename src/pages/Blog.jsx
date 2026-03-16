import React from "react";
import "./Blog.css";

function Blog() {
  return (
    <div className="blog-page">
      <h1>Alumni Insights & Stories</h1>

      {/* BLOG 1 */}
      <div className="blog-card">
        <img
          src=""
          alt="Leadership"
        />

        <div className="blog-content">
          <h2>From Campus to Corporate Leadership</h2>

          <p>
            Success does not happen overnight. The journey from a college
            classroom to a corporate boardroom is built on dedication,
            resilience, and continuous learning. Many of our alumni began their
            careers with uncertainty but carried forward the confidence built
            during their academic years.
          </p>

          <p>
            During their time on campus, they developed leadership skills,
            teamwork capabilities, and communication confidence. These
            experiences later shaped their professional growth.
          </p>

          <p>
            Our alumni consistently emphasize how networking within the alumni
            ecosystem helped accelerate their careers. Connections opened doors
            to mentorship, career opportunities, and business collaborations.
          </p>

          <ul>
            <li>Building professional confidence from early exposure</li>
            <li>Developing problem-solving through real projects</li>
            <li>Maintaining strong alumni networking relationships</li>
            <li>Learning adaptability in a changing global market</li>
            <li>Embracing continuous upskilling</li>
          </ul>

          <p>
            Today, our alumni lead multinational companies, innovative
            startups, and global initiatives. Their journey inspires current
            students to dream bigger and act boldly. The alumni network plays a
            crucial role in keeping this inspiration alive.
          </p>

          <p>
            The power of alumni unity transforms individual growth into
            collective success.
          </p>
        </div>
      </div>

      {/* BLOG 2 */}
      <div className="blog-card reverse">
        <img
          src=""
          alt="Innovation"
        />

        <div className="blog-content">
          <h2>Innovation, Entrepreneurship & Alumni Impact</h2>

          <p>
            Entrepreneurship is about solving problems creatively. Many of our
            alumni ventured into startups immediately after graduation.
          </p>

          <p>
            They utilized campus resources, faculty mentorship, and alumni
            funding support to launch their ventures successfully.
          </p>

          <p>
            The Alumni Association actively promotes innovation through events,
            incubation programs, and networking meets. These platforms provide
            real-world exposure and growth opportunities.
          </p>

          <ul>
            <li>Startup mentorship sessions</li>
            <li>Investor networking opportunities</li>
            <li>Alumni-funded innovation grants</li>
            <li>Workshops on business scaling</li>
            <li>Technology-driven innovation challenges</li>
          </ul>

          <p>
            Today, alumni-led startups are generating employment,
            contributing to economic growth, and strengthening the alumni
            brand globally.
          </p>

          <p>
            Innovation remains the heartbeat of our alumni ecosystem.
            Together, we create impact beyond boundaries.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Blog;