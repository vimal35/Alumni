import { useState, useRef, useEffect } from "react";
import "./Blog.css";

/* ── Data ── */
const featuredEvent = {
  id: 1,
  tag: "Flagship Event",
  title: "Alumni Grand Meet 2024",
  subtitle: "A Celebration of Legacy & Future",
  date: "15 June 2024",
  location: "Premium Venue, Bengaluru",
  format: "In-Person",
  description:
    "An exclusive evening bringing together distinguished alumni for celebration, recognition, and networking. The highlight of the event includes a prestigious alumni honor segment celebrating outstanding contributions.",
  accent: "#d92514",
  icon: "◈",
};

const events = [
  {
    id: 2,
    tag: "Innovation",
    title: "Innovation Dialogue",
    subtitle: "Technology for Sustainable Growth",
    date: "28 May 2024",
    location: "Hybrid (Online & Offline)",
    format: "Hybrid",
    description:
      "A high-level discussion featuring industry experts and successful alumni exploring how technology drives sustainability. Gain insights, exchange ideas, and connect with leaders shaping the future.",
    icon: "◎",
  },
  {
    id: 3,
    tag: "Community",
    title: "Community Connect",
    subtitle: "Beach Drive & Social Gathering",
    date: "12 May 2024",
    location: "Coastal Activity Zone",
    format: "In-Person",
    description:
      "A meaningful initiative combining environmental responsibility with alumni bonding. Participants engage in a cleanup drive followed by recreational activities and refreshments.",
    icon: "◇",
  },
  {
    id: 4,
    tag: "Social",
    title: "Alumni Leisure Night",
    subtitle: "Cinema & Networking",
    date: "20 April 2024",
    location: "Premium Multiplex",
    format: "In-Person",
    description:
      "An informal evening for alumni to unwind, reconnect, and enjoy a curated film experience together. Followed by a relaxed dinner and interactive networking session.",
    icon: "⬡",
  },
];

const pastEvents = [
  { title: "Entrepreneurship & Innovation Summit", icon: "◈" },
  { title: "Women in Leadership Networking Meet", icon: "◎" },
  { title: "Alumni Sports League – Friendly Cricket Match", icon: "◇" },
  { title: "Community Walkathon & Wellness Drive", icon: "⬡" },
];

const whyJoin = [
  { text: "Build professional connections", num: "01" },
  { text: "Reconnect with fellow alumni", num: "02" },
  { text: "Participate in community-driven initiatives", num: "03" },
  { text: "Stay updated with industry trends", num: "04" },
];

