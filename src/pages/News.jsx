import { useEffect, useRef, useState } from "react";
import "./News.css";

/* ── useInView ──────────────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
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

/* ── Data ───────────────────────────────────────────────────────────────── */
const headlines = [
  {
    id: 1,
    date: "March 2024",
    tag: "Partnership",
    tagColor: "blue",
    title: "CIT Alumni Announces Partnership with Bangalore Tech Parks",
    desc: "Unlocking exclusive workspace access and innovation grants to support alumni-led startups and entrepreneurial growth.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80",
    featured: true,
  },
  {
    id: 2,
    date: "February 2024",
    tag: "Governance",
    tagColor: "gold",
    title: "Annual General Meeting 2024: Key Resolutions Passed",
    desc: "Introduction of a new Executive Committee, approval of the annual budget, and unveiling of a forward-looking 5-year strategic roadmap.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80",
    featured: false,
  },
  {
    id: 3,
    date: "January 2024",
    tag: "Scholarship",
    tagColor: "red",
    title: "Alumni Scholarship Fund Crosses ₹50 Lakhs",
    desc: "Empowering 12 deserving CIT students with full tuition support, reinforcing our commitment to academic excellence.",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&q=80",
    featured: false,
  },
  {
    id: 4,
    date: "December 2023",
    tag: "Recognition",
    tagColor: "gold",
    title: "CITians Shine at National Innovation Awards",
    desc: "Three alumni-led ventures recognized at the national level by the Government of India for innovation and impact.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80",
    featured: false,
  },
];

const pressItems = [
  {
    icon: "📄",
    title: "Annual Report 2023–24",
    desc: "Comprehensive overview of the chapter's activities, financials, and milestones.",
    cta: "Download PDF",
  },
  {
    icon: "🎨",
    title: "Media Kit",
    desc: "Official brand assets, logos, and communication guidelines for media and partners.",
    cta: "Access Kit",
  },
  {
    icon: "🤝",
    title: "Corporate Partnership Proposal",
    desc: "Detailed framework for organizations looking to collaborate with CIT Alumni initiatives.",
    cta: "View Proposal",
  },
];

const mediaItems = [
  {
    outlet: "The Hindu",
    quote: "How Alumni Networks Are Shaping Bangalore's Professional Landscape",
    logo: "TH",
    color: "#da2615",
  },
  {
    outlet: "Times of India",
    quote: "CIT Alumni's Walkathon Draws 500+ Participants",
    logo: "TOI",
    color: "#f0a736",
  },
  {
    outlet: "YourStory",
    quote: "The Rise of Tight-Knit Alumni Entrepreneurship Ecosystems",
    logo: "YS",
    color: "#000f2c",
  },
];

const categories = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "Chapter Announcements",
    desc: "Key updates on alumni meetings, executive decisions, and strategic initiatives shaping the chapter.",
    count: "24 Articles",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        <path d="M16 3.5l1.5 1.5-1.5 1.5"/>
        <path d="M19 6H21"/>
      </svg>
    ),
    title: "Alumni Achievements",
    desc: "Celebrating CITians who are excelling across industries and making a meaningful impact globally.",
    count: "38 Articles",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Community Initiatives",
    desc: "Highlights of social responsibility programs, outreach activities, and collaborative alumni efforts.",
    count: "19 Articles",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 8h10M7 12h6"/>
      </svg>
    ),
    title: "Campus Collaborations",
    desc: "Updates on partnerships between alumni and CIT that support student development and institutional growth.",
    count: "15 Articles",
  },
];

const subscribePerks = [
  "Latest announcements",
  "Alumni success stories",
  "Upcoming events & opportunities",
];

