import { useEffect, useRef, useState } from "react";
import "./About.css";

/* ── useInView hook ─────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── SVG Icons ──────────────────────────────────────────────────────────── */
const IconConnect = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="24" r="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="38" cy="10" r="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="38" cy="38" r="5" stroke="currentColor" strokeWidth="2"/>
    <line x1="15" y1="22" x2="33" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="15" y1="26" x2="33" y2="35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconGrow = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polyline points="8,36 18,24 26,30 38,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="30,12 38,12 38,20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="8" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconGiveBack = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40s-16-10-16-22a8 8 0 0 1 16 0 8 8 0 0 1 16 0c0 12-16 22-16 22z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconCelebrate = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 38 L20 18 L30 28 L38 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="36" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 42 Q18 32 28 38 Q36 44 44 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);
const IconVision = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="24" rx="16" ry="9" stroke="currentColor" strokeWidth="2"/>
    <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2"/>
    <line x1="24" y1="8" x2="24" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="44" x2="24" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconMission = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2"/>
    <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
    <circle cx="24" cy="24" r="2" fill="currentColor"/>
    <line x1="24" y1="8" x2="24" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconLeadership = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="14" r="6" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 38c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="20" x2="24" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="18" y1="24" x2="30" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

/* ── Pillar data ────────────────────────────────────────────────────────── */
const pillars = [
  {
    icon: <IconConnect />,
    word: "Connect",
    color: "#C9A84C",
    desc: "Alumni meets, reunions, and digital engagement platforms that bring CITians together.",
  },
  {
    icon: <IconGrow />,
    word: "Grow",
    color: "#4C9AC9",
    desc: "Skill development sessions, mentorship programs, and knowledge-sharing initiatives.",
  },
  {
    icon: <IconGiveBack />,
    word: "Give Back",
    color: "#C94C6E",
    desc: "Scholarships, student support, and meaningful social impact initiatives for the community.",
  },
  {
    icon: <IconCelebrate />,
    word: "Celebrate",
    color: "#4CC97A",
    desc: "Cultural events, achievement recognition, and legacy preservation across generations.",
  },
];

/* ── Mission points ─────────────────────────────────────────────────────── */
const missionPoints = [
  "Strengthening lifelong connections among CIT alumni",
  "Encouraging professional collaboration and mentorship",
  "Organizing meaningful events and networking opportunities",
  "Supporting students and young graduates with guidance",
  "Promoting the values, culture, and legacy of CIT",
];

/* ── EC Responsibilities ─────────────────────────────────────────────────── */
const ecTasks = [
  "Planning and organizing alumni events and meetups",
  "Managing communication channels and digital platforms",
  "Expanding and strengthening the alumni network",
  "Supporting student initiatives and career development programs",
];

/* ── Community traits ───────────────────────────────────────────────────── */
const communityTraits = [
  { label: "Reconnect", desc: "with lifelong friends" },
  { label: "Network", desc: "build valuable professional connections" },
  { label: "Collaborate", desc: "and grow together" },
  { label: "Contribute", desc: "to shaping the community's future" },
];