/* ── Intersection hook ── */
function useVisible(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, v] = useVisible();
  return (
    <div ref={ref} className={`reveal ${v ? "revealed" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Format badge ── */
function FormatBadge({ format }) {
  const map = { Hybrid: "hybrid", "In-Person": "inperson", Online: "online" };
  return <span className={`format-badge format-${map[format] || "inperson"}`}>{format}</span>;
}

/* ── Event Card ── */
function EventCard({ event, idx }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={idx * 100}>
      <article
        className={`event-card ${hovered ? "card-hovered" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="card-top">
          <div className="card-icon-wrap">
            <span className="card-icon">{event.icon}</span>
          </div>
          <div className="card-meta-row">
            <span className="card-tag">{event.tag}</span>
            <FormatBadge format={event.format} />
          </div>
        </div>

        <div className="card-body">
          <h3 className="card-title">{event.title}</h3>
          <p className="card-subtitle">{event.subtitle}</p>
          <p className="card-desc">{event.description}</p>
        </div>

        <div className="card-footer">
          <div className="card-detail">
            <span className="detail-icon">📅</span>
            <span>{event.date}</span>
          </div>
          <div className="card-detail">
            <span className="detail-icon">📍</span>
            <span>{event.location}</span>
          </div>
          <button className="card-btn">
            Read More <span className="btn-arr">→</span>
          </button>
        </div>

        <div className="card-number">{String(idx + 1).padStart(2, "0")}</div>
        <div className="card-glow-line" />
      </article>
    </Reveal>
  );
}

/* ── Main Page ── */
export default function Blog() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); setEmail(""); }
  };

  return (
    <div className="blog-root">
      {/* Background texture */}
      <div className="blog-bg-grid" />
      <div className="blog-bg-top-orb" />
      <div className="blog-bg-bottom-orb" />

      {/* ── HERO ── */}
      <header className="blog-hero">
        <Reveal>
          <div className="hero-badge-row">
            <span className="hero-line" />
            <span className="hero-badge">CIT Alumni · Bangalore Chapter</span>
            <span className="hero-line" />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="hero-title-block">
            <span className="hero-overline">Events &amp;</span>
            <h1 className="hero-title">
              Community<br />
              <em>Chronicles</em>
            </h1>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="hero-desc">
            Stories of connection, innovation, and celebration — curated from the heart
            of the CIT Alumni Bangalore Chapter.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="hero-stats">
            {[["4+", "Events in 2024"], ["500+", "Alumni Connected"], ["10+", "Years of Legacy"]].map(([num, label]) => (
              <div key={label} className="hero-stat">
                <span className="stat-big">{num}</span>
                <span className="stat-lbl">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </header>

      {/* ── FEATURED EVENT ── */}
      <section className="featured-section">
        <Reveal>
          <div className="section-label-row">
            <span className="section-label">Featured</span>
            <div className="label-rule" />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="featured-card">
            <div className="featured-left">
              <div className="featured-tag-row">
                <span className="featured-tag">{featuredEvent.tag}</span>
                <FormatBadge format={featuredEvent.format} />
              </div>
              <h2 className="featured-title">{featuredEvent.title}</h2>
              <p className="featured-subtitle">{featuredEvent.subtitle}</p>
              <p className="featured-desc">{featuredEvent.description}</p>
              <div className="featured-details">
                <div className="feat-detail"><span>📅</span> {featuredEvent.date}</div>
                <div className="feat-detail"><span>📍</span> {featuredEvent.location}</div>
              </div>
              <div className="featured-actions">
                <button className="btn-red">View Details <span>→</span></button>
                <button className="btn-outline">Register Interest</button>
              </div>
            </div>
            <div className="featured-right">
              <div className="featured-visual">
                <div className="visual-inner">
                  <span className="visual-icon">{featuredEvent.icon}</span>
                  <div className="visual-year">2024</div>
                  <div className="visual-rings">
                    <div className="vring vring-1" />
                    <div className="vring vring-2" />
                    <div className="vring vring-3" />
                  </div>
                </div>
              </div>
              <div className="featured-card-accent" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── UPCOMING EVENTS GRID ── */}
      <section className="events-section">
        <Reveal>
          <div className="section-label-row">
            <span className="section-label">Upcoming &amp; Recent</span>
            <div className="label-rule" />
          </div>
          <h2 className="section-title">
            More <em>Events</em>
          </h2>
        </Reveal>
        <div className="events-grid">
          {events.map((ev, i) => (
            <EventCard key={ev.id} event={ev} idx={i} />
          ))}
        </div>
      </section>

      {/* ── MEMORIES & MILESTONES ── */}
      <section className="memories-section">
        <div className="memories-inner">
          <Reveal>
            <div className="section-label-row">
              <span className="section-label light-label">Memories &amp; Milestones</span>
              <div className="label-rule light-rule" />
            </div>
            <p className="memories-sub">
              Relive the moments that brought our alumni community closer. Our past events reflect
              the spirit of collaboration, celebration, and shared success.
            </p>
          </Reveal>

          <div className="past-events-list">
            {pastEvents.map((pe, i) => (
              <Reveal key={pe.title} delay={i * 80}>
                <div className="past-event-row">
                  <div className="past-icon">{pe.icon}</div>
                  <span className="past-title">{pe.title}</span>
                  <div className="past-arrow">↗</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAY CONNECTED + WHY PARTICIPATE ── */}
      <section className="bottom-section">
        {/* Stay Connected */}
        <Reveal className="stay-card">
          <div className="stay-inner">
            <span className="stay-eyebrow">Stay Connected</span>
            <h2 className="stay-title">
              Unable to Attend?<br />
              <em>Stay in the Loop</em>
            </h2>
            <p className="stay-desc">
              Express your interest and receive updates on upcoming events tailored to your preferences.
            </p>
            <ul className="stay-perks">
              {["Get notified about similar future events", "Receive exclusive alumni invitations", "Stay engaged with community activities"].map((p) => (
                <li key={p}><span className="perk-dot" />{p}</li>
              ))}
            </ul>
            {!submitted ? (
              <form className="stay-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Notify Me →</button>
              </form>
            ) : (
              <div className="stay-success">✓ You're on the list! We'll be in touch soon.</div>
            )}
          </div>
        </Reveal>

        {/* Why Participate */}
        <Reveal delay={120} className="why-card">
          <div className="why-inner">
            <span className="why-eyebrow">Why Participate</span>
            <h2 className="why-title">
              More Than<br />
              <em>Gatherings</em>
            </h2>
            <p className="why-desc">
              Our events are opportunities to grow, connect, and give back. Be part of a thriving
              alumni network that values relationships and shared success.
            </p>
            <div className="why-list">
              {whyJoin.map((w) => (
                <div key={w.num} className="why-item">
                  <span className="why-num">{w.num}</span>
                  <span className="why-text">{w.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER STRIP ── */}
      <div className="blog-footer-strip">
        <span className="strip-dot" />
        <span>CIT Alumni · Bangalore Chapter · Events Chronicle</span>
        <span className="strip-dot" />
      </div>
    </div>
  );
}