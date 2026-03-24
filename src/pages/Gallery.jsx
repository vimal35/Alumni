import { useState, useRef, useEffect } from "react";
import "./Gallery.css";

/* ── Placeholder image data (swap src with real URLs) ── */
const imageTabs = [
  {
    id: "annual",
    label: "Annual Meet",
    items: [
      { id: 1, src: "https://picsum.photos/seed/am1/800/600", caption: "Annual Meet 2024 — Keynote Address" },
      { id: 2, src: "https://picsum.photos/seed/am2/800/600", caption: "Networking Session" },
      { id: 3, src: "https://picsum.photos/seed/am3/800/600", caption: "Award Ceremony" },
      { id: 4, src: "https://picsum.photos/seed/am4/800/600", caption: "Group Photograph" },
      { id: 5, src: "https://picsum.photos/seed/am5/800/600", caption: "Panel Discussion" },
      { id: 6, src: "https://picsum.photos/seed/am6/800/600", caption: "Cultural Evening" },
    ],
  },
  {
    id: "reunion",
    label: "Batch Reunion",
    items: [
      { id: 1, src: "https://picsum.photos/seed/br1/800/600", caption: "Class of 2005 Reunion" },
      { id: 2, src: "https://picsum.photos/seed/br2/800/600", caption: "Faculty Felicitation" },
      { id: 3, src: "https://picsum.photos/seed/br3/800/600", caption: "Campus Tour" },
      { id: 4, src: "https://picsum.photos/seed/br4/800/600", caption: "Dinner Banquet" },
      { id: 5, src: "https://picsum.photos/seed/br5/800/600", caption: "Memory Lane Display" },
      { id: 6, src: "https://picsum.photos/seed/br6/800/600", caption: "Batch Photo" },
    ],
  },
  {
    id: "outreach",
    label: "Outreach",
    items: [
      { id: 1, src: "https://picsum.photos/seed/or1/800/600", caption: "School Mentorship Drive" },
      { id: 2, src: "https://picsum.photos/seed/or2/800/600", caption: "Skill Development Workshop" },
      { id: 3, src: "https://picsum.photos/seed/or3/800/600", caption: "Blood Donation Camp" },
      { id: 4, src: "https://picsum.photos/seed/or4/800/600", caption: "Tree Plantation Drive" },
      { id: 5, src: "https://picsum.photos/seed/or5/800/600", caption: "Community Service" },
      { id: 6, src: "https://picsum.photos/seed/or6/800/600", caption: "Volunteering Day" },
    ],
  },
  {
    id: "awards",
    label: "Awards",
    items: [
      { id: 1, src: "https://picsum.photos/seed/aw1/800/600", caption: "Distinguished Alumni Award" },
      { id: 2, src: "https://picsum.photos/seed/aw2/800/600", caption: "Young Achiever Recognition" },
      { id: 3, src: "https://picsum.photos/seed/aw3/800/600", caption: "Lifetime Achievement" },
      { id: 4, src: "https://picsum.photos/seed/aw4/800/600", caption: "Excellence in Innovation" },
      { id: 5, src: "https://picsum.photos/seed/aw5/800/600", caption: "Leadership Award" },
      { id: 6, src: "https://picsum.photos/seed/aw6/800/600", caption: "Community Impact Prize" },
    ],
  },
];

const videoTabs = [
  {
    id: "highlights",
    label: "Highlights",
    items: [
      { id: 1, thumb: "https://picsum.photos/seed/vh1/800/450", title: "Annual Meet 2024 — Full Highlights", duration: "4:32" },
      { id: 2, thumb: "https://picsum.photos/seed/vh2/800/450", title: "Keynote by Distinguished Alumni", duration: "12:08" },
      { id: 3, thumb: "https://picsum.photos/seed/vh3/800/450", title: "Award Night Recap", duration: "6:15" },
      { id: 4, thumb: "https://picsum.photos/seed/vh4/800/450", title: "Networking & Fun Moments", duration: "3:44" },
    ],
  },
  {
    id: "talks",
    label: "Talks",
    items: [
      { id: 1, thumb: "https://picsum.photos/seed/vt1/800/450", title: "Career in Deep Tech — Alumni Talk", duration: "18:22" },
      { id: 2, thumb: "https://picsum.photos/seed/vt2/800/450", title: "Entrepreneurship Journey", duration: "22:10" },
      { id: 3, thumb: "https://picsum.photos/seed/vt3/800/450", title: "Leadership in Public Service", duration: "15:37" },
      { id: 4, thumb: "https://picsum.photos/seed/vt4/800/450", title: "Innovation & Research Panel", duration: "28:05" },
    ],
  },
  {
    id: "campus",
    label: "Campus",
    items: [
      { id: 1, thumb: "https://picsum.photos/seed/vc1/800/450", title: "CIT Campus — Then & Now", duration: "5:18" },
      { id: 2, thumb: "https://picsum.photos/seed/vc2/800/450", title: "New Infrastructure Tour", duration: "7:44" },
      { id: 3, thumb: "https://picsum.photos/seed/vc3/800/450", title: "Labs & Facilities Walkthrough", duration: "9:02" },
      { id: 4, thumb: "https://picsum.photos/seed/vc4/800/450", title: "Sports Complex Inauguration", duration: "4:56" },
    ],
  },
  {
    id: "stories",
    label: "Stories",
    items: [
      { id: 1, thumb: "https://picsum.photos/seed/vs1/800/450", title: "From CIT to Silicon Valley", duration: "11:30" },
      { id: 2, thumb: "https://picsum.photos/seed/vs2/800/450", title: "Building a Startup from Scratch", duration: "14:15" },
      { id: 3, thumb: "https://picsum.photos/seed/vs3/800/450", title: "A Doctor's Humble Beginnings", duration: "9:48" },
      { id: 4, thumb: "https://picsum.photos/seed/vs4/800/450", title: "Giving Back — An Alumni's Mission", duration: "8:22" },
    ],
  },
];

