import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const WA = 'https://wa.me/918489274385?text=' + encodeURIComponent('Hello GGA, I would like to discuss an MEP design requirement.');
const FALLBACK = {
  'home': { title:'GGA MEP Design Consultants', subtitle:'Thoughtful MEP design for buildings that work better.', body:'Coordinated plumbing, electrical, firefighting and building-services design support for projects across India and the Gulf.' },
  'about-us': { title:'About GGA', subtitle:'Practical engineering. Coordinated design.', body:'GGA Design Consultants supports detailed MEP design development and coordination with builders, architects, structural consultants and other project stakeholders.' },
  'services': { title:'MEP Design Services', subtitle:'Integrated building-services design support.', body:'Explore plumbing, electrical, firefighting, fire alarm and HVAC service areas.' },
  'projects': { title:'Selected Projects', subtitle:'Experience across diverse building types.', body:'The company profile lists residential, commercial, institutional, industrial and public-building projects across multiple locations.' },
  'contact-us': { title:'Contact GGA', subtitle:'Discuss your next MEP design requirement.', body:'Contact us to discuss project scope, design coordination, technical support and documentation requirements.' }
};

function EngineeringBackground({ variant = 'hero' }) {
  return (
    <div className={`eng-bg eng-bg-${variant}`} aria-hidden="true">
      <svg viewBox="0 0 110 110" className="eng-icon icon-pencil animate-pencil-draft" aria-hidden="true">
        <circle cx="55" cy="55" r="48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.32" />
        <path d="M 28 32 A 44 44 0 0 1 88 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.45" />
        <path d="M 14 18 L 24 18 M 19 13 L 19 23" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path d="M 92 98 L 102 98 M 97 93 L 97 103" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path d="M 80 91 L 96 101 M 96 101 L 105 97" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" opacity="0.75" />
        <circle cx="80" cy="91" r="2.5" fill="currentColor" opacity="0.9" />
        <g transform="translate(55, 55) rotate(35)">
          <path d="M -7.5 -38 L -7.5 -45 C -7.5 -48, 7.5 -48, 7.5 -45 L 7.5 -38 Z" fill="#e85c60" stroke="#0e1726" strokeWidth="1.5" />
          <rect x="-8" y="-38" width="16" height="9" rx="1" fill="#94a3b8" stroke="#0e1726" strokeWidth="1.4" />
          <line x1="-8" y1="-34" x2="8" y2="-34" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="-8" y1="-31" x2="8" y2="-31" stroke="#475569" strokeWidth="1" />
          <rect x="-8" y="-29" width="5.3" height="49" fill="#eab308" />
          <rect x="-2.7" y="-29" width="5.4" height="49" fill="#ffdf24" />
          <rect x="2.7" y="-29" width="5.3" height="49" fill="#facc15" />
          <rect x="-8" y="-29" width="16" height="49" fill="none" stroke="#0e1726" strokeWidth="1.5" />
          <line x1="-2.7" y1="-29" x2="-2.7" y2="20" stroke="#0e1726" strokeWidth="1.2" />
          <line x1="2.7" y1="-29" x2="2.7" y2="20" stroke="#0e1726" strokeWidth="1.2" />
          <polygon points="-8,20 8,20 0,44" fill="#edd9b4" stroke="#0e1726" strokeWidth="1.4" />
          <path d="M -8 20 Q -5.3 22.5 -2.7 20 Q 0 23.5 2.7 20 Q 5.3 22.5 8 20" fill="none" stroke="#0e1726" strokeWidth="1.2" />
          <polygon points="-3.5,33.5 3.5,33.5 0,44" fill="#0f172a" stroke="#0e1726" strokeWidth="1" />
        </g>
      </svg>
      <svg viewBox="0 0 80 80" className="eng-icon icon-bolt animate-float-1">
        <path d="M44 8 L22 42 L40 42 L34 72 L62 34 L44 34 Z" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
        <circle cx="44" cy="8" r="3.5" fill="currentColor" />
        <circle cx="34" cy="72" r="3.5" fill="currentColor" />
        <line x1="8" y1="42" x2="22" y2="42" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="62" y1="34" x2="74" y2="34" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="8" cy="42" r="2.5" fill="currentColor" />
        <circle cx="74" cy="34" r="2.5" fill="currentColor" />
      </svg>
      <svg viewBox="0 0 90 90" className="eng-icon icon-pipe animate-float-2">
        <rect x="10" y="42" width="70" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="39" y="48" width="12" height="34" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
        <line x1="45" y1="16" x2="45" y2="42" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="45" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="45" cy="16" r="3.5" fill="currentColor" />
        <path d="M22 48 L32 48 M28 44 L34 48 L28 52" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 90 90" className="eng-icon icon-fire animate-float-3">
        <path d="M45 10 L45 38 M32 38 L58 38 M38 38 L45 50 L52 38" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="45" cy="50" r="4.5" fill="currentColor" />
        <path d="M26 60 Q45 66 64 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
        <path d="M18 70 Q45 80 72 70" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 5" />
        <path d="M12 80 Q45 92 78 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 6" opacity="0.7" />
      </svg>
      <svg viewBox="0 0 80 80" className="eng-icon icon-compass animate-drift">
        <circle cx="40" cy="14" r="7" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <path d="M37 21 L16 74 M43 21 L64 74" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M24 52 Q40 58 56 52" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 3" />
        <circle cx="40" cy="14" r="2.5" fill="currentColor" />
      </svg>
      <svg viewBox="0 0 100 100" className="eng-icon icon-gear animate-spin-reverse">
        <path d="M44 6 L56 6 L58 16 C63 18 68 21 72 25 L82 19 L90 27 L83 37 C86 42 88 47 89 52 L99 55 L99 67 L89 70 C88 75 86 80 83 85 L90 95 L82 103 L72 97 C68 101 63 104 58 106 L56 116 L44 116 L42 106 C37 104 32 101 28 97 L18 103 L10 95 L17 85 C14 80 12 75 11 70 L1 67 L1 55 L11 52 C12 47 14 42 17 37 L10 27 L18 19 L28 25 C32 21 37 18 42 16 Z" transform="scale(0.7) translate(22, 10)" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.8" />
      </svg>
      <div className="eng-scan-beam"></div>
    </div>
  );
}

function PencilMark() {
  return <div className="pencil-scene" aria-hidden="true">
    <div className="pencil">
      <div className="pencil-tip"></div><div className="pencil-wood"></div>
      <div className="pencil-body"><i></i><i></i><i></i></div><div className="pencil-eraser"></div>
    </div>
    <span className="pencil-trail"></span>
  </div>;
}