/* ══════════════════════════════════════════════════════════════════════════ */
export default function News() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const [heroRef, heroVisible]         = useInView(0.05);
  const [headlinesRef, hlVisible]      = useInView(0.08);
  const [pressRef, pressVisible]       = useInView(0.1);
  const [mediaRef, mediaVisible]       = useInView(0.1);
  const [catRef, catVisible]           = useInView(0.1);
  const [subRef, subVisible]           = useInView(0.1);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(""); }
  };

  const filters = ["All", "Partnership", "Governance", "Scholarship", "Recognition"];
  const filtered = activeFilter === "All"
    ? headlines
    : headlines.filter(h => h.tag === activeFilter);

  return (
    <div className="news-page">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="ns-hero" ref={heroRef}>
        <div className="ns-hero__bg">
          <div className="ns-hero__grid-lines" />
          <div className="ns-hero__glow ns-hero__glow--1" />
          <div className="ns-hero__glow ns-hero__glow--2" />
        </div>
        <div className={`ns-container ns-hero__content ${heroVisible ? "ns-in" : "ns-pre"}`}>
          <div className="ns-hero__left">
            <div className="ns-hero__live-badge">
              <span className="ns-live-dot" />
              <span>Live Updates</span>
            </div>
            <h1 className="ns-hero__title">
              CIT Alumni<br />
              <em>Newsroom</em>
            </h1>
            <p className="ns-hero__sub">
              Stay connected with the pulse of the CIT Alumni Bangalore Chapter.
              The latest announcements, achievements, and initiatives — all in one place.
            </p>
            <div className="ns-hero__stats">
              {[["50+", "News Stories"], ["12K+", "Monthly Readers"], ["2024", "Latest Year"]].map(([n, l]) => (
                <div className="ns-hero__stat" key={l}>
                  <span className="ns-hero__stat-num">{n}</span>
                  <span className="ns-hero__stat-label">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ns-hero__right">
            <div className="ns-hero__ticker-card">
              <div className="ns-ticker-header">
                <span className="ns-ticker-label">Breaking</span>
                <span className="ns-ticker-date">2024</span>
              </div>
              <div className="ns-ticker-body">
                <div className="ns-ticker-item ns-ticker-item--active">
                  <span className="ns-ticker-tag">New</span>
                  <p>Partnership with Bangalore Tech Parks announced</p>
                </div>
                <div className="ns-ticker-item">
                  <span className="ns-ticker-tag ns-ticker-tag--gold">Fund</span>
                  <p>Scholarship fund crosses ₹50 Lakhs milestone</p>
                </div>
                <div className="ns-ticker-item">
                  <span className="ns-ticker-tag ns-ticker-tag--blue">Award</span>
                  <p>3 alumni ventures win National Innovation Awards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ns-hero__scroll-line" />
      </section>

      {/* ── HEADLINES ─────────────────────────────────────────────────── */}
      <section className="ns-headlines ns-section" ref={headlinesRef}>
        <div className="ns-container">
          <div className={`ns-section-header ${hlVisible ? "ns-in" : "ns-pre"}`}>
            <span className="ns-eyebrow">Latest Headlines</span>
            <h2 className="ns-section-title">Most Recent Highlights</h2>
            <p className="ns-section-sub">
              Explore the most recent highlights and key developments from our alumni network.
            </p>
          </div>

          {/* Filter Bar */}
          <div className={`ns-filter-bar ${hlVisible ? "ns-in" : "ns-pre"}`} style={{ animationDelay: "0.15s" }}>
            {filters.map(f => (
              <button
                key={f}
                className={`ns-filter-btn ${activeFilter === f ? "ns-filter-btn--active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Featured + Grid */}
          <div className={`ns-headlines__layout ${hlVisible ? "ns-in" : "ns-pre"}`} style={{ animationDelay: "0.25s" }}>
            {/* Featured Card */}
            {filtered.filter(h => h.featured).map(item => (
              <div className="ns-featured-card" key={item.id}>
                <div className="ns-featured-card__img-wrap">
                  <img src={item.img} alt={item.title} className="ns-featured-card__img" />
                  <div className="ns-featured-card__overlay" />
                  <span className={`ns-tag ns-tag--${item.tagColor}`}>{item.tag}</span>
                </div>
                <div className="ns-featured-card__body">
                  <span className="ns-date">{item.date}</span>
                  <h3 className="ns-featured-card__title">{item.title}</h3>
                  <p className="ns-featured-card__desc">{item.desc}</p>
                  <button className="ns-read-more">
                    Read Full Story
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* Side Cards */}
            <div className="ns-side-cards">
              {filtered.filter(h => !h.featured).map((item, i) => (
                <div className="ns-news-card" key={item.id} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="ns-news-card__img-wrap">
                    <img src={item.img} alt={item.title} className="ns-news-card__img" />
                    <span className={`ns-tag ns-tag--${item.tagColor}`}>{item.tag}</span>
                  </div>
                  <div className="ns-news-card__body">
                    <span className="ns-date">{item.date}</span>
                    <h4 className="ns-news-card__title">{item.title}</h4>
                    <p className="ns-news-card__desc">{item.desc}</p>
                    <button className="ns-read-more ns-read-more--sm">
                      Read More
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="ns-empty">No articles found for "{activeFilter}".</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRESS RELEASES ────────────────────────────────────────────── */}
      <section className="ns-press ns-section" ref={pressRef}>
        <div className="ns-container">
          <div className={`ns-section-header ${pressVisible ? "ns-in" : "ns-pre"}`}>
            <span className="ns-eyebrow ns-eyebrow--light">Official Documents</span>
            <h2 className="ns-section-title ns-section-title--light">Press Releases & Resources</h2>
            <p className="ns-section-sub ns-section-sub--light">
              Official documents, reports, and collaboration materials for transparency and partnerships.
            </p>
          </div>
          <div className={`ns-press__grid ${pressVisible ? "ns-in" : "ns-pre"}`} style={{ animationDelay: "0.2s" }}>
            {pressItems.map((p, i) => (
              <div className="ns-press-card" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="ns-press-card__icon">{p.icon}</div>
                <div className="ns-press-card__corner" />
                <h3 className="ns-press-card__title">{p.title}</h3>
                <p className="ns-press-card__desc">{p.desc}</p>
                <button className="ns-press-card__btn">
                  {p.cta}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IN THE MEDIA ──────────────────────────────────────────────── */}
      <section className="ns-media ns-section" ref={mediaRef}>
        <div className="ns-container">
          <div className={`ns-section-header ${mediaVisible ? "ns-in" : "ns-pre"}`}>
            <span className="ns-eyebrow">Media Coverage</span>
            <h2 className="ns-section-title">In the Media</h2>
            <p className="ns-section-sub">
              CIT Alumni Bangalore continues to gain recognition across leading media platforms.
            </p>
          </div>
          <div className={`ns-media__grid ${mediaVisible ? "ns-in" : "ns-pre"}`} style={{ animationDelay: "0.2s" }}>
            {mediaItems.map((m, i) => (
              <div className="ns-media-card" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="ns-media-card__logo" style={{ "--mc": m.color }}>
                  {m.logo}
                </div>
                <div className="ns-media-card__body">
                  <span className="ns-media-card__outlet">{m.outlet}</span>
                  <p className="ns-media-card__quote">"{m.quote}"</p>
                </div>
                <div className="ns-media-card__bar" style={{ background: m.color }} />
                <button className="ns-media-card__link">
                  Read Article
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────── */}
      <section className="ns-categories ns-section" ref={catRef}>
        <div className="ns-container">
          <div className={`ns-section-header ${catVisible ? "ns-in" : "ns-pre"}`}>
            <span className="ns-eyebrow">Browse By Topic</span>
            <h2 className="ns-section-title">News Categories</h2>
            <p className="ns-section-sub">
              Explore updates based on areas of interest within the alumni ecosystem.
            </p>
          </div>
          <div className={`ns-cat__grid ${catVisible ? "ns-in" : "ns-pre"}`} style={{ animationDelay: "0.2s" }}>
            {categories.map((c, i) => (
              <div className="ns-cat-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="ns-cat-card__icon">{c.icon}</div>
                <div className="ns-cat-card__content">
                  <h3 className="ns-cat-card__title">{c.title}</h3>
                  <p className="ns-cat-card__desc">{c.desc}</p>
                </div>
                <span className="ns-cat-card__count">{c.count}</span>
                <div className="ns-cat-card__hover-fill" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE ─────────────────────────────────────────────────── */}
      <section className="ns-subscribe ns-section" ref={subRef}>
        <div className="ns-container">
          <div className={`ns-subscribe__inner ${subVisible ? "ns-in" : "ns-pre"}`}>
            <div className="ns-subscribe__deco ns-subscribe__deco--1" />
            <div className="ns-subscribe__deco ns-subscribe__deco--2" />
            <div className="ns-subscribe__text">
              <span className="ns-eyebrow ns-eyebrow--light">Newsletter</span>
              <h2 className="ns-subscribe__title">Stay Updated</h2>
              <p className="ns-subscribe__sub">
                Never miss an update from your alumni network. Receive curated monthly highlights directly in your inbox.
              </p>
              <ul className="ns-subscribe__perks">
                {subscribePerks.map((p, i) => (
                  <li key={i} className="ns-subscribe__perk">
                    <span className="ns-perk-dot" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="ns-subscribe__form-wrap">
              {subscribed ? (
                <div className="ns-subscribed-msg">
                  <span className="ns-subscribed-icon">✓</span>
                  <p>You're subscribed! Welcome to the CIT Alumni network.</p>
                </div>
              ) : (
                <form className="ns-subscribe__form" onSubmit={handleSubscribe}>
                  <div className="ns-input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ns-input-icon">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="ns-email-input"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="ns-subscribe-btn">
                    Subscribe Now
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                  <p className="ns-subscribe__note">No spam. Unsubscribe anytime.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMITMENT ────────────────────────────────────────────────── */}
      <section className="ns-commitment ns-section">
        <div className="ns-container">
          <div className="ns-commitment__inner">
            <div className="ns-commitment__icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="24" cy="24" r="18"/>
                <path d="M24 14v10l6 4"/>
                <circle cx="24" cy="24" r="2" fill="currentColor"/>
              </svg>
            </div>
            <div className="ns-commitment__text">
              <h3 className="ns-commitment__title">Our Commitment</h3>
              <p className="ns-commitment__body">
                The CIT Alumni Newsroom is dedicated to keeping every member informed and connected.
                We aim to create a transparent, engaging, and inspiring platform that reflects the
                strength and success of our alumni community.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}