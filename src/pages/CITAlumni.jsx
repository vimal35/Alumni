import { useState, useEffect, useRef } from "react";
import "./CITAlumni.css";

// ── Hero Slider ──────────────────────────────────────────────────────────────
const heroSlides = [
  {
    id: 1,
    bg: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80",
    tag: "Est. 1954 · Bangalore Chapter",
    headline: "Where Legacy Meets Lifelong Connection",
    sub: "The official hub of CIT Alumni in Bangalore — bringing together generations to reconnect, collaborate, and grow.",
  },
  {
    id: 2,
    bg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80",
    tag: "1000+ Active Alumni",
    headline: "A Network That Never Graduates",
    sub: "From campus corridors to boardrooms — CITians continue to shape industries and inspire generations.",
  },
  {
    id: 3,
    bg: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80",
    tag: "50+ Events Annually",
    headline: "Reunite. Reignite. Reimagine.",
    sub: "Every gathering is a celebration of shared memories, professional ambition, and the enduring spirit of CIT.",
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const go = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + dir + heroSlides.length) % heroSlides.length);
      setAnimating(false);
    }, 600); // Increased transition time for smoothness
  };

  useEffect(() => {
    timerRef.current = setInterval(() => go(1), 7000); // Slightly longer interval
    return () => clearInterval(timerRef.current);
  }, [animating]);

  const slide = heroSlides[current];

  return (
    <section className="hero">
      <div
        className={`hero__bg ${animating ? "hero__bg--out" : "hero__bg--in"}`}
        style={{ backgroundImage: `url(${slide.bg})` }}
      />
      <div className="hero__overlay" />

      <button className="hero__arrow hero__arrow--left" onClick={() => go(-1)} aria-label="Previous">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="hero__arrow hero__arrow--right" onClick={() => go(1)} aria-label="Next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className={`hero__content ${animating ? "hero__content--out" : "hero__content--in"}`}>
        <span className="hero__tag">{slide.tag}</span>
        <h1 className="hero__headline">{slide.headline}</h1>
        <p className="hero__sub">{slide.sub}</p>
        <div className="hero__ctas">
          <a href="#events" className="btn btn--primary">Explore Events</a>
          <a href="#network" className="btn btn--outline">Join the Network</a>
        </div>
      </div>

      <div className="hero__dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === current ? "hero__dot--active" : ""}`}
            onClick={() => { if (!animating) { setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false); }, 600); } }}
          />
        ))}
      </div>
    </section>
  );
}


// ── Count-Up Hook ────────────────────────────────────────────────────────────
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── Community Stats ──────────────────────────────────────────────────────────
const stats = [
  { value: 1000, suffix: "+", label: "Active Alumni", desc: "Professionals across industries" },
  { value: 200, suffix: "+", label: "New Members/Year", desc: "Fresh talent joining annually" },
  { value: 70, suffix: "+", label: "Years of Legacy", desc: "Excellence & innovation" },
  { value: 50, suffix: "+", label: "Events Annually", desc: "Programs & meetups" },
  { value: 15, suffix: "+", label: "Industry Partners", desc: "Strategic collaborations" },
];

function StatCard({ stat, visible }) {
  const count = useCountUp(stat.value, 2200, visible);
  return (
    <div className="stat-card">
      <div className="stat-card__number">
        {count}<span className="stat-card__suffix">{stat.suffix}</span>
      </div>
      <div className="stat-card__label">{stat.label}</div>
      <div className="stat-card__desc">{stat.desc}</div>
    </div>
  );
}

// ── useInView ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Icons ────────────────────────────────────────────────────────────────────
const icons = {
  network: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
      <line x1="12" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="19" y2="17"/>
      <line x1="7" y1="19" x2="17" y2="19"/>
    </svg>
  ),
  events: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      <circle cx="12" cy="16" r="1.5"/>
    </svg>
  ),
  mentor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  community: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
};