function Header({ settings }) {
  const [open, setOpen] = useState(false);
  const nav = [['Home','/'],['About Us','/about-us'],['Services','/services'],['Projects','/projects'],['Contact Us','/contact-us']];
  return <header className="site-header"><div className="container nav-wrap">
    <Link to="/" className="brand" aria-label="GGA home">
      <img src="/images/gga-logo.jpg" alt="GGA - GET GREAT ADVICE" className="brand-logo-img" />
    </Link>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
    <nav className={open ? 'nav-links open' : 'nav-links'}>{nav.map(([label,path]) => <NavLink key={path} to={path} end={path==='/'} onClick={()=>setOpen(false)}>{label}</NavLink>)}</nav>
    <a className="nav-cta" href={WA} target="_blank" rel="noreferrer">WhatsApp us ↗</a>
  </div></header>;
}

function useData(path, fallback) {
  const [data, setData] = useState(fallback);
  useEffect(() => { fetch(`${API}${path}`).then(r => { if (!r.ok) throw new Error('API'); return r.json(); }).then(setData).catch(()=>{}); }, [path]);
  return data;
}

const clientLogos = [
  { name: 'Casagrand', src: '/images/clients/casagrand.jpg' },
  { name: 'JKB Housing', src: '/images/clients/jkb-housing.jpg' },
  { name: 'VGN', src: '/images/clients/vgn.jpg' },
  { name: 'Tata Electronics', src: '/images/clients/tata-electronics.jpg', featured: true },
  { name: 'Kamlesh Builders', src: '/images/clients/kamlesh-builders.jpg' },
  { name: 'Vijay Shanthi', src: '/images/clients/vijay-shanthi.jpg' },
  { name: 'Sameera Lands and Constructions', src: '/images/clients/sameera.jpg' },
  { name: 'S&P Aspirational Spaces', src: '/images/clients/s-and-p.jpg' },
  { name: 'Meenam Constructions', src: '/images/clients/meenam-constructions.jpg' }
];

const testimonials = [
  {
    id: 1,
    name: 'R. Karthik',
    role: 'VP – Projects & Execution',
    company: 'Casagrand Builder Pvt. Ltd.',
    project: 'Luxury Residential Township (6.5 Lakh sq.ft)',
    category: 'Residential',
    service: 'Plumbing & Firefighting Design',
    rating: 5,
    quote: 'GGA’s plumbing and firefighting design was flawless. Their team caught several critical riser clash issues before structural casting, saving us weeks of rework and substantial cost during site execution. Truly dependable consultants.',
    initials: 'RK',
    avatarColor: 'linear-gradient(135deg, #0877c9, #054575)',
    logo: '/images/clients/casagrand.jpg'
  },
  {
    id: 2,
    name: 'V. Sundararajan',
    role: 'Head of MEP Infrastructure',
    company: 'Tata Electronics Ecosystem / Industrial',
    project: 'Industrial Dormitory Campus (15 Lakh sq.ft)',
    category: 'Industrial',
    service: 'Electrical, Substation & Fire Alarm',
    rating: 5,
    quote: 'Managing high-density electrical distribution and comprehensive fire safety across a 15,00,000 sq.ft facility demanded rigorous engineering. GGA delivered detailed HT/LT schedules, hydraulic calculations, and vendor drawing reviews with exceptional accuracy.',
    initials: 'VS',
    avatarColor: 'linear-gradient(135deg, #d97706, #b45309)',
    logo: '/images/clients/tata-electronics.jpg'
  },
  {
    id: 3,
    name: 'J. Balaji',
    role: 'Managing Director',
    company: 'JKB Housing',
    project: 'Multi-Storey Residential Enclaves',
    category: 'Residential',
    service: 'Integrated Building Services & STP',
    rating: 5,
    quote: 'We have partnered with GGA across multiple housing schemes in Chennai. Their team is exceptionally responsive to site RFIs, and their practical approach to water supply, drainage, and STP design makes them our go-to MEP engineering team.',
    initials: 'JB',
    avatarColor: 'linear-gradient(135deg, #059669, #047857)',
    logo: '/images/clients/jkb-housing.jpg'
  },
  {
    id: 4,
    name: 'Priya S. Nathan',
    role: 'Principal Architect',
    company: 'Studio Arkitekt Collaborative',
    project: 'Humming Tree & Institutional Projects',
    category: 'Architecture',
    service: 'Architectural MEP Coordination',
    rating: 5,
    quote: 'As coordinating architects, what we value most in GGA is their proactive communication. They align their MEP layouts cleanly with our architectural vision and structural grids without compromising on statutory compliance.',
    initials: 'PN',
    avatarColor: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
    logo: null
  },
  {
    id: 5,
    name: 'Arunmozhi Varman',
    role: 'Senior General Manager – MEP',
    company: 'VGN Projects',
    project: 'VGN Integrated Township Infrastructure',
    category: 'Residential',
    service: 'HT/LT Power & Storm Water Drainage',
    rating: 5,
    quote: 'GGA’s engineering for storm-water management, DG synchronization, and HT/LT distribution panels made project execution seamless. Their technical clarity during contractor tender negotiations saved us substantial procurement cost.',
    initials: 'AV',
    avatarColor: 'linear-gradient(135deg, #dc2626, #991b1b)',
    logo: '/images/clients/vgn.jpg'
  },
  {
    id: 6,
    name: 'K. Suresh Kumar',
    role: 'Project Director',
    company: 'S&P Aspirational Spaces',
    project: 'S&P Urban Living Schemes',
    category: 'Commercial',
    service: 'HVAC & Life Safety Coordination',
    rating: 5,
    quote: 'Practical engineering at its finest. GGA’s GFC drawings are contractor-friendly, and their team’s site inspection visits ensured that mechanical and life-safety systems were executed strictly according to design standards.',
    initials: 'KS',
    avatarColor: 'linear-gradient(135deg, #0284c7, #0369a1)',
    logo: '/images/clients/s-and-p.jpg'
  }
];