/* ══════════════════════════════════════════════════════════════════════════ */
export default function About() {
  const [heroRef, heroVisible] = useInView(0.05);
  const [storyRef, storyVisible] = useInView(0.1);
  const [vmRef, vmVisible] = useInView(0.1);
  const [pillarsRef, pillarsVisible] = useInView(0.1);
  const [leaderRef, leaderVisible] = useInView(0.1);
  const [govRef, govVisible] = useInView(0.1);
  const [cultureRef, cultureVisible] = useInView(0.1);
  const [joinRef, joinVisible] = useInView(0.1);

  return (
    <div className="about-page">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="ab-hero" ref={heroRef}>
        <div className="ab-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80"
            alt="CIT Campus"
            className="ab-hero__img"
          />
          <div className="ab-hero__overlay" />
          <div className="ab-hero__grain" />
        </div>

        <div className={`ab-hero__content ${heroVisible ? "av-in" : "av-pre"}`}>
          <span className="ab-eyebrow">Bangalore Chapter</span>
          <h1 className="ab-hero__title">
            About <em>CIT Alumni</em>
          </h1>
          <p className="ab-hero__sub">
            A dynamic and ever-growing community of graduates continuing to carry
            forward the values, friendships, and legacy built during their time at CIT.
          </p>
          <div className="ab-hero__line" />
        </div>

        <div className="ab-hero__scroll">
          <span>Scroll</span>
          <div className="ab-hero__scroll-bar" />
        </div>
      </section>

      {/* ── INTRO STRIP ───────────────────────────────────────────────── */}
      <div className="ab-strip">
        <div className="ab-strip__inner">
          {["1954 · Founded", "1000+ Alumni", "Bangalore Chapter", "70+ Years Legacy"].map((t, i) => (
            <div className="ab-strip__item" key={i}>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── OUR STORY ─────────────────────────────────────────────────── */}
      <section className="ab-story ab-section" ref={storyRef}>
        <div className={`ab-container ${storyVisible ? "av-in" : "av-pre"}`}>
          <div className="ab-story__grid">
            <div className="ab-story__visual">
              <div className="ab-story__img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&q=80"
                  alt="Our Story"
                  className="ab-story__img"
                />
                <div className="ab-story__img-deco" />
              </div>
              <div className="ab-story__float-card">
                <span className="ab-story__float-num">Est.</span>
                <span className="ab-story__float-year">1954</span>
                <span className="ab-story__float-label">CIT Legacy Begins</span>
              </div>
            </div>

            <div className="ab-story__text">
              <span className="ab-eyebrow ab-eyebrow--dark">Our Story</span>
              <h2 className="ab-section-title">From Hallowed Halls<br />to Boardrooms</h2>
              <div className="ab-divider" />
              <p className="ab-body">
                From the hallowed halls of CIT to boardrooms across the globe, our journey
                reflects shared memories, collective ambition, and lifelong camaraderie.
              </p>
              <p className="ab-body">
                The Bangalore Chapter was born from a simple idea — to extend the CIT
                experience beyond campus life and build a strong alumni ecosystem that
                thrives on connection and collaboration.
              </p>
              <p className="ab-body">
                Our purpose is simple yet impactful — to keep the CIT spirit alive while
                creating opportunities for alumni to connect, grow, and give back to society.
              </p>
              <div className="ab-story__tags">
                {["Connection", "Legacy", "Growth", "Community"].map((t) => (
                  <span key={t} className="ab-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ──────────────────────────────────────────── */}
      <section className="ab-vm ab-section" ref={vmRef}>
        <div className="ab-vm__bg-deco" />
        <div className={`ab-container ${vmVisible ? "av-in" : "av-pre"}`}>
          <div className="ab-vm__grid">

            {/* Vision */}
            <div className="ab-vm-card ab-vm-card--vision">
              <div className="ab-vm-card__icon-wrap">
                <IconVision />
              </div>
              <span className="ab-eyebrow ab-eyebrow--gold">Our Vision</span>
              <h3 className="ab-vm-card__title">A Globally Connected Network</h3>
              <p className="ab-vm-card__body">
                To build a strong, inclusive, and globally connected alumni network that
                unites CITians across generations, industries, and geographies — creating
                a lasting impact for individuals and the community.
              </p>
              <div className="ab-vm-card__deco-line" />
            </div>

            {/* Mission */}
            <div className="ab-vm-card ab-vm-card--mission">
              <div className="ab-vm-card__icon-wrap">
                <IconMission />
              </div>
              <span className="ab-eyebrow ab-eyebrow--gold">Our Mission</span>
              <h3 className="ab-vm-card__title">A Thriving Alumni Ecosystem</h3>
              <ul className="ab-mission-list">
                {missionPoints.map((pt, i) => (
                  <li key={i} className="ab-mission-list__item">
                    <span className="ab-mission-list__dot" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="ab-vm-card__deco-line" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ───────────────────────────────────────────────────── */}
      <section className="ab-pillars ab-section" ref={pillarsRef}>
        <div className={`ab-container ${pillarsVisible ? "av-in" : "av-pre"}`}>
          <div className="ab-section-header">
            <span className="ab-eyebrow ab-eyebrow--dark">Core Framework</span>
            <h2 className="ab-section-title">Our Four Pillars</h2>
            <p className="ab-section-sub">
              Every initiative we build rests on four pillars that define our purpose and direction.
            </p>
          </div>
          <div className="ab-pillars__grid">
            {pillars.map((p, i) => (
              <div
                className="ab-pillar-card"
                key={i}
                style={{ "--pillar-color": p.color, animationDelay: `${i * 0.12}s` }}
              >
                <div className="ab-pillar-card__num">0{i + 1}</div>
                <div className="ab-pillar-card__icon">{p.icon}</div>
                <h3 className="ab-pillar-card__word">{p.word}</h3>
                <p className="ab-pillar-card__desc">{p.desc}</p>
                <div className="ab-pillar-card__bar" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ────────────────────────────────────────────────── */}
      <section className="ab-leadership ab-section" ref={leaderRef}>
        <div className={`ab-container ${leaderVisible ? "av-in" : "av-pre"}`}>
          <div className="ab-leadership__grid">
            <div className="ab-leadership__text">
              <span className="ab-eyebrow ab-eyebrow--gold">Governance</span>
              <h2 className="ab-section-title ab-section-title--light">Our Leadership</h2>
              <div className="ab-divider ab-divider--gold" />
              <p className="ab-body ab-body--light">
                The Bangalore Chapter operates as a registered alumni association led by
                a dedicated Executive Committee (EC) that ensures smooth operations,
                strategic growth, and continuous engagement within the alumni network.
              </p>
              <p className="ab-body ab-body--light">
                Executive Committee members serve a <strong>two-year term</strong>, ensuring
                fresh leadership, innovative ideas, and progressive growth.
              </p>
            </div>

            <div className="ab-leadership__cards">
              <div className="ab-leadership__card-label">
                <IconLeadership />
                <span>Key Responsibilities</span>
              </div>
              <div className="ab-ec-list">
                {ecTasks.map((t, i) => (
                  <div className="ab-ec-item" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                    <span className="ab-ec-item__index">{String(i + 1).padStart(2, "0")}</span>
                    <span className="ab-ec-item__text">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GOVERNANCE ────────────────────────────────────────────────── */}
      <section className="ab-gov ab-section" ref={govRef}>
        <div className={`ab-container ${govVisible ? "av-in" : "av-pre"}`}>
          <div className="ab-gov__inner">
            <div className="ab-gov__header">
              <span className="ab-eyebrow ab-eyebrow--dark">Structure</span>
              <h2 className="ab-section-title">Governance & Structure</h2>
              <p className="ab-section-sub">
                We function as a structured and professionally managed alumni body,
                ensuring transparency and accountability in all activities.
              </p>
            </div>
            <div className="ab-gov__cards">
              {[
                { title: "Strategic Planning", desc: "Designing and executing long-term initiatives that align with alumni aspirations and community needs.", icon: "📐" },
                { title: "Financial Management", desc: "Maintaining full accountability and transparency in all financial operations and resource allocation.", icon: "📊" },
                { title: "Alumni Alignment", desc: "Continuously aligning programs and initiatives with the evolving expectations and goals of the alumni community.", icon: "🎯" },
              ].map((g, i) => (
                <div className="ab-gov-card" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                  <span className="ab-gov-card__icon">{g.icon}</span>
                  <h4 className="ab-gov-card__title">{g.title}</h4>
                  <p className="ab-gov-card__desc">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY CULTURE ─────────────────────────────────────────── */}
      <section className="ab-culture ab-section" ref={cultureRef}>
        <div className={`ab-container ${cultureVisible ? "av-in" : "av-pre"}`}>
          <div className="ab-culture__grid">
            <div className="ab-culture__visual">
              <div className="ab-culture__img-stack">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
                  alt="Community Culture"
                  className="ab-culture__img ab-culture__img--back"
                />
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80"
                  alt="Alumni Together"
                  className="ab-culture__img ab-culture__img--front"
                />
              </div>
            </div>
            <div className="ab-culture__text">
              <span className="ab-eyebrow ab-eyebrow--dark">Our Culture</span>
              <h2 className="ab-section-title">Community That Defines Us</h2>
              <div className="ab-divider" />
              <p className="ab-body">
                What truly defines the CIT Alumni Bangalore Chapter is its strong sense of
                belonging and shared identity. From informal meetups to large-scale alumni
                gatherings, every interaction reflects the bond that began at CIT.
              </p>
              <div className="ab-culture__traits">
                {communityTraits.map((tr, i) => (
                  <div className="ab-trait" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                    <span className="ab-trait__label">{tr.label}</span>
                    <span className="ab-trait__desc">{tr.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ──────────────────────────────────────────────────── */}
      <section className="ab-join ab-section" ref={joinRef}>
        <div className="ab-join__bg">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80"
            alt="Join CIT Alumni"
            className="ab-join__bg-img"
          />
          <div className="ab-join__overlay" />
        </div>
        <div className={`ab-container ab-join__content ${joinVisible ? "av-in" : "av-pre"}`}>
          <span className="ab-eyebrow">Join Our Journey</span>
          <h2 className="ab-join__title">
            Be Part of This Legacy
          </h2>
          <p className="ab-join__sub">
            Whether you graduated decades ago or recently — you are an integral part of
            this legacy. The CIT Alumni Bangalore Chapter welcomes every CITian to be a
            part of this journey of connection, growth, and contribution.
          </p>
          <p className="ab-join__tagline">
            Let's continue building this legacy — <em>together.</em>
          </p>
          <div className="ab-join__actions">
            <a href="/alumni-register" className="ab-btn ab-btn--primary">Join the Chapter</a>
            <a href="/contact" className="ab-btn ab-btn--outline">Get in Touch</a>
          </div>
        </div>
      </section>

    </div>
  );
}