const features = [
  { icon: "network", title: "Professional Networking", desc: "Connect with fellow CITians across industries and career stages, opening doors to collaboration, partnerships, and career growth." },
  { icon: "events", title: "Events & Gatherings", desc: "Be part of exclusive alumni meetups, reunions, knowledge sessions, and networking events designed to strengthen relationships." },
  { icon: "mentor", title: "Mentorship & Career Support", desc: "Experienced alumni actively guide younger graduates through mentorship, career advice, and professional opportunities." },
  { icon: "community", title: "Community Initiatives", desc: "Engage in meaningful social initiatives, knowledge-sharing programs, and alumni-led activities that create a positive impact." },
];

// ── Initiatives ──────────────────────────────────────────────────────────────
const initiatives = [
  {
    title: "CIT Alumni Smart Card",
    desc: "A powerful digital identity providing exclusive access to events, partner discounts, and alumni privileges — all in one place.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    tag: "Digital Identity",
  },
  {
    title: "Alumni Entrepreneurship Network",
    desc: "A dedicated platform for founders and business leaders to collaborate, exchange ideas, receive mentorship, and connect with investors.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    tag: "Entrepreneurship",
  },
  {
    title: "CIT Walkathon Series",
    desc: "A unique initiative blending fitness with fellowship — promoting health, wellness, and community bonding among alumni.",
    img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80",
    tag: "Wellness",
  },
  {
    title: "Tech Forward Forums",
    desc: "Insightful sessions on emerging trends like AI, sustainability, fintech, and leadership, led by industry experts and innovators.",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    tag: "Technology",
  },
  {
    title: "Alumni Day Celebrations",
    desc: "An annual flagship event where alumni from different batches come together to celebrate memories, achievements, and shared journeys.",
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
    tag: "Annual Flagship",
  },
];