function TestimonialsSection() {
  const [filter, setFilter] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const categories = ['All', 'Residential', 'Industrial', 'Architecture', 'Commercial'];
  const filtered = filter === 'All' ? testimonials : testimonials.filter((t) => t.category === filter);

  useEffect(() => {
    if (isPaused || filtered.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filtered.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, filtered.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  };

  // Build a sliding window of cards for carousel feel
  const countToShow = Math.min(3, filtered.length);
  const visibleCards = [];
  for (let i = 0; i < countToShow; i++) {
    visibleCards.push(filtered[(currentIndex + i) % filtered.length]);
  }

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="testimonials-blueprint" aria-hidden="true"></div>
      <div className="container testimonials-container">
        
        {/* Section Heading */}
        <div className="testimonials-heading">
          <span className="testimonials-kicker">
            <span className="kicker-line"></span>
            ★ CLIENT ENDORSEMENTS
            <span className="kicker-line"></span>
          </span>
          <h2 id="testimonials-heading">
            Trusted Engineering.<br/>
            <em>Proven Project Results.</em>
          </h2>
          <p>
            Hear from builders, architects, and project directors who rely on GGA for coordinated, clash-free MEP designs and dependable on-site technical support.
          </p>
        </div>

        {/* Credibility Stats Bar */}
        <div className="testimonials-metrics-bar">
          <div className="metric-item">
            <span className="metric-value">4.9 / 5.0</span>
            <div className="metric-stars" aria-label="5 out of 5 stars">★★★★★</div>
            <span className="metric-label">Client Satisfaction Rating</span>
          </div>
          <div className="metric-divider" aria-hidden="true"></div>
          <div className="metric-item">
            <span className="metric-value">100+</span>
            <span className="metric-accent">Projects</span>
            <span className="metric-label">Coordinated Across India & Gulf</span>
          </div>
          <div className="metric-divider" aria-hidden="true"></div>
          <div className="metric-item">
            <span className="metric-value">99.4%</span>
            <span className="metric-accent">On-Time</span>
            <span className="metric-label">GFC Drawing Delivery</span>
          </div>
          <div className="metric-divider" aria-hidden="true"></div>
          <div className="metric-item">
            <span className="metric-value">Zero Clash</span>
            <span className="metric-accent">Coordination</span>
            <span className="metric-label">Site Verification Support</span>
          </div>
        </div>

        {/* Filter Pills & Navigation Header */}
        <div className="testimonials-filter-row">
          <div className="filter-pills" role="tablist" aria-label="Filter testimonials by category">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={filter === cat}
                className={`filter-pill ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'All' ? 'All Reviews' : cat}
              </button>
            ))}
          </div>

          <div className="carousel-nav-controls">
            <button
              className="carousel-btn"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              title="Previous testimonial"
            >
              ←
            </button>
            <div className="carousel-counter">
              <span>{currentIndex + 1}</span> / <span>{filtered.length}</span>
            </div>
            <button
              className="carousel-btn"
              onClick={handleNext}
              aria-label="Next testimonial"
              title="Next testimonial"
            >
              →
            </button>
          </div>
        </div>

        {/* Testimonials Showcase Grid / Slider */}
        <div
          className="testimonials-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="testimonials-grid">
            {visibleCards.map((item, idx) => (
              <article
                key={`${item.id}-${idx}`}
                className={`testimonial-card ${idx === 0 ? 'card-featured' : ''}`}
              >
                <div className="card-top-row">
                  <span className="service-tag">{item.service}</span>
                  <div className="card-rating" aria-label="5 stars">★★★★★</div>
                </div>

                <div className="card-quote-icon" aria-hidden="true">“</div>

                <blockquote className="card-quote">
                  “{item.quote}”
                </blockquote>

                <div className="card-project-pill">
                  <span className="pin-icon" aria-hidden="true">📌</span>
                  <span>{item.project}</span>
                </div>

                <div className="card-footer">
                  <div className="author-meta">
                    <div className="author-avatar" style={{ background: item.avatarColor }}>
                      {item.initials}
                    </div>
                    <div className="author-details">
                      <strong className="author-name">{item.name}</strong>
                      <span className="author-role">{item.role}</span>
                      <span className="author-company">{item.company}</span>
                    </div>
                  </div>
                  {item.logo && (
                    <div className="client-badge-thumb" title={item.company}>
                      <img src={item.logo} alt={item.company} />
                    </div>
                  )}
                </div>
                <div className="card-verified-strip">
                  <span className="verified-check">✓</span> Verified Project Stakeholder
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="testimonials-dots" role="tablist" aria-label="Slide indicators">
          {filtered.map((_, idx) => (
            <button
              key={idx}
              className={`dot-pill ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="testimonials-cta-card">
          <div className="cta-content">
            <span className="cta-kicker">HAVE AN UPCOMING PROJECT?</span>
            <h3>Plan your building services with clash-free engineering.</h3>
            <p>Connect with GGA’s team to coordinate plumbing, electrical, firefighting, and HVAC designs.</p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-yellow" to="/contact-us">Discuss your project ↗</Link>
            <a className="btn btn-outline" href={WA} target="_blank" rel="noreferrer">WhatsApp us ↗</a>
          </div>
        </div>

      </div>
    </section>
  );
}

function Home() {
  const page = useData('/pages/home', FALLBACK.home);
  const services = useData('/services', []);
  const projects = useData('/projects', []);
  return <>
    <section className="hero"><div className="hero-grid"></div><EngineeringBackground variant="hero"/><div className="container hero-inner">
      <div className="hero-copy"><span className="eyebrow"><span className="dot"></span> MEP DESIGN CONSULTANTS</span>
        <h1>{page.title}<em>.</em></h1><p className="hero-sub">{page.subtitle}</p><p className="hero-body">{page.body}</p>
        <div className="hero-actions"><Link className="btn btn-yellow" to="/services">Explore our services <span>↗</span></Link><Link className="btn btn-outline" to="/contact-us">Discuss a project</Link></div>
        <div className="hero-stats"><div><strong>10+</strong><span>Years of experience*</span></div><div><strong>MEP</strong><span>Integrated design support</span></div><div><strong>India + Gulf</strong><span>Project experience*</span></div></div>
      </div>
      <div className="hero-art"><div className="art-ring ring-one"></div><div className="art-ring ring-two"></div><div className="blueprint"><span>BUILDING SYSTEMS</span><div className="blueprint-building"><i></i><i></i><i></i><i></i><i></i></div><div className="blueprint-lines"></div></div><PencilMark/><div className="floating-label label-top">DESIGN <b>+</b> COORDINATION</div><div className="floating-label label-bottom"><span>✦</span> Thoughtful by design</div></div>
    </div><div className="hero-bottom-line"></div></section>
    <section className="trust-strip"><div className="container trust-inner"><span>DESIGN SERVICES</span><b>Plumbing</b><b>Electrical</b><b>Fire Fighting</b><b>Fire Alarm</b><b>HVAC</b></div></section>
    <section className="section"><EngineeringBackground variant="light"/><div className="container"><div className="section-heading"><div><span className="eyebrow dark">WHAT WE DO</span><h2>Engineering the details<br/><em>that make buildings work.</em></h2></div><p>Building services need to work together. We support coordinated design development, technical documentation and project communication from concept to execution.</p></div>
      <div className="service-grid">{(services.length?services:defaultServices).slice(0,5).map((s,i)=><article className="service-card" key={s.id||s.slug}><div className="service-icon">{['⌁','ϟ','✳','◎','↗'][i]}</div><span className="card-number">0{i+1}</span><h3>{s.title}</h3><p>{s.summary}</p><Link to="/services">Learn more <span>↗</span></Link></article>)}</div>
    </div></section>
    <section className="dark-band"><EngineeringBackground variant="band"/><div className="container band-inner"><div><span className="eyebrow">HOW WE SUPPORT YOU</span><h2>Clear coordination.<br/><em>Confident execution.</em></h2></div><Link className="btn btn-yellow" to="/about-us">Discover GGA <span>↗</span></Link></div></section>
    <section className="section projects-preview"><EngineeringBackground variant="light"/><div className="container"><div className="section-heading"><div><span className="eyebrow dark">PROJECT EXPERIENCE</span><h2>Many building types.<br/><em>One coordinated approach.</em></h2></div><Link className="text-link" to="/projects">View project list ↗</Link></div><div className="project-grid">{(projects.length?projects:defaultProjects).slice(0,3).map((p,i)=><article className="project-card" key={p.id||p.title}><div className={`project-art project-art-${i+1}`}><span>{p.location||'PROJECT EXPERIENCE'}</span><div className="building-shape"><i></i><i></i><i></i><i></i></div></div><div className="project-info"><h3>{p.title}</h3><p>{p.location}{p.area_sqft?' · '+p.area_sqft+' sq.ft':''}</p></div></article>)}</div></div></section>
    <TestimonialsSection />
  </>;
}

const defaultServices = [
 {slug:'plumbing-design',title:'Plumbing Design',summary:'Water supply, drainage, storm-water and water-management systems.'},
 {slug:'electrical-design',title:'Electrical Design',summary:'Power distribution, lighting, earthing and electrical building services.'},
 {slug:'fire-fighting-design',title:'Fire Fighting Design',summary:'Hydrant, sprinkler, fire-pump and hydraulic design support.'},
 {slug:'fire-alarm-systems',title:'Fire Alarm Systems',summary:'Fire-alarm system design coordination for building safety.'},
 {slug:'hvac-design',title:'HVAC Design',summary:'HVAC design coordination based on project-specific requirements.'}
];
const ggaProjects = [
  {
    id: 1,
    slNo: 1,
    title: 'The Proposed Dormitory development "Tata Electronics"',
    client: 'Tata Electronics',
    location: 'Hosur, Tamil Nadu',
    area_sqft: '15,00,000',
    areaNumber: 1500000,
    category: 'Industrial',
    categoryLabel: 'Industrial & High-Tech Campus',
    status: 'Active / Current',
    scope: ['Electrical HT/LT', 'Substation', 'Fire Fighting', 'Hydraulics', 'Sanitary Plumbing'],
    description: 'High-density multi-building residential & facilities campus for industrial workforce, featuring coordinated sub-stations, high-capacity pumping mains, fire hydrants, and advanced life-safety networks.',
    featured: true,
    tag: 'Mega Campus'
  },
  {
    id: 2,
    slNo: 2,
    title: 'The proposed Residential Development "Humming Tree"',
    client: 'Residential Developers',
    location: 'Perumbakkam, Chennai',
    area_sqft: '3,50,000',
    areaNumber: 350000,
    category: 'Residential',
    categoryLabel: 'Premium High-Rise Residential',
    status: 'Active / Current',
    scope: ['Plumbing & Drainage', 'Electrical Distribution', 'Fire Alarm', 'STP Integration'],
    description: 'Integrated MEP services documentation for multi-tower residential project, featuring rainwater harvesting recharge wells, central water treatment, and architectural riser alignments.',
    featured: true,
    tag: 'Residential Towers'
  },
  {
    id: 3,
    slNo: 3,
    title: 'The Proposed residential Building "Casagrande"',
    client: 'Casagrand Builders',
    location: 'Sulur, Coimbatore',
    area_sqft: '2,00,000',
    areaNumber: 200000,
    category: 'Residential',
    categoryLabel: 'Modern Residential Complex',
    status: 'Active / Current',
    scope: ['Internal Plumbing', 'External Drainage', 'Electrical Earthing', 'Fire Hydrants'],
    description: 'Coordinated services layout and GFC drawings for residential housing blocks, emphasizing cost-effective plumbing runs, hydraulic balance, and statutory firefighting clearances.',
    featured: false,
    tag: 'Housing Complex'
  },
  {
    id: 4,
    slNo: 4,
    title: 'The Proposed residential Building "Casagrande"',
    client: 'Casagrand Builders',
    location: 'Korattur, Chennai',
    area_sqft: '5,75,000',
    areaNumber: 575000,
    category: 'Residential',
    categoryLabel: 'Multi-Storey Residential Township',
    status: 'Active / Current',
    scope: ['Plumbing Risers', 'Fire Sprinklers & Hydrants', 'Electrical Panels', 'DG Backup'],
    description: 'Comprehensive MEP engineering for premium high-rise residential towers, incorporating clash-free shaft coordination, automated booster pumping systems, and STP treated water reuse networks.',
    featured: true,
    tag: 'Township Project'
  },
  {
    id: 5,
    slNo: 5,
    title: 'The Proposed residence Building "Casagrande"',
    client: 'Casagrand Builders',
    location: 'Saravanampatti, Coimbatore',
    area_sqft: '3,75,500',
    areaNumber: 375500,
    category: 'Residential',
    categoryLabel: 'Gated Residential Community',
    status: 'Active / Current',
    scope: ['Domestic Plumbing', 'Storm Water Drainage', 'Power Reticulation', 'Fire Safety'],
    description: 'Full-scope building services coordination for contemporary apartment community, designed for sustainable water management, energy-efficient illumination, and reliable power distribution.',
    featured: false,
    tag: 'Gated Community'
  },
  {
    id: 6,
    slNo: 6,
    title: 'The Proposed Police station Building',
    client: 'Public Works & Civic Infrastructure',
    location: 'Kelambakkam, Chennai',
    area_sqft: '25,000',
    areaNumber: 25000,
    category: 'Institutional',
    categoryLabel: 'Civic & Public Safety Facility',
    status: 'Active / Current',
    scope: ['24/7 Essential Power Backup', 'Sanitary Infrastructure', 'Fire Safety', 'Surveillance Pathways'],
    description: 'Civic safety facility engineering with continuous emergency power back-up, robust public-health plumbing fixtures, lightning protection, and integrated communication conduit systems.',
    featured: false,
    tag: 'Civic Facility'
  },
  {
    id: 7,
    slNo: 7,
    title: 'The Proposed development building "ICGS"',
    client: 'Indian Coast Guard Station / Defence',
    location: 'Ratnagiri, Goa',
    area_sqft: '3,00,000',
    areaNumber: 300000,
    category: 'Institutional',
    categoryLabel: 'Strategic Government & Defence Facility',
    status: 'Active / Current',
    scope: ['Mission-Critical Power', 'Coastal HVAC Coordination', 'Fire Pumping Mains', 'Heavy Drainage'],
    description: 'Strategic defence facility MEP engineering with coastal corrosion-resistant specifications, uninterrupted standby DG synchronization, dedicated fire suppression pump houses, and high-security services routing.',
    featured: true,
    tag: 'Strategic Defence'
  },
  {
    id: 8,
    slNo: 8,
    title: 'The proposed "INSTA" School building',
    client: 'INSTA Educational Trust',
    location: 'Kolathur, Chennai',
    area_sqft: '3,50,000',
    areaNumber: 350000,
    category: 'Institutional',
    categoryLabel: 'Educational & Institutional Campus',
    status: 'Active / Current',
    scope: ['Campus Power Distribution', 'Child-Safe Plumbing', 'Fire Alarm Systems', 'Ventilation'],
    description: 'Specialized building services design for multi-block academic campus, prioritizing life-safety evacuation compliance, natural ventilation enhancement, and child-safe sanitary infrastructure.',
    featured: false,
    tag: 'Education Campus'
  },
  {
    id: 9,
    slNo: 9,
    title: 'The Proposed S & P Office Building',
    client: 'S & P Aspirational Spaces',
    location: 'OMR, Chennai',
    area_sqft: '35,000',
    areaNumber: 35000,
    category: 'Commercial',
    categoryLabel: 'Corporate Office Building',
    status: 'Active / Current',
    scope: ['HVAC Coordination', 'Commercial Power Distribution', 'Lighting Design', 'Fire Alarms'],
    description: 'Corporate headquarters MEP planning along Chennai’s IT corridor, featuring energy-conscious LED lighting controls, VRF air conditioning coordination, and structured low-voltage cabling pathways.',
    featured: false,
    tag: 'Corporate Office'
  },
  {
    id: 10,
    slNo: 10,
    title: 'The Proposed residential apartment',
    client: 'Urban Housing Development',
    location: 'Korattur, Chennai',
    area_sqft: '35,000',
    areaNumber: 35000,
    category: 'Residential',
    categoryLabel: 'Urban Residential Apartments',
    status: 'Active / Current',
    scope: ['Domestic Plumbing', 'Electrical Metering Panels', 'Booster Pumps', 'Terrace Drainage'],
    description: 'Compact urban apartment services design with space-optimized plumbing vertical shafts, individual utility metering distribution boards, and gravity-fed water supply networks.',
    featured: false,
    tag: 'Urban Housing'
  },
  {
    id: 11,
    slNo: 11,
    title: 'The Proposed residential Development "RooHi"',
    client: 'RooHi Living',
    location: 'Saidapet, Chennai',
    area_sqft: '25,000',
    areaNumber: 25000,
    category: 'Residential',
    categoryLabel: 'Boutique Urban Residence',
    status: 'Active / Current',
    scope: ['Boutique Residence Electrical', 'Piping Networks', 'Rainwater Harvesting', 'Low Voltage'],
    description: 'High-end urban dwelling building services, featuring tailored concealed sanitary installations, acoustic pipe insulation, smart home conduit provisions, and terrace rainwater detention.',
    featured: false,
    tag: 'Boutique Living'
  }
];

const defaultProjects = [
  { title: 'The Proposed Dormitory development "Tata Electronics"', location: 'Hosur, Tamil Nadu', area_sqft: '15,00,000' },
  { title: 'The Proposed residential Building "Casagrande"', location: 'Korattur, Chennai', area_sqft: '5,75,000' },
  { title: 'The Proposed development building "ICGS"', location: 'Ratnagiri, Goa', area_sqft: '3,00,000' }
];

function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('area-desc');

  useEffect(() => {
    document.title = "Selected Projects | GGA MEP Design Consultants";
  }, []);

  const categories = [
    { id: 'All', label: 'All Projects', count: ggaProjects.length },
    { id: 'Residential', label: 'Residential', count: ggaProjects.filter((p) => p.category === 'Residential').length },
    { id: 'Industrial', label: 'Industrial & Campuses', count: ggaProjects.filter((p) => p.category === 'Industrial').length },
    { id: 'Institutional', label: 'Institutional & Civic', count: ggaProjects.filter((p) => p.category === 'Institutional').length },
    { id: 'Commercial', label: 'Commercial', count: ggaProjects.filter((p) => p.category === 'Commercial').length }
  ];

  const filteredProjects = useMemo(() => {
    return ggaProjects
      .filter((project) => {
        const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = !q || (
          project.title.toLowerCase().includes(q) ||
          project.client.toLowerCase().includes(q) ||
          project.location.toLowerCase().includes(q) ||
          project.categoryLabel.toLowerCase().includes(q) ||
          project.scope.some((s) => s.toLowerCase().includes(q))
        );
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'area-desc') return b.areaNumber - a.areaNumber;
        if (sortBy === 'area-asc') return a.areaNumber - b.areaNumber;
        return a.slNo - b.slNo;
      });
  }, [activeCategory, searchQuery, sortBy]);

  const totalFilteredArea = filteredProjects.reduce((sum, p) => sum + p.areaNumber, 0);

  return (
    <div className="projects-page-wrapper">
      {/* Page Hero */}
      <section className="page-hero">
        <EngineeringBackground variant="page" />
        <div className="container page-hero-inner">
          <div>
            <span className="eyebrow">
              <span className="dot"></span> PROJECT EXPERIENCE PORTFOLIO
            </span>
            <h1>Selected Projects</h1>
            <p>
              Engineering excellence across 37,70,000+ sq.ft of residential, industrial, institutional, and commercial developments.
            </p>
          </div>
          <PencilMark />
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section projects-showcase-section">
        <EngineeringBackground variant="light" />
        <div className="container">
          
          {/* Executive Portfolio Stats Ribbon */}
          <div className="projects-stats-ribbon">
            <div className="project-stat-box">
              <span className="stat-number">37.7L+</span>
              <span className="stat-unit">SQ. FT</span>
              <span className="stat-caption">Total Coordinated Area</span>
            </div>
            <div className="project-stat-sep" aria-hidden="true"></div>
            <div className="project-stat-box">
              <span className="stat-number">11</span>
              <span className="stat-unit">CURRENT PROJECTS</span>
              <span className="stat-caption">Active Engineering Portfolio</span>
            </div>
            <div className="project-stat-sep" aria-hidden="true"></div>
            <div className="project-stat-box">
              <span className="stat-number">4</span>
              <span className="stat-unit">CORE SECTORS</span>
              <span className="stat-caption">Residential, Industrial, Institutional, Commercial</span>
            </div>
            <div className="project-stat-sep" aria-hidden="true"></div>
            <div className="project-stat-box">
              <span className="stat-number">100%</span>
              <span className="stat-unit">COORDINATED</span>
              <span className="stat-caption">Clash-Free Design Delivery</span>
            </div>
          </div>

          {/* Interactive Filter & View Toolbar */}
          <div className="projects-toolbar">
            <div className="toolbar-left">
              <div className="category-tabs" role="tablist">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                    role="tab"
                    aria-selected={activeCategory === cat.id}
                  >
                    <span>{cat.label}</span>
                    <span className="tab-badge">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="toolbar-right">
              {/* Search Box */}
              <div className="project-search-box">
                <span className="search-icon" aria-hidden="true">🔍</span>
                <input
                  type="text"
                  placeholder="Search project, location, client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search projects"
                />
                {searchQuery && (
                  <button className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">×</button>
                )}
              </div>

              {/* Sort Selector */}
              <select
                className="project-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort projects"
              >
                <option value="area-desc">Largest Area First</option>
                <option value="area-asc">Smallest Area First</option>
                <option value="sl-asc">Official List Order (SL. No)</option>
              </select>

              {/* View Switcher Toggle */}
              <div className="view-toggle" role="group" aria-label="Select view mode">
                <button
                  className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                  aria-pressed={viewMode === 'grid'}
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="1" y="1" width="6" height="6" rx="1"/>
                    <rect x="9" y="1" width="6" height="6" rx="1"/>
                    <rect x="1" y="9" width="6" height="6" rx="1"/>
                    <rect x="9" y="9" width="6" height="6" rx="1"/>
                  </svg>
                  <span>Cards</span>
                </button>
                <button
                  className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                  title="Official Table View"
                  aria-pressed={viewMode === 'table'}
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="1" y="2" width="14" height="2" rx="0.5"/>
                    <rect x="1" y="7" width="14" height="2" rx="0.5"/>
                    <rect x="1" y="12" width="14" height="2" rx="0.5"/>
                  </svg>
                  <span>Official Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Result Count Banner */}
          <div className="results-status-bar">
            <span>Showing <strong>{filteredProjects.length}</strong> of <strong>{ggaProjects.length}</strong> projects</span>
            <span className="results-total-area">Filtered Cumulative Area: <strong>{totalFilteredArea.toLocaleString('en-IN')} SQ.FT</strong></span>
          </div>

          {/* VIEW MODE 1: GRID VIEW */}
          {viewMode === 'grid' && (
            <div className="projects-card-grid">
              {filteredProjects.map((project) => (
                <article className="portfolio-card" key={project.id}>
                  {/* Top Bar */}
                  <div className="card-header-bar">
                    <span className="project-sl-pill">#{String(project.slNo).padStart(2, '0')}</span>
                    <span className={`project-cat-badge cat-${project.category.toLowerCase()}`}>
                      {project.category}
                    </span>
                    {project.featured && <span className="featured-flag">★ Landmark</span>}
                  </div>

                  {/* Title & Client */}
                  <h3 className="card-title">{project.title}</h3>
                  <div className="card-client-row">
                    <span className="client-marker">Client:</span>
                    <strong>{project.client}</strong>
                  </div>

                  {/* Location & Area Highlight */}
                  <div className="card-location-row">
                    <span className="location-pin" aria-hidden="true">📍</span>
                    <span>{project.location}</span>
                  </div>

                  <div className="area-highlight-box">
                    <span className="area-label">BUILT-UP AREA</span>
                    <strong className="area-val">{project.area_sqft} <small>SQ.FT</small></strong>
                  </div>

                  {/* Description */}
                  <p className="card-desc">{project.description}</p>

                  {/* Scope Badges */}
                  <div className="card-scope-list">
                    {project.scope.map((s) => (
                      <span className="scope-tag" key={s}>{s}</span>
                    ))}
                  </div>

                  {/* Card Action Footer */}
                  <div className="card-action-footer">
                    <span className="project-status-dot">
                      <i></i> {project.status}
                    </span>
                    <Link className="project-inquire-link" to="/contact-us">
                      Inquire Scope ↗
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* VIEW MODE 2: OFFICIAL TABLE VIEW */}
          {viewMode === 'table' && (
            <div className="table-responsive-container">
              <table className="official-projects-table" aria-label="GGA Current Projects List">
                <thead>
                  <tr>
                    <th scope="col" className="col-sl">SL, NO</th>
                    <th scope="col" className="col-desc">PROJECT DETAILS & CLIENT</th>
                    <th scope="col" className="col-cat">SECTOR</th>
                    <th scope="col" className="col-loc">LOCATION</th>
                    <th scope="col" className="col-scope">SERVICES SCOPE</th>
                    <th scope="col" className="col-area">AREA IN SQ.FT</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className={project.featured ? 'row-featured' : ''}>
                      <td className="cell-sl">
                        <span className="table-sl-badge">{project.slNo}</span>
                      </td>
                      <td className="cell-details">
                        <strong className="table-project-title">{project.title}</strong>
                        <div className="table-client-sub">
                          <span>Client: <strong>{project.client}</strong></span>
                          {project.featured && <span className="table-landmark-tag">Landmark</span>}
                        </div>
                      </td>
                      <td className="cell-cat">
                        <span className={`table-cat-pill cat-${project.category.toLowerCase()}`}>
                          {project.category}
                        </span>
                      </td>
                      <td className="cell-loc">
                        <span className="table-loc-text">📍 {project.location}</span>
                      </td>
                      <td className="cell-scope">
                        <div className="table-scope-tags">
                          {project.scope.map((s) => (
                            <span key={s}>{s}</span>
                          ))}
                        </div>
                      </td>
                      <td className="cell-area">
                        <span className="table-area-number">{project.area_sqft}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="5" className="table-total-label">
                      TOTAL CUMULATIVE AREA ({filteredProjects.length} Projects)
                    </td>
                    <td className="table-total-value">
                      {totalFilteredArea.toLocaleString('en-IN')} SQ.FT
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* Bottom Consultation CTA Banner */}
          <div className="projects-bottom-cta">
            <div className="cta-left">
              <span className="cta-kicker">HAVE A RESIDENTIAL, INDUSTRIAL OR COMMERCIAL PROJECT?</span>
              <h2>Ready to engineer clash-free building systems?</h2>
              <p>
                From 25,000 sq.ft civic centers to 15,00,000 sq.ft industrial campuses, GGA provides coordinated plumbing, electrical, firefighting, and HVAC designs with on-site engineering support.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-yellow" to="/contact-us">Discuss your project scope ↗</Link>
              <a className="btn btn-outline" href={WA} target="_blank" rel="noreferrer">Quick WhatsApp Chat ↗</a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

function ContentPage() {
  const { slug } = useParams();
  if (slug === 'projects') {
    return <ProjectsPage />;
  }
  const fallback = FALLBACK[slug] || FALLBACK['about-us'];
  const page = useData(`/pages/${slug}`, fallback);
  useEffect(()=>{ document.title = page.seo_title || `${page.title} | GGA MEP Design Consultants`; const meta=document.querySelector('meta[name="description"]'); if(meta && page.seo_description) meta.content=page.seo_description; },[page,slug]);
  const services = useData('/services', []);
  return <><section className="page-hero"><EngineeringBackground variant="page"/><div className="container page-hero-inner"><div><span className="eyebrow"><span className="dot"></span> GGA DESIGN CONSULTANTS</span><h1>{page.title}</h1><p>{page.subtitle}</p></div><PencilMark/></div></section>
    <section className="section"><EngineeringBackground variant="light"/><div className="container content-layout"><div className="content-main"><span className="eyebrow dark">GET GREAT ADVICE</span><h2>{page.subtitle}</h2><p className="body-copy">{page.body}</p>
      {slug==='services' && <>
        <div className="services-intro">
          <span className="services-kicker">OUR CORE CAPABILITIES</span>
          <h2>MEP design services, clearly coordinated.</h2>
          <p>GGA's company profile lists plumbing, electrical and fire-fighting design services, including fire-alarm systems. HVAC is also listed among the company's service areas. The exact deliverables are agreed for each project.</p>
        </div>
        <div className="services-detail-grid">
          {[
            {number:'01',title:'Plumbing Design',intro:'Water supply, drainage and water-management systems for buildings.',items:['Drainage collection and disposal systems','Internal and external plumbing systems','Water supply collection and distribution','Booster systems for water distribution','Storm-water design and discharge','Rainwater harvesting systems','Sewage treatment plant (STP)','Water treatment plant (WTP)'],icon:'↗'},
            {number:'02',title:'Electrical Design',intro:'Building electrical design and power-distribution support.',items:['Electrical load calculations','Power distribution system design','Earthing systems','Low-voltage building automation, communication, safety, surveillance and networks','HT/LT power distribution, panels and cabling','Lighting design and luminaire selection','DC distribution systems','Electrical design for building services','DG sets and transformers','UPS (uninterruptible power supply)'],icon:'ϟ'},
            {number:'03',title:'Fire-Fighting Design',intro:'Fire-protection systems and hydraulic design support.',items:['Internal and external hydrant systems','Fire pump room design coordination','Sprinkler systems','Fire-system hydraulic calculations','Fire extinguishers','Fire-safety signage'],icon:'✳'},
            {number:'04',title:'Fire Alarm Systems',intro:'Fire-alarm systems included in GGA’s listed building-safety services.',items:['Fire-alarm system design coordination','Coordination with related building services','Project-specific scope and requirements review'],icon:'◎'},
            {number:'05',title:'HVAC Design',intro:'HVAC is listed as a GGA service area on the company business card.',items:['Discuss HVAC design requirements for your project','Coordinate the agreed scope with other MEP services','Confirm project-specific deliverables during consultation'],icon:'⌁'}
          ].map((service)=><article className="service-detail-card" key={service.number}>
            <div className="service-detail-top"><span className="service-detail-icon" aria-hidden="true">{service.icon}</span><span className="service-detail-number">{service.number}</span></div>
            <h3>{service.title}</h3><p className="service-detail-intro">{service.intro}</p>
            <ul>{service.items.map((item)=><li key={item}>{item}</li>)}</ul>
          </article>)}
        </div>
        <section className="scope-work">
          <div className="scope-heading"><span className="services-kicker">PROJECT SUPPORT</span><h2>Scope of work</h2><p>As described in the GGA MEP company profile, support may include the following activities, subject to the agreed project scope.</p></div>
          <div className="scope-grid">
            {[
              'Coordination with design stakeholders for detailed MEP design development',
              'Coordination with the builder, architect and structural consultant for concept closure',
              'Site visits and meetings to support execution as per design',
              'Technical clarifications and RFI clearance',
              'Technical support for finalisation of specifications',
              'Technical support for tender coordination',
              'Issuance of GFC drawings in soft and hard copy',
              'Review and approval of vendor shop drawings and GA drawings'
            ].map((item,index)=><div className="scope-item" key={item}><span>{String(index+1).padStart(2,'0')}</span><p>{item}</p></div>)}
          </div>
        </section>
        <section className="services-cta">
          <div><span className="services-kicker">HAVE A PROJECT IN MIND?</span><h2>Let's discuss your MEP design requirements.</h2><p>Share your project type, location and required services with the GGA team.</p></div>
          <Link className="btn btn-yellow" to="/contact-us">Discuss your project ↗</Link>
        </section>
      </>}
      {slug==='about-us' && <div className="detail-list">{['MEP design development coordination','Coordination with builders, architects and structural consultants','Site visits and meetings to support execution as per design','Technical clarifications and RFI clearance','Specification finalisation and tender coordination','GFC drawing issuance in soft and hard copy','Review of vendor shop and GA drawings'].map((x,i)=><article key={x}><span className="detail-num">0{i+1}</span><div><h3>{x}</h3><p>Project-specific support agreed according to scope, programme and applicable requirements.</p></div></article>)}</div>}
    </div><aside className="contact-card"><span className="eyebrow">LET'S TALK</span><h3>Have a project in mind?</h3><p>Tell us about your building and MEP design requirements.</p><Link className="btn btn-yellow" to="/contact-us">Contact GGA ↗</Link><div className="aside-rule"></div><p className="aside-contact">✉ <a href="mailto:ggamepconsultant@gmail.com">ggamepconsultant@gmail.com</a></p><p className="aside-contact">☎ <a href="tel:+918489274385">+91 8489274385</a></p></aside></div></section>
  </>;
}

function Contact() {
 const settings=useData('/settings',{});
 const [form,setForm]=useState({name:'',email:'',phone:'',message:''});
 const [status,setStatus]=useState('');
 const update=e=>setForm({...form,[e.target.name]:e.target.value});
 async function submit(e){e.preventDefault();setStatus('Sending...');try{const r=await fetch(`${API}/contact`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});const d=await r.json();if(!r.ok)throw new Error(d.error||'Could not send');setStatus(d.message);setForm({name:'',email:'',phone:'',message:''});}catch(err){setStatus(err.message+' (Check that the API is running.)');}}
 const officeAddress = settings.office_address || 'Flat No B, Vallabari Apartment, Vallal Pari Street, Ram Nagar, Madipakkam, Chennai 600091';
 const mapQuery = encodeURIComponent(officeAddress);

 return <>
  <section className="page-hero"><EngineeringBackground variant="page"/><div className="container page-hero-inner"><div><span className="eyebrow"><span className="dot"></span> START A CONVERSATION</span><h1>Contact GGA</h1><p>Tell us about your project. We’ll get back to you.</p></div><PencilMark/></div></section>
  <section className="section"><EngineeringBackground variant="light"/><div className="container contact-layout"><div className="contact-details"><span className="eyebrow dark">CONTACT DETAILS</span><h2>Let's discuss<br/><em>your next project.</em></h2><p>Reach out to discuss MEP design scope, coordination, drawings or technical support.</p><div className="contact-detail"><span>EMAIL</span><a href="mailto:ggamepconsultant@gmail.com">{settings.contact_email||'ggamepconsultant@gmail.com'}</a></div><div className="contact-detail"><span>PHONE</span><a href="tel:+918489274385">{settings.contact_phone||'+91 8489274385'}</a></div><div className="contact-detail"><span>OFFICE</span><p>{officeAddress}</p></div><a className="btn btn-dark" href={WA} target="_blank" rel="noreferrer">Message us on WhatsApp ↗</a></div>
  <form className="contact-form" onSubmit={submit}><h3>Send an enquiry</h3><p>Fields marked * are required.</p><label>Full name *<input name="name" value={form.name} onChange={update} required maxLength="120" placeholder="Your name"/></label><label>Email address *<input name="email" type="email" value={form.email} onChange={update} required maxLength="254" placeholder="you@example.com"/></label><label>Phone number<input name="phone" value={form.phone} onChange={update} placeholder="+91" /></label><label>How can we help? *<textarea name="message" value={form.message} onChange={update} required maxLength="5000" rows="5" placeholder="Tell us a little about your project..."/></label><button className="btn btn-yellow" type="submit">Send enquiry ↗</button>{status&&<p className="form-status" role="status">{status}</p>}</form></div></section>
  <section className="map-section">
    <div className="container">
      <div className="map-card">
        <div className="map-header">
          <div>
            <span className="eyebrow dark">LOCATION</span>
            <h3>Our Office in Chennai</h3>
            <p>{officeAddress}</p>
          </div>
          <a className="btn btn-outline-dark" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer">Open in Google Maps ↗</a>
        </div>
        <div className="map-frame-wrapper">
          <iframe
            title="GGA MEP Design Consultants Office Location"
            src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </section>
 </>;
}

function Footer({ settings }) {
  return (
    <footer className="footer">
      <div className="footer-clients-bar">
        <div className="container footer-clients-header">
          <div className="clients-header-left">
            <div>
              <span className="clients-kicker-dot"></span>
              <span className="clients-kicker-text">OUR ESTEEMED CLIENTS & DEVELOPERS</span>
            </div>
            <h4 className="clients-header-title">Trusted by India’s Premier Builders & Developers</h4>
          </div>
          <div className="clients-header-right">
            <span className="clients-badge-pill">
              <strong>100+</strong> Projects Coordinated
            </span>
          </div>
        </div>

        <div className="footer-marquee-wrapper" aria-label="GGA client logos carousel">
          <div className="footer-marquee-track">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
              <div className="premium-client-card" key={`${logo.name}-footer-${index}`}>
                <div className="client-logo-stage">
                  <img src={logo.src} alt={`${logo.name} logo`} loading="lazy" />
                </div>
                <span className="client-brand-name">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-main">
        <div>
          <Link to="/" className="brand footer-brand" aria-label="GGA home">
            <img src="/images/gga-logo.jpg" alt="GGA - GET GREAT ADVICE" className="brand-logo-img footer-logo-img" />
          </Link>
          <p>MEP design consultants supporting coordinated building-services design.</p>
        </div>
        <div>
          <h4>EXPLORE</h4>
          <Link to="/about-us">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact-us">Contact</Link>
        </div>
        <div>
          <h4>GET IN TOUCH</h4>
          <a href="mailto:ggamepconsultant@gmail.com">{settings.contact_email || 'ggamepconsultant@gmail.com'}</a>
          <a href="tel:+918489274385">{settings.contact_phone || '+91 8489274385'}</a>
          <a href={WA} target="_blank" rel="noreferrer">WhatsApp ↗</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} GGA Design Consultants</span>
        <span>*Experience statement based on the company profile; verify before publishing.</span>
      </div>
    </footer>
  );
}

function FloatingActions({ settings }) {
  const phone = settings?.contact_phone || '+91 8489274385';
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const waUrl = settings?.whatsapp_number
    ? `https://wa.me/${String(settings.whatsapp_number).replace(/\D/g, '')}?text=${encodeURIComponent('Hello GGA, I would like to discuss an MEP design requirement.')}`
    : WA;

  return (
    <aside className="floating-actions" aria-label="Quick contact options">
      <a
        className="floating-btn floating-phone"
        href={`tel:${cleanPhone}`}
        aria-label="Call GGA MEP Consultants"
        title="Call Us"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/>
        </svg>
        <span className="floating-tooltip">Call Us</span>
      </a>
      <a
        className="floating-btn floating-wa"
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with GGA on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
          <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.97.57 3.805 1.554 5.358L2 22l4.757-1.516c1.498.906 3.25 1.42 5.12 1.42 5.535 0 10.031-4.496 10.031-10.031C21.908 6.496 17.566 2 12.031 2zm0 18.257c-1.688 0-3.26-.504-4.59-1.37l-.33-.215-2.822.899.914-2.738-.236-.35a8.214 8.214 0 0 1-1.282-4.452c0-4.57 3.716-8.286 8.286-8.286 4.57 0 8.286 3.716 8.286 8.286 0 4.57-3.716 8.286-8.286 8.286zm4.536-6.195c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062-.249-.125-1.05-.387-2-1.234-.739-.659-1.238-1.473-1.383-1.722-.145-.249-.015-.383.109-.507.112-.112.249-.29.373-.435.124-.145.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.124-.56-1.349-.768-1.847-.202-.485-.407-.419-.56-.427l-.477-.008c-.166 0-.435.062-.663.311-.228.249-.87 1.017-.87 2.479 0 1.462 1.064 2.875 1.213 3.082.149.207 2.095 3.2 5.076 4.487.709.307 1.263.49 1.695.627.712.227 1.36.195 1.872.119.571-.085 1.758-.718 2.007-1.412.249-.694.249-1.289.174-1.414-.075-.125-.241-.207-.49-.332z"/>
        </svg>
        <span className="floating-tooltip">WhatsApp</span>
      </a>
    </aside>
  );
}

export default function App() {
 const settings=useData('/settings',{});
 return <><Header settings={settings}/><main><Routes><Route path="/" element={<Home/>}/><Route path="/about-us" element={<ContentPage/>}/><Route path="/services" element={<ContentPage/>}/><Route path="/projects" element={<ProjectsPage/>}/><Route path="/contact-us" element={<Contact/>}/></Routes></main><Footer settings={settings}/><FloatingActions settings={settings}/></>;
}
