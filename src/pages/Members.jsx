import { useEffect, useRef, useState } from "react";
import "./Members.css";

const benefits = [
  {
    icon: "⬡",
    title: "Professional Networking",
    points: [
      "Connect with accomplished alumni across industries",
      "Build valuable long-term professional relationships",
    ],
  },
  {
    icon: "◈",
    title: "Exclusive Events",
    points: [
      "Access alumni-only meetups, seminars, and networking sessions",
      "Participate in special chapter programs and celebrations",
    ],
  },
  {
    icon: "◎",
    title: "Mentorship Opportunities",
    points: [
      "Gain guidance from experienced alumni leaders",
      "Support and mentor the next generation of graduates",
    ],
  },
  {
    icon: "◇",
    title: "Community Participation",
    points: [
      "Engage in alumni initiatives and social impact activities",
      "Contribute to student development and institutional growth",
    ],
  },
];

const executives = [
  {
    role: "Secretary",
    name: "Mr. Jawahar Harinarayanan",
    phone: "+91 99021 36606",
    email: "Jawahar_h@hotmail.com",
    initials: "JH",
    color: "#c8a96e",
  },
  {
    role: "Joint Secretary",
    name: "Mr. Jayashankar Narayanankutty",
    phone: "+91 98807 31803",
    email: null,
    initials: "JN",
    color: "#8eb4c8",
  },
  {
    role: "Treasurer",
    name: "Mrs. Shankari Arrun Ravi",
    phone: "+91 99448 40808",
    email: "shankari.cbe@gmail.com",
    initials: "SA",
    color: "#c88eb4",
  },
  {
    role: "Executive Member",
    name: "Mr. Vinothkumar Rajendran",
    phone: "8971876876",
    email: "rvinoth83@gmail.com",
    initials: "VR",
    color: "#8ec8a9",
  },
];

const execMembers = [
  { name: "Mr. Sukumaran", initials: "SK" },
  { name: "Mr. T. Maran", initials: "TM" },
  { name: "Mrs. Ramya Rajaraman", initials: "RR" },
  { name: "Mr. Ragul Thirugnanasambandamoorthi", initials: "RT" },
  { name: "Miss. Kalaivani Kalimuthu", initials: "KK" },
];

function useIntersection(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, visible] = useIntersection();
  return (
    <div
      ref={ref}
      className={`anim-section ${visible ? "anim-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Members() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="members-root">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-grid" />

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-badge">
          <span className="badge-dot" />
          Bangalore Chapter
        </div>
        <h1 className="hero-title">
          <span className="hero-title-line">CIT Alumni</span>
          <span className="hero-title-line accent-line">Members</span>
        </h1>
        <p className="hero-sub">
          The true strength of the CIT Alumni Bangalore Chapter lies in its
          vibrant and accomplished members.
        </p>
        <p className="hero-desc">
          Our alumni community represents a powerful network of professionals
          contributing across industries worldwide. From innovation-driven
          entrepreneurs to respected academicians, our members continue to
          uphold the legacy of CIT with excellence and impact.
        </p>
        <div className="hero-stats">
          <div className="stat-pill">
            <span className="stat-num">500+</span>
            <span className="stat-label">Members</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-pill">
            <span className="stat-num">20+</span>
            <span className="stat-label">Industries</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-pill">
            <span className="stat-num">10+</span>
            <span className="stat-label">Years Strong</span>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll to Explore</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* BENEFITS */}
      <section className="benefits-section">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag">Why Join Us</span>
            <h2 className="section-title">Member Benefits</h2>
            <p className="section-sub">
              Being part of the CIT Alumni Bangalore Chapter offers meaningful
              opportunities for both personal and professional growth.
            </p>
          </div>
        </AnimatedSection>

        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <AnimatedSection key={b.title} delay={i * 100}>
              <div
                className={`benefit-card ${
                  activeCard === i ? "benefit-active" : ""
                }`}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="benefit-glow" />
                <div className="benefit-icon">{b.icon}</div>
                <h3 className="benefit-title">{b.title}</h3>
                <ul className="benefit-list">
                  {b.points.map((pt) => (
                    <li key={pt}>
                      <span className="list-bullet">›</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="card-corner card-corner-tl" />
                <div className="card-corner card-corner-br" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="leadership-section">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-tag">Chapter Leadership</span>
            <h2 className="section-title">Executive Committee</h2>
            <p className="section-sub">
              Dedicated leaders steering the vision and activities of the
              Bangalore Chapter.
            </p>
          </div>
        </AnimatedSection>

        <div className="exec-grid">
          {executives.map((ex, i) => (
            <AnimatedSection key={ex.name} delay={i * 120}>
              <div className="exec-card">
                <div
                  className="exec-avatar"
                  style={{ "--avatar-color": ex.color }}
                >
                  <span>{ex.initials}</span>
                  <div className="avatar-ring" />
                </div>
                <div className="exec-role">{ex.role}</div>
                <h3 className="exec-name">{ex.name}</h3>
                <div className="exec-contacts">
                  <a
                    href={`tel:${ex.phone}`}
                    className="contact-chip phone-chip"
                  >
                    <span className="contact-icon">📞</span>
                    {ex.phone}
                  </a>
                  {ex.email && (
                    <a
                      href={`mailto:${ex.email}`}
                      className="contact-chip email-chip"
                    >
                      <span className="contact-icon">✉</span>
                      {ex.email}
                    </a>
                  )}
                </div>
                <div className="exec-shine" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200}>
          <div className="exec-members-block">
            <h3 className="exec-members-title">
              <span className="title-line" />
              Executive Members
              <span className="title-line" />
            </h3>
            <div className="exec-members-grid">
              {execMembers.map((m, i) => (
                <div
                  className="exec-member-chip"
                  key={m.name}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="chip-avatar">{m.initials}</div>
                  <span>{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <AnimatedSection>
          <div className="cta-inner">
            <div className="cta-glow-left" />
            <div className="cta-glow-right" />
            <span className="cta-eyebrow">Join the Alumni Network</span>
            <h2 className="cta-title">Be Part of Something Bigger</h2>
            <p className="cta-desc">
              The CIT Alumni Bangalore Chapter is more than a network — it's a
              lifelong community. Reconnect, collaborate, and grow with fellow
              alumni who share your journey and vision. Together, we carry
              forward the legacy that began at CIT.
            </p>
            <div className="cta-actions">
              <button className="btn-primary">
                <span>Join Now</span>
                <span className="btn-arrow">→</span>
              </button>
              <button className="btn-secondary">Learn More</button>
            </div>
            <p className="cta-tagline">
              If you are a proud CIT graduate, we welcome you to reconnect and
              grow with your alumni community.
            </p>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}