// ── Main App ─────────────────────────────────────────────────────────────────
export default function CITAlumni() {
  const [statsRef, statsVisible] = useInView(0.1);
  const [welcomeRef, welcomeVisible] = useInView(0.1);
  const [whyRef, whyVisible] = useInView(0.1);
  const [featuresRef, featuresVisible] = useInView(0.1);
  const [initiativesRef, initiativesVisible] = useInView(0.1);
  const [ctaRef, ctaVisible] = useInView(0.1);

  return (
    <div className="app">
      {/* NAV */}
      <nav className="nav">
        <div className="nav__logo">
          <span className="nav__logo-mark">CIT</span>
          <span className="nav__logo-text">Alumni · Bangalore</span>
        </div>
        <ul className="nav__links">
          {["About", "Events", "Network", "Initiatives", "Contact"].map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`} className="nav__link">{l}</a></li>
          ))}
        </ul>
        <a href="#network" className="btn btn--nav">Join Now</a>
      </nav>

      {/* HERO */}
      <HeroSlider />

      {/* WELCOME */}
      <section className="welcome section" ref={welcomeRef} id="about">
        <div className={`welcome__inner container ${welcomeVisible ? "fade-in" : "pre-fade"}`}>
          <div className="welcome__text">
            <span className="section-eyebrow">Welcome to CIT Alumni</span>
            <h2 className="welcome__heading">Bangalore Chapter</h2>
            <div className="welcome__divider" />
            <p className="welcome__body">
              A lifelong connection that began on campus continues to evolve into meaningful relationships beyond it. The CIT Alumni Bangalore Chapter is a vibrant and growing community of graduates who share a strong foundation, professional ambition, and a deep-rooted connection to their alma mater.
            </p>
            <p className="welcome__body">
              Bringing together alumni from diverse industries, generations, and experiences, the chapter serves as a dynamic platform where friendships are rekindled, networks are expanded, and opportunities are created.
            </p>
            <a href="#network" className="btn btn--primary welcome__cta">Become a Member</a>
          </div>
          <div className="welcome__visual">
            <div className="welcome__img-frame">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80"
                alt="CIT Alumni gathering"
                className="welcome__img"
              />
              <div className="welcome__badge">
                <span className="welcome__badge-num">70+</span>
                <span className="welcome__badge-label">Years of Legacy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CIT */}
      <section className="why section" ref={whyRef} id="why">
        <div className={`container ${whyVisible ? "fade-in" : "pre-fade"}`}>
          <div className="why__header">
            <span className="section-eyebrow section-eyebrow--light">Our Purpose</span>
            <h2 className="why__heading">Why CIT Alumni Bangalore?</h2>
            <p className="why__sub">
              We are more than just an alumni association — we are a thriving ecosystem of professionals, innovators, entrepreneurs, and mentors united by the spirit of CIT.
            </p>
          </div>
          <div className="why__grid">
            {[
              { num: "01", title: "Bridge Generations", body: "Connect alumni across batches, creating mentorship bonds and cross-generational collaboration that enriches everyone." },
              { num: "02", title: "Foster Engagement", body: "Curated programs, professional collaborations, and community-driven initiatives that keep every member active and inspired." },
              { num: "03", title: "Create Opportunities", body: "Strategic industry partnerships, entrepreneurship platforms, and career-support programs that empower your next move." },
              { num: "04", title: "Give Back", body: "Community initiatives and social impact programs that honour CIT's legacy while shaping a better future." },
            ].map((item, i) => (
              <div className="why-card" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                <span className="why-card__num">{item.num}</span>
                <h3 className="why-card__title">{item.title}</h3>
                <p className="why-card__body">{item.body}</p>
                <div className="why-card__line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats section" ref={statsRef} id="network">
        <div className="container">
          <span className="section-eyebrow">Our Community at a Glance</span>
          <h2 className="stats__heading">Numbers That Tell Our Story</h2>
          <div className="stats__grid">
            {stats.map((s, i) => (
              <StatCard key={i} stat={s} visible={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features section" ref={featuresRef} id="features">
        <div className={`container ${featuresVisible ? "fade-in" : "pre-fade"}`}>
          <span className="section-eyebrow">What Makes Us Special</span>
          <h2 className="features__heading">What Makes Our Community Special</h2>
          <div className="features__grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-card__icon-wrap">
                  <div className="feature-card__icon">{icons[f.icon]}</div>
                </div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
                <div className="feature-card__hover-bar" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INITIATIVES */}
      <section className="initiatives section" ref={initiativesRef} id="events">
        <div className={`container ${initiativesVisible ? "fade-in" : "pre-fade"}`}>
          <span className="section-eyebrow">Programs & Platforms</span>
          <h2 className="initiatives__heading">Featured Initiatives & Programs</h2>
          <div className="initiatives__grid">
            {initiatives.map((item, i) => (
              <div className="init-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="init-card__img-wrap">
                  <img src={item.img} alt={item.title} className="init-card__img" />
                  <span className="init-card__tag">{item.tag}</span>
                </div>
                <div className="init-card__body">
                  <h3 className="init-card__title">{item.title}</h3>
                  <p className="init-card__desc">{item.desc}</p>
                  <button className="init-card__link">
                    Learn More
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="init-card__arrow">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section section" ref={ctaRef}>
        <div className={`cta-section__inner container ${ctaVisible ? "fade-in" : "pre-fade"}`}>
          <div className="cta-section__text">
            <span className="section-eyebrow section-eyebrow--light">Stay Connected</span>
            <h2 className="cta-section__heading">The CIT Journey Never Ends</h2>
            <p className="cta-section__body">
              The CIT journey doesn't end at graduation — it evolves into a lifelong network of friendships, opportunities, and shared success. Join the CIT Alumni Bangalore Chapter and become part of a forward-thinking community that continues to inspire, support, and grow together across generations.
            </p>
            <div className="cta-section__actions">
              <a href="#join" className="btn btn--primary btn--lg">Join the Network</a>
              <a href="#events" className="btn btn--ghost btn--lg">View Events</a>
            </div>
          </div>
          <div className="cta-section__visual">
            <div className="cta-section__rings">
              <div className="ring ring--1" />
              <div className="ring ring--2" />
              <div className="ring ring--3" />
              <div className="cta-section__logo-center">CIT</div>
            </div>
          </div>
        </div>
      </section>

   
     
    </div>
  );
}