/* ── Intersection hook ── */
function useVisible(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Lightbox ── */
function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lb-close" onClick={onClose}>✕</button>
      <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>‹</button>
      <div className="lb-content" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.caption} className="lb-img" />
        <p className="lb-caption">{item.caption}</p>
      </div>
      <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); onNext(); }}>›</button>
    </div>
  );
}

/* ── Image Section ── */
function ImageSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [ref, visible] = useVisible();
  const tab = imageTabs[activeTab];

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevImg = () => setLightbox((l) => (l - 1 + tab.items.length) % tab.items.length);
  const nextImg = () => setLightbox((l) => (l + 1) % tab.items.length);

  return (
    <section className="gallery-section" ref={ref}>
      <div className={`section-inner ${visible ? "sec-visible" : ""}`}>
        {/* Header */}
        <div className="sec-header">
          <div className="sec-tag-row">
            <span className="sec-tag">Visual Archive</span>
            <div className="tag-line" />
          </div>
          <h2 className="sec-title">
            Photo <span className="title-accent">Gallery</span>
          </h2>
          <p className="sec-desc">
            Captured moments that define our journey — from milestones to memories.
          </p>
        </div>

        {/* Tabs */}
        <div className="tab-bar">
          {imageTabs.map((t, i) => (
            <button
              key={t.id}
              className={`tab-btn ${activeTab === i ? "tab-active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              <span className="tab-num">0{i + 1}</span>
              {t.label}
              {activeTab === i && <span className="tab-ink" />}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="img-grid">
          {tab.items.map((img, i) => (
            <div
              key={img.id}
              className="img-tile"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => openLightbox(i)}
            >
              <img src={img.src} alt={img.caption} loading="lazy" />
              <div className="tile-overlay">
                <span className="tile-zoom">⊕</span>
                <p className="tile-caption">{img.caption}</p>
              </div>
              <div className="tile-index">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          item={tab.items[lightbox]}
          onClose={closeLightbox}
          onPrev={prevImg}
          onNext={nextImg}
        />
      )}
    </section>
  );
}

/* ── Video Section ── */
function VideoSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [playing, setPlaying] = useState(null);
  const [ref, visible] = useVisible();
  const tab = videoTabs[activeTab];

  return (
    <section className="gallery-section vid-section" ref={ref}>
      <div className={`section-inner ${visible ? "sec-visible" : ""}`}>
        {/* Header */}
        <div className="sec-header">
          <div className="sec-tag-row">
            <div className="tag-line" />
            <span className="sec-tag">Motion Archive</span>
          </div>
          <h2 className="sec-title">
            Video <span className="title-accent">Library</span>
          </h2>
          <p className="sec-desc">
            Relive the energy and spirit of our alumni events through curated recordings.
          </p>
        </div>

        {/* Tabs */}
        <div className="tab-bar">
          {videoTabs.map((t, i) => (
            <button
              key={t.id}
              className={`tab-btn ${activeTab === i ? "tab-active" : ""}`}
              onClick={() => { setActiveTab(i); setPlaying(null); }}
            >
              <span className="tab-num">0{i + 1}</span>
              {t.label}
              {activeTab === i && <span className="tab-ink" />}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="vid-grid">
          {tab.items.map((v, i) => (
            <div
              key={v.id}
              className={`vid-tile ${playing === i ? "vid-playing" : ""}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="vid-thumb-wrap" onClick={() => setPlaying(playing === i ? null : i)}>
                <img src={v.thumb} alt={v.title} loading="lazy" />
                <div className="vid-overlay">
                  <div className={`play-btn ${playing === i ? "pause-btn" : ""}`}>
                    {playing === i ? "❙❙" : "▶"}
                  </div>
                </div>
                <span className="vid-duration">{v.duration}</span>
                {playing === i && (
                  <div className="vid-bars">
                    {[...Array(5)].map((_, b) => (
                      <div key={b} className="vid-bar" style={{ animationDelay: `${b * 0.12}s` }} />
                    ))}
                  </div>
                )}
              </div>
              <div className="vid-info">
                <span className="vid-cat">{tab.label}</span>
                <h3 className="vid-title">{v.title}</h3>
                <div className="vid-meta">
                  <span className="vid-tag-pill">Watch Now</span>
                  <span className="vid-time">🕐 {v.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function Gallery() {
  return (
    <div className="gallery-root">
      <div className="gallery-bg-grid" />
      <div className="gallery-bg-accent" />

      {/* Hero */}
      <header className="gallery-hero">
        <div className="hero-eyebrow">
          <span className="eyebrow-line" />
          CIT Alumni · Bangalore Chapter
          <span className="eyebrow-line" />
        </div>
        <h1 className="gallery-hero-title">
          Our <em>Gallery</em>
        </h1>
        <p className="gallery-hero-sub">
          A curated archive of photographs and videos celebrating the legacy,
          achievements, and enduring bonds of the CIT alumni community.
        </p>
        <div className="hero-divider">
          <div className="divider-line" />
          <div className="divider-diamond" />
          <div className="divider-line" />
        </div>
      </header>

      <ImageSection />
      <VideoSection />

      {/* Footer strip */}
      <div className="gallery-footer-strip">
        <span>CIT Alumni · Bangalore Chapter · Gallery</span>
        <div className="strip-dot" />
        <span>Preserving Memories · Building Bonds</span>
      </div>
    </div>
  );
}