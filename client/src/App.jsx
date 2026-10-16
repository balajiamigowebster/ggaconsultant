import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import ToptoScroll from './ToptoScroll.jsx';

import API from './config.js';
const WA = 'https://wa.me/918489274385?text=' + encodeURIComponent('Hello GGA, I would like to discuss an MEP design requirement.');
const FALLBACK = {
  'home': { title:'GGA MEP Design Consultants', subtitle:'Thoughtful MEP design for buildings that work better.', body:'Coordinated plumbing, electrical, firefighting and building-services design support for projects across India and the Gulf.' },
  'about-us': { title:'About GGA MEP Design Consultants', subtitle:'Designing Smarter Buildings. Engineering Safer Futures.', body:'GGA MEP Design Consultants provides specialized engineering consultancy services in Plumbing, Electrical, Firefighting, and Fire Alarm System Design. We focus on delivering innovative, efficient, cost-effective, and safety-oriented engineering design solutions for residential, commercial, industrial, and institutional developments.' },
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
      <div className="service-grid">{(services.length?services:defaultServices).slice(0,5).map((s,i)=>{
        const disciplineKeys = ['plumbing','electrical','fire-fighting','fire-alarm','hvac'];
        const targetKey = s.slug ? s.slug.replace('-design', '').replace('-systems', '') : disciplineKeys[i];
        return (
          <article className="service-card" key={s.id||s.slug}>
            <div className="service-icon">{['💧','⚡','🧯','🔔','❄️'][i]}</div>
            <span className="card-number">0{i+1}</span>
            <h3>{s.title}</h3>
            <p>{s.summary}</p>
            <Link to={`/services?discipline=${targetKey}`}>Explore discipline <span>↗</span></Link>
          </article>
        );
      })}</div>
    </div></section>
    <section className="dark-band"><EngineeringBackground variant="band"/><div className="container band-inner"><div><span className="eyebrow">HOW WE SUPPORT YOU</span><h2>Clear coordination.<br/><em>Confident execution.</em></h2></div><Link className="btn btn-yellow" to="/about-us">Discover GGA <span>↗</span></Link></div></section>
    <section className="section projects-preview">
      <EngineeringBackground variant="light"/>
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow dark">PROJECT EXPERIENCE</span>
            <h2>Many building types.<br/><em>One coordinated approach.</em></h2>
          </div>
          <Link className="text-link" to="/projects">View project list ↗</Link>
        </div>
        <div className="project-grid">
          {(projects.length ? projects : defaultProjects).slice(0, 3).map((p, i) => {
            const projectImg = p.image || `/images/project-${i + 1}.jpeg`;
            return (
              <article className="project-card" key={p.id || p.title}>
                <div className={`project-art project-art-${i + 1}`}>
                  <span>{p.location || 'PROJECT EXPERIENCE'}</span>
                  <img
                    src={projectImg}
                    alt={p.title}
                    className="project-cover-img"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="project-img-overlay"></div>
                </div>
                <div className="project-info">
                  <h3>{p.title}</h3>
                  <p>{p.location}{p.area_sqft ? ' · ' + p.area_sqft + ' sq.ft' : ''}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
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

                  {/* Built-up Area (Commented out)
                  <div className="area-highlight-box">
                    <span className="area-label">BUILT-UP AREA</span>
                    <strong className="area-val">{project.area_sqft} <small>SQ.FT</small></strong>
                  </div>
                  */}

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

const ggaServices = [
  {
    id: 'plumbing-design',
    disciplineKey: 'plumbing',
    disciplineNumber: '01',
    badge: 'PUBLIC HEALTH ENGINEERING (PHE)',
    title: 'Plumbing & Public Health Engineering',
    shortTitle: 'Plumbing (PHE)',
    tagline: 'Water balance, hydro-pneumatic boosting, drainage collection & treatment plant engineering.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="discipline-svg">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        <path d="M12 11v6"/>
        <path d="M9 14h6"/>
      </svg>
    ),
    statHighlight: { value: '40%+', label: 'Water Recycled via STP/RWH Design' },
    summary: 'Comprehensive PHE design from raw water intake, treatment and hydro-pneumatic pumping to internal sanitary fixtures, dual-stack drainage, and sustainable stormwater management.',
    description: "GGA delivers comprehensive Public Health Engineering (PHE) consulting tailored to high-occupancy commercial towers, manufacturing campuses, and gated residential communities. Every schematic complies with CPHEEO manuals, NBC 2016 Part 9, and Uniform Plumbing Code (UPC-I) guidelines to ensure water conservation, sanitary hygiene, and optimal lifecycle durability.",
    coreScope: [
      'Internal & external cold and hot water distribution networks',
      'Hydro-pneumatic booster pumping systems & gravity overhead tank sizing',
      'Soil, waste, and vent drainage collection networks with dual-stack venting',
      'Stormwater runoff management, external storm drainage & rainwater harvesting (RWH)',
      'Sewage Treatment Plant (STP) & Effluent Treatment Plant (ETP) space and hydraulic coordination',
      'Water Treatment Plant (WTP) filtration, softening & RO system planning',
      'Basement sub-soil drainage and automated dewatering sump pump systems',
      'Solar water heating integration & centralized hot water return circulation'
    ],
    standards: [
      { code: 'NBC 2016 Part 9', name: 'Plumbing Services & Sanitation Norms' },
      { code: 'CPHEEO Manual', name: 'Water Supply & Sewerage Design Guidelines' },
      { code: 'IS 1172 & IS 2065', name: 'Basic Requirements for Water Supply & Drainage' },
      { code: 'UPC-I', name: 'Uniform Plumbing Code of India' }
    ],
    deliverables: [
      'Water Supply Schematics & Pipe Sizing Hydraulic Calculations',
      'Soil & Waste Riser Diagrams with Designated Invert Levels',
      'External Utility Infrastructure & Inspection Chamber Layouts',
      'Pumping Station & Plant Room Detailed GA Layouts',
      'Comprehensive Bill of Quantities (BOQ) & Valve Schedules'
    ]
  },
  {
    id: 'electrical-design',
    disciplineKey: 'electrical',
    disciplineNumber: '02',
    badge: 'ELECTRICAL & LOW VOLTAGE (LV / ELV)',
    title: 'Electrical & Power Distribution Systems',
    shortTitle: 'Electrical & ELV',
    tagline: 'High-voltage substations, low-voltage distribution, backup generation, and integrated building automation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="discipline-svg">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    statHighlight: { value: '0.98+', label: 'Target Power Factor Optimization' },
    summary: 'End-to-end power engineering covering HT/LT substations, transformer sizing, DG synchronization, busways, illumination design, and integrated ELV/BMS systems.',
    description: "From high-capacity transformer substations to precision lighting and ELV safety networks, GGA designs robust power infrastructures that maximize energy efficiency, safeguard against harmonic distortion, and guarantee uninterrupted continuity.",
    coreScope: [
      'HT Substation, HT/LT Transformer sizing & switchgear configuration',
      'Electrical connected load, maximum demand & diversity factor calculations',
      'Diesel Generator (DG) synchronization & auto-mains failure (AMF) control logic',
      'Uninterruptible Power Supply (UPS) centralized & localized systems',
      'Main LT Panel, Sub-Distribution Boards (SDB), and intelligent metering',
      'Cable tray routing, bus-duct systems & vertical electrical riser detailing',
      'Lighting simulation, lux-level calculations & architectural luminaire layout',
      'Chemical earthing, lightning protection grids (as per IS/IEC 62305)',
      'Low Voltage (ELV): Structured cabling, CCTV, Access Control & Building Automation (BMS)'
    ],
    standards: [
      { code: 'IS 732 & IS 3043', name: 'Wiring Installations & Chemical Earthing' },
      { code: 'NBC 2016 Part 8 Sec 2', name: 'Electrical & Allied Installations' },
      { code: 'CEA Regulations 2010', name: 'Central Electricity Authority Safety Norms' },
      { code: 'IS/IEC 62305', name: 'Protection Against Lightning & Surges' }
    ],
    deliverables: [
      'Comprehensive Single Line Diagrams (HT/LT SLD)',
      'Power, Small Power & Raw Power Floor Distribution Layouts',
      'Indoor & Outdoor Lighting Layouts with Circuiting Schedules',
      'Earthing & Lightning Protection Grid Shop Layouts',
      'Substation & Electrical Room Layouts with Statutory Clearances'
    ]
  },
  {
    id: 'fire-fighting-design',
    disciplineKey: 'fire-fighting',
    disciplineNumber: '03',
    badge: 'FIRE FIGHTING & HYDRAULIC SUPPRESSION',
    title: 'Fire Fighting & Hydraulic Suppression',
    shortTitle: 'Fire Fighting',
    tagline: 'Fully compliant hydrant, wet-riser, automated sprinkler, and high-pressure fire pump room engineering.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="discipline-svg">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
      </svg>
    ),
    statHighlight: { value: '100%', label: 'First-Pass Fire NOC Approval Rate' },
    summary: 'Life-safety hydraulic suppression engineering featuring internal wet-risers, yard hydrants, automated sprinkler networks, and dedicated high-pressure fire pump stations.',
    description: "GGA delivers life-critical fire safety suppression engineering compliant with NBC 2016 Part 4, NFPA standards, and state Fire and Rescue Services department requirements. We protect high-rise occupants and high-value capital assets.",
    coreScope: [
      'Hydraulic node calculation & water demand sizing for fire reserves',
      'Internal wet-riser system with landing valves & first-aid hose reels',
      'External yard hydrant ring mains with landing valves and breeching inlets',
      'Automated wet-pipe sprinkler grid layout for basements and occupied floors',
      'Dedicated fire pump room layout (Main Electric, Standby Diesel, Jockey & Booster pumps)',
      'Pre-action sprinkler & clean agent gaseous suppression for server rooms & substations',
      'Deluge water spray system for transformers and flammable fuel storage',
      'Portable & trolley fire extinguisher allocation and statutory escape signage'
    ],
    standards: [
      { code: 'NBC 2016 Part 4', name: 'Fire & Life Safety Standards' },
      { code: 'IS 3844 & IS 15105', name: 'Hydrant & Sprinkler Design Codes' },
      { code: 'NFPA 13, 14, 20', name: 'National Fire Protection Association Standards' },
      { code: 'State Fire Authority', name: 'Fire and Rescue Services Department NOC Rules' }
    ],
    deliverables: [
      'Fire Hydraulic Schematic & System P&ID Flow Diagrams',
      'Fire Pump Room GA with Header, Suction & Delivery Sizing',
      'Floor-wise Hydrant & Sprinkler Distribution GFC Plans',
      'Fire Water Underground & Overhead Storage Tank Details',
      'Tender Specification & Fire Department NOC Compliance Packs'
    ]
  },
  {
    id: 'fire-alarm-systems',
    disciplineKey: 'fire-alarm',
    disciplineNumber: '04',
    badge: 'FIRE ALARM & DETECTION SYSTEMS',
    title: 'Fire Alarm & Emergency Detection Systems',
    shortTitle: 'Fire Alarm & Detection',
    tagline: 'Microprocessor addressable detection, smoke management, and integrated emergency evacuation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="discipline-svg">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        <line x1="12" y1="2" x2="12" y2="4"/>
      </svg>
    ),
    statHighlight: { value: '<30s', label: 'Egress Evacuation Warning Response' },
    summary: 'Intelligent analogue addressable fire detection, optical smoke and heat sensor networks, HVAC damper trips, and public address evacuation integration.',
    description: "Early warning is the cornerstone of life safety. GGA designs intelligent analogue addressable fire alarm systems interfacing seamlessly with HVAC fire dampers, elevator grounding, access control door unlocking, and public address evacuation systems.",
    coreScope: [
      'Analogue addressable optical smoke, thermal heat & multi-sensor detector layouts',
      'Main Fire Alarm Control Panel (FACP) & Repeater Panel network architecture',
      'Manual Call Points (MCP) and strobe sounders along statutory exit egress paths',
      'Beam detectors for high-ceiling warehouses, atriums & industrial bays',
      'Duct smoke detectors and interface modules for HVAC fire damper trip',
      'Voice Evacuation & Public Address (PA/VA) integration for zoned phased evacuation',
      'Lift grounding control module & magnetic door release integration',
      'Integration with Building Management System (BMS) and central fire command center'
    ],
    standards: [
      { code: 'IS 2189:2008', name: 'Selection, Installation & Maintenance of Fire Alarms' },
      { code: 'NBC 2016 Part 4', name: 'Life Safety Egress & Emergency Signaling' },
      { code: 'NFPA 72', name: 'National Fire Alarm and Signaling Code' },
      { code: 'EN 54 Standards', name: 'Fire Detection & Alarm System Components' }
    ],
    deliverables: [
      'Fire Alarm System Loop Schematics & Panel Riser Diagrams',
      'Floor-wise Addressable Device Mapping & Cable Route Plans',
      'Fire Interlocking Cause & Effect (Matrix) Logic Sheets',
      'Fire Command Center Ergonomic & Equipment Layouts',
      'Detailed Device Schedule & Cable Sizing Calculations'
    ]
  },
  {
    id: 'hvac-design',
    disciplineKey: 'hvac',
    disciplineNumber: '05',
    badge: 'HVAC & MECHANICAL VENTILATION',
    title: 'HVAC & Mechanical Ventilation Coordination',
    shortTitle: 'HVAC & Ventilation',
    tagline: 'Cooling load calculations, duct spatial routing, basement smoke exhaust, and energy recovery systems.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="discipline-svg">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9"/>
        <path d="M22 12a4.5 4.5 0 0 0-9 0 4.5 4.5 0 0 1-9 0"/>
      </svg>
    ),
    statHighlight: { value: '25%+', label: 'Energy Reduction vs Standard Baselines' },
    summary: 'Thermal comfort and ventilation engineering, including cooling load simulations, VRF and chiller routing, basement smoke extraction, and staircase pressurization.',
    description: "GGA coordinates indoor environmental air quality and thermal comfort with minimal energy consumption. We harmonize duct paths with structural beams and false ceiling heights, preventing site clashes and costly field modifications.",
    coreScope: [
      'Building thermal envelope heat-load analysis & tonnage calculation',
      'Central chilled water plant vs VRF/VRV system selection & feasibility',
      'Air Handling Units (AHU) & Fan Coil Units (FCU) zoning and piping layout',
      'Precision Air Conditioning (PAC) for server rooms and data centers',
      'Basement car park mechanical ventilation & jet fan induction systems',
      'Kitchen exhaust, scrubber systems & fresh air makeup coordination',
      'Toilet exhaust ventilation & shaft riser duct sizing',
      'Staircase & lift well pressurization for smoke-free emergency egress'
    ],
    standards: [
      { code: 'ASHRAE 90.1 & 62.1', name: 'Energy Standard & Indoor Air Quality' },
      { code: 'IS 659', name: 'Safety Code for Air Conditioning' },
      { code: 'NBC 2016 Part 8 Sec 3', name: 'Air Conditioning, Heating & Mechanical Ventilation' },
      { code: 'ECBC Guidelines', name: 'Energy Conservation Building Code Compliance' }
    ],
    deliverables: [
      'HVAC Chilled Water & Refrigerant Piping Schematics',
      'Ductwork Spatial Routing & False Ceiling Level Coordination',
      'Basement Jet Fan & Exhaust Ductwork GFC Layouts',
      'Plant Room & AHU Room Cross-Sectional Elevation Drawings',
      'Equipment Schedules & Acoustic Attenuation Specifications'
    ]
  }
];

const coordinationStages = [
  {
    step: '01',
    title: 'Concept & RFI Closure',
    subtitle: 'Architectural Massing & Utility Alignment',
    desc: 'Reviewing architectural layouts, site contours, municipal water & electrical supply points, and closing critical RFIs before detailing begins.',
    badge: 'Preliminary Phase'
  },
  {
    step: '02',
    title: 'Load Calculations & Sizing',
    subtitle: 'Mathematical Demand Modeling',
    desc: 'Water balance demand, maximum electrical load & diversity factors, fire water reserve sizing, and thermal heat loads.',
    badge: 'Engineering Sizing'
  },
  {
    step: '03',
    title: 'System Architecture & SLDs',
    subtitle: 'Schematics & Flow Logic',
    desc: 'Developing comprehensive Single Line Diagrams (SLDs), hydraulic flow diagrams, vertical zoning, and pump head calculations.',
    badge: 'Schematics'
  },
  {
    step: '04',
    title: 'Shaft & Space Allocation',
    subtitle: 'Plant Room & Riser Footprints',
    desc: 'Sizing dedicated MEP shafts, electrical substation rooms, transformer yards, STP/WTP locations, and underground water sumps.',
    badge: 'Spatial Planning'
  },
  {
    step: '05',
    title: 'Clash-Free Coordination',
    subtitle: 'Cross-Discipline 3D/2D Overlay',
    desc: 'Harmonizing duct routes, pipe sleeves, and cable trays against structural beam depths and architectural false ceiling levels.',
    badge: 'Clash Elimination'
  },
  {
    step: '06',
    title: 'Tender Docs & Detailed BOQ',
    subtitle: 'Commercial & Technical Specifications',
    desc: 'Preparing comprehensive technical specifications, valve schedules, detailed Bill of Quantities (BOQ), and vendor eligibility criteria.',
    badge: 'Procurement Ready'
  },
  {
    step: '07',
    title: 'Good-For-Construction (GFC)',
    subtitle: 'Drawing Release for Site Execution',
    desc: 'Issuing high-precision GFC drawings (soft & hard copies) with precise invert levels, sleeve drop zones, and circuit tags.',
    badge: 'Execution Release'
  },
  {
    step: '08',
    title: 'Vendor GA Review & Site Support',
    subtitle: 'Execution Integrity & Sign-Off',
    desc: 'Reviewing vendor shop drawings, inspecting critical installation milestones, and providing rapid engineering support on site.',
    badge: 'Handover & Quality'
  }
];

const coordinationMatrix = [
  {
    aspect: 'Spatial Coordination & Headroom',
    uncoordinated: 'Clashes between plumbing drops, electrical trays, and HVAC ducts. Punctured RCC beams, dropped ceilings, and risky coring.',
    ggaMethod: 'Dedicated 3D/2D corridor routing with sleeves pre-cast in concrete. Full architectural ceiling height preserved with zero structural coring.'
  },
  {
    aspect: 'Procurement & Cost Control',
    uncoordinated: '15% to 25% budget overruns from on-site dismantling, cut-and-throw pipe waste, and vague contractor lump-sums.',
    ggaMethod: 'Exact Bill of Quantities (BOQ) with itemized schedules and zero scrap margins, delivering predictable contractor bids.'
  },
  {
    aspect: 'Statutory Authority Approvals',
    uncoordinated: 'Frequent rejections and delays in Fire NOC, CEIG electrical inspectorate, and pollution board clearances.',
    ggaMethod: '100% adherence to NBC 2016, NFPA, IS 2189, and CPHEEO standards ensuring rapid first-pass statutory clearances.'
  },
  {
    aspect: 'Construction Handover Timeline',
    uncoordinated: 'Costly contractor disputes, idle labor, and months lost on site while resolving design ambiguities.',
    ggaMethod: 'Smooth, conflict-free site installation backed by clear GFC drawings and prompt technical RFI resolution.'
  }
];

const buildingTypologies = [
  {
    icon: '🏢',
    title: 'High-Rise Residential & Townships',
    desc: 'Optimized PHE booster systems, acoustic drain pipes, and energy-efficient lighting across gated residential towers.'
  },
  {
    icon: '🏭',
    title: 'Industrial Campuses & Dormitories',
    desc: 'Heavy-duty HT substations, high-capacity fire hydrants, and mega dormitory MEP infrastructure up to 15,00,000 sq.ft.'
  },
  {
    icon: '💻',
    title: 'IT Parks & Commercial HQs',
    desc: 'N+1 redundant UPS power, high-efficiency chiller plants, intelligent BMS automation, and addressable life-safety.'
  },
  {
    icon: '🏥',
    title: 'Hospitals & Healthcare Facilities',
    desc: 'Critical medical power separation, isolated grounding, precision ventilation, and ultra-hygienic plumbing networks.'
  },
  {
    icon: '🏛️',
    title: 'Civic, Institutional & Auditoriums',
    desc: 'Acoustically quiet ventilation, high-occupancy egress fire alarms, and continuous emergency back-up generator sets.'
  },
  {
    icon: '🛍️',
    title: 'Commercial Malls & Retail Hubs',
    desc: 'High-density sprinkler grids, smoke spill extraction, tenant utility sub-metering, and dynamic architectural illumination.'
  }
];

function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramDiscipline = searchParams.get('discipline');

  const initialCategory = useMemo(() => {
    if (!paramDiscipline) return 'All';
    const clean = paramDiscipline.toLowerCase().replace('-design', '').replace('-systems', '');
    const found = ['plumbing', 'electrical', 'fire-fighting', 'fire-alarm', 'hvac'].find((k) => k === clean);
    return found || 'All';
  }, [paramDiscipline]);

  const [activeDiscipline, setActiveDiscipline] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = "MEP Design & Coordination Services | GGA MEP Design Consultants";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (paramDiscipline) {
      const clean = paramDiscipline.toLowerCase().replace('-design', '').replace('-systems', '');
      if (['plumbing', 'electrical', 'fire-fighting', 'fire-alarm', 'hvac'].includes(clean)) {
        setActiveDiscipline(clean);
      }
    }
  }, [paramDiscipline]);

  const disciplineTabs = [
    { id: 'All', label: 'All Disciplines', count: 5, icon: '❖' },
    { id: 'plumbing', label: '01 Plumbing (PHE)', count: 1, icon: '💧' },
    { id: 'electrical', label: '02 Electrical & ELV', count: 1, icon: '⚡' },
    { id: 'fire-fighting', label: '03 Fire Fighting', count: 1, icon: '🧯' },
    { id: 'fire-alarm', label: '04 Fire Alarm', count: 1, icon: '🔔' },
    { id: 'hvac', label: '05 HVAC & Ventilation', count: 1, icon: '❄️' }
  ];

  const filteredServices = useMemo(() => {
    return ggaServices.filter((service) => {
      const matchesCategory = activeDiscipline === 'All' || service.disciplineKey === activeDiscipline;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        service.title.toLowerCase().includes(q) ||
        service.tagline.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        service.coreScope.some((s) => s.toLowerCase().includes(q)) ||
        service.standards.some((st) => st.code.toLowerCase().includes(q) || st.name.toLowerCase().includes(q)) ||
        service.deliverables.some((d) => d.toLowerCase().includes(q))
      );
      return matchesCategory && matchesSearch;
    });
  }, [activeDiscipline, searchQuery]);

  return (
    <div className="services-page-wrapper">
      {/* Page Hero */}
      <section className="page-hero services-hero">
        <EngineeringBackground variant="page" />
        <div className="container page-hero-inner">
          <div>
            <span className="eyebrow">
              <span className="dot"></span> INTEGRATED BUILDING SERVICES CONSULTANCY
            </span>
            <h1>Engineering Services &amp; Clash-Free Coordination</h1>
            <p>
              Delivering code-compliant, clash-free, and energy-optimized Plumbing, Electrical, Fire Protection, and HVAC systems for high-performance buildings.
            </p>
          </div>
          <PencilMark />
        </div>
      </section>

      {/* Main Services Section */}
      <section className="section services-main-section">
        <EngineeringBackground variant="light" />
        <div className="container">

          {/* Executive Services Stats Ribbon */}
          <div className="projects-stats-ribbon services-stats-ribbon">
            <div className="project-stat-box">
              <span className="stat-number">5</span>
              <span className="stat-unit">CORE DISCIPLINES</span>
              <span className="stat-caption">PHE, Electrical, Fire Fighting, Alarm &amp; HVAC</span>
            </div>
            <div className="project-stat-sep" aria-hidden="true"></div>
            <div className="project-stat-box">
              <span className="stat-number">100%</span>
              <span className="stat-unit">CODE COMPLIANT</span>
              <span className="stat-caption">NBC 2016, NFPA, IS &amp; CPHEEO Standards</span>
            </div>
            <div className="project-stat-sep" aria-hidden="true"></div>
            <div className="project-stat-box">
              <span className="stat-number">8-STAGE</span>
              <span className="stat-unit">LIFECYCLE ROADMAP</span>
              <span className="stat-caption">Concept Closure to Site GFC Handover</span>
            </div>
            <div className="project-stat-sep" aria-hidden="true"></div>
            <div className="project-stat-box">
              <span className="stat-number">ZERO</span>
              <span className="stat-unit">SITE CLASHES</span>
              <span className="stat-caption">Integrated 3D/2D Spatial Coordination</span>
            </div>
          </div>

          {/* Interactive Discipline Toolbar */}
          <div className="services-toolbar">
            <div className="toolbar-left">
              <div className="category-tabs" role="tablist">
                {disciplineTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`cat-tab ${activeDiscipline === tab.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveDiscipline(tab.id);
                      if (tab.id === 'All') {
                        setSearchParams({});
                      } else {
                        setSearchParams({ discipline: tab.id });
                      }
                    }}
                    role="tab"
                    aria-selected={activeDiscipline === tab.id}
                  >
                    <span className="tab-icon" aria-hidden="true">{tab.icon}</span>
                    <span>{tab.label}</span>
                    <span className="tab-badge">{tab.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="toolbar-right">
              <div className="project-search-box">
                <span className="search-icon" aria-hidden="true">🔍</span>
                <input
                  type="text"
                  placeholder="Search system, code, BOQ, standard..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search engineering services"
                />
                {searchQuery && (
                  <button
                    className="search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Discipline Cards Showcase */}
          <div className="services-discipline-list">
            {filteredServices.length === 0 ? (
              <div className="no-projects-found">
                <h3>No engineering systems matched your query</h3>
                <p>Try searching for keywords like "PHE", "Substation", "Sprinkler", "NOC", "VRF", or "BOQ".</p>
                <button
                  className="btn btn-yellow"
                  onClick={() => {
                    setActiveDiscipline('All');
                    setSearchQuery('');
                    setSearchParams({});
                  }}
                >
                  Reset Discipline Filters
                </button>
              </div>
            ) : (
              filteredServices.map((service) => (
                <article
                  className="service-discipline-card"
                  key={service.id}
                  id={service.disciplineKey}
                >
                  {/* Card Header */}
                  <div className="discipline-card-header">
                    <div className="header-meta-left">
                      <div className="discipline-icon-badge" aria-hidden="true">
                        {service.icon}
                      </div>
                      <div className="discipline-meta-titles">
                        <div className="discipline-meta-top">
                          <span className="discipline-number-tag">{service.disciplineNumber}</span>
                          <span className="discipline-badge-kicker">{service.badge}</span>
                        </div>
                        <h2 className="discipline-title">{service.title}</h2>
                        <p className="discipline-tagline">{service.tagline}</p>
                      </div>
                    </div>
                    <div className="header-meta-right">
                      <div className="stat-pill-badge">
                        <span className="stat-pill-value">{service.statHighlight.value}</span>
                        <span className="stat-pill-label">{service.statHighlight.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Discipline Narrative */}
                  <div className="discipline-narrative">
                    <p>{service.description}</p>
                  </div>

                  {/* Technical Breakdown: 2 Columns */}
                  <div className="discipline-details-grid">
                    {/* Column 1: Core Scope Checklist */}
                    <div className="technical-panel scope-panel">
                      <div className="panel-header">
                        <span className="panel-icon">⚙</span>
                        <h4>Core Engineering Scope &amp; Systems</h4>
                      </div>
                      <ul className="technical-checklist">
                        {service.coreScope.map((item, idx) => (
                          <li key={idx}>
                            <span className="check-bullet" aria-hidden="true">◆</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: Standards & Deliverables */}
                    <div className="technical-panel specs-panel">
                      {/* Governing Standards */}
                      <div className="sub-panel">
                        <div className="panel-header">
                          <span className="panel-icon">⚖</span>
                          <h4>Governing Codes &amp; Statutory Standards</h4>
                        </div>
                        <div className="standards-chips-grid">
                          {service.standards.map((std, idx) => (
                            <div className="standard-chip-card" key={idx}>
                              <strong className="std-code">{std.code}</strong>
                              <span className="std-name">{std.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Typical Deliverables */}
                      <div className="sub-panel" style={{ marginTop: '22px' }}>
                        <div className="panel-header">
                          <span className="panel-icon">📐</span>
                          <h4>GFC &amp; Documentation Deliverables</h4>
                        </div>
                        <ul className="deliverables-checklist">
                          {service.deliverables.map((deliv, idx) => (
                            <li key={idx}>
                              <span className="deliv-icon" aria-hidden="true">✔</span>
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="discipline-card-footer">
                    <div className="footer-left-info">
                      <span className="consultation-ready-tag">● Scope Ready for Consultation</span>
                      <span className="footer-doc-note">GFC 2D/3D DWG + PDF Drawings &amp; Schedules</span>
                    </div>
                    <div className="footer-actions">
                      <Link
                        className="btn btn-yellow"
                        to={`/contact-us?service=${service.id}`}
                      >
                        Request {service.shortTitle} Scope ↗
                      </Link>
                      <a
                        className="btn btn-outline"
                        href={`https://wa.me/918489274385?text=${encodeURIComponent(`Hello GGA, I would like to consult on ${service.title} for our upcoming building project.`)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Discuss on WhatsApp ↗
                      </a>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* 8-Stage Engineering Coordination Lifecycle */}
          <section className="services-lifecycle-section">
            <div className="section-header-centered">
              <span className="services-kicker">OUR PROVEN METHODOLOGY</span>
              <h2>The 8-Stage MEP Coordination Lifecycle</h2>
              <p>
                From initial architectural massing to Good-For-Construction (GFC) release and on-site vendor reviews, our structured methodology eliminates design ambiguities and avoids costly site rework.
              </p>
            </div>

            <div className="lifecycle-grid">
              {coordinationStages.map((stage) => (
                <div className="lifecycle-step-card" key={stage.step}>
                  <div className="step-card-top">
                    <span className="step-badge-tag">{stage.badge}</span>
                    <span className="step-number-pill">{stage.step}</span>
                  </div>
                  <h3 className="step-title">{stage.title}</h3>
                  <h4 className="step-subtitle">{stage.subtitle}</h4>
                  <p className="step-desc">{stage.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Clash-Free Coordination Guarantee Matrix */}
          <section className="services-matrix-section">
            <div className="section-header-centered">
              <span className="services-kicker">THE VALUE OF COORDINATION</span>
              <h2>Uncoordinated Design vs. GGA Coordinated Engineering</h2>
              <p>
                Why leading developers and architects partner with GGA to protect their structural integrity, ceiling heights, and construction budgets.
              </p>
            </div>

            <div className="coordination-matrix-cards">
              {coordinationMatrix.map((item, idx) => (
                <div className="matrix-comparison-card" key={idx}>
                  <div className="matrix-aspect-header">
                    <span className="aspect-badge">DIMENSION 0{idx + 1}</span>
                    <h3>{item.aspect}</h3>
                  </div>
                  <div className="matrix-columns">
                    <div className="matrix-col col-uncoordinated">
                      <div className="col-status-bar bar-bad">
                        <span>✕</span> Traditional Fragmented Design
                      </div>
                      <p>{item.uncoordinated}</p>
                    </div>
                    <div className="matrix-col col-coordinated">
                      <div className="col-status-bar bar-good">
                        <span>✔</span> GGA Integrated Coordination
                      </div>
                      <p>{item.ggaMethod}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Building Typologies We Engineer */}
          <section className="services-typologies-section">
            <div className="section-header-centered">
              <span className="services-kicker">SECTOR VERSATILITY</span>
              <h2>Engineered for Every Building Typology</h2>
              <p>
                Tailored building services design backed by extensive cross-sector experience across South India and the Gulf.
              </p>
            </div>

            <div className="typologies-grid">
              {buildingTypologies.map((t, idx) => (
                <div className="typology-card" key={idx}>
                  <span className="typology-emoji" aria-hidden="true">{t.icon}</span>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Consultation CTA */}
          <div className="services-cta-banner">
            <div className="cta-left">
              <span className="services-kicker kicker-light">START YOUR DESIGN CONSULTATION</span>
              <h3>Ready to engineer a clash-free, code-compliant building?</h3>
              <p>
                Share your architectural floor plans and scope requirements with GGA's engineering team for preliminary coordination review.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-yellow" to="/contact-us">
                Request Scope Consultation ↗
              </Link>
              <a
                className="btn btn-outline"
                href="https://wa.me/918489274385?text=Hello%20GGA%2C%20I%20would%20like%20to%20discuss%20our%20MEP%20design%20scope."
                target="_blank"
                rel="noreferrer"
              >
                Direct WhatsApp Chat ↗
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  const settings = useData('/settings', {});

  useEffect(() => {
    document.title = "About Us | GGA MEP Design Consultants";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const corePillars = [
    {
      num: '01',
      title: 'Technical Accuracy',
      desc: 'Rigorous mathematical modeling for water balance demand, electrical connected load & diversity, fire hydraulic pressure heads, and life-safety coverage.',
      icon: '📐'
    },
    {
      num: '02',
      title: 'Coordinated Engineering',
      desc: 'Multidisciplinary cross-overlay between architectural space, structural concrete elements, and MEP routing to guarantee zero site clashes.',
      icon: '⚙'
    },
    {
      num: '03',
      title: 'Energy & Resource Efficiency',
      desc: 'Optimized system designs focusing on low lifecycle operating costs, sustainable water recycling (STP/RWH), and high power factor efficiency.',
      icon: '🌱'
    },
    {
      num: '04',
      title: 'Codes & Safety Compliance',
      desc: 'Strict adherence to applicable building codes and statutory safety regulations, including NBC 2016, NFPA, IS standards, and local authority fire norms.',
      icon: '🛡️'
    }
  ];

  const sectorsServed = [
    {
      title: 'Residential Developments',
      desc: 'Gated apartment communities, luxury multi-storey towers, and residential townships with tailored plumbing, power distribution, and life safety.',
      icon: '🏢'
    },
    {
      title: 'Commercial Developments',
      desc: 'Corporate office headquarters, IT parks, and mixed-use commercial centers requiring high reliability and flexible space services.',
      icon: '💻'
    },
    {
      title: 'Industrial Developments',
      desc: 'High-density industrial campuses, manufacturing facilities, and large-scale worker dormitories up to 15,00,000 sq.ft.',
      icon: '🏭'
    },
    {
      title: 'Institutional Developments',
      desc: 'Civic safety stations, educational campuses, defence installations, and large-capacity civic auditoriums.',
      icon: '🏛️'
    }
  ];

  const supportScope = [
    'Coordination with design stakeholders for detailed MEP design development',
    'Coordination with the builder, architect and structural consultant for concept closure',
    'Site visits and meetings to support execution as per design',
    'Technical clarifications and RFI clearance throughout the build cycle',
    'Technical support for finalisation of specifications and equipment schedules',
    'Technical support for tender coordination and contractor evaluation',
    'Issuance of Good-For-Construction (GFC) drawings in soft and hard copy',
    'Review and technical approval of vendor shop drawings and GA drawings'
  ];

  return (
    <div className="about-page-wrapper">
      {/* Page Hero */}
      <section className="page-hero about-hero">
        <EngineeringBackground variant="page" />
        <div className="container page-hero-inner">
          <div>
            <span className="eyebrow">
              <span className="dot"></span> COMPANY PROFILE &amp; ENGINEERING VISION
            </span>
            <h1>Designing Smarter Buildings. Engineering Safer Futures.</h1>
            <p>
              GGA MEP Design Consultants provides specialized engineering consultancy services in Plumbing, Electrical, Firefighting, and Fire Alarm System Design.
            </p>
          </div>
          <PencilMark />
        </div>
      </section>

      {/* Main Section */}
      <section className="section about-main-section">
        <EngineeringBackground variant="light" />
        <div className="container">

          {/* Tagline Showcase Ribbon */}
          <div className="about-tagline-ribbon">
            <div className="tagline-kicker" style={{ color: '#ffdf24' }}>OUR OFFICIAL TAGLINE</div>
            <h2 className="tagline-quote" style={{ color: '#ffffff' }}>“Designing Smarter Buildings. Engineering Safer Futures.”</h2>
            <p className="tagline-sub" style={{ color: '#f1f5f9' }}>
              A commitment embedded in every design calculation, schematic layout, and spatial coordination drawing we produce.
            </p>
          </div>

          {/* Executive Company Profile Overview */}
          <div className="about-intro-grid">
            <div className="about-intro-content">
              <span className="eyebrow dark">COMPANY PROFILE</span>
              <h2 className="about-intro-heading">
                Specialized MEP Engineering Consultancy for Built Environments
              </h2>

              <div className="profile-paragraphs">
                <p className="profile-lead-p">
                  <strong>GGA MEP Design Consultants</strong> provides specialized engineering consultancy services in <strong>Plumbing, Electrical, Firefighting, and Fire Alarm System Design</strong>.
                </p>
                <p>
                  We focus on delivering innovative, efficient, cost-effective, and safety-oriented engineering design solutions for residential, commercial, industrial, and institutional developments.
                </p>
                <p>
                  Our design approach emphasizes technical accuracy, coordinated engineering, energy efficiency, and compliance with applicable building codes and safety requirements.
                </p>
                <p>
                  From initial design concepts to detailed engineering drawings and technical documentation, GGA MEP Design Consultants aims to support successful project planning and execution.
                </p>
              </div>

              <div className="about-cta-row">
                <Link className="btn btn-yellow" to="/services">
                  Explore Our Services ↗
                </Link>
                <Link className="btn btn-outline-dark" to="/projects">
                  View Selected Projects ↗
                </Link>
              </div>
            </div>

            {/* Profile Highlights Card */}
            <aside className="about-identity-card">
              <div className="identity-header">
                <span className="identity-badge">GGA MEP DESIGN CONSULTANTS</span>
                <h3>Engineering Excellence</h3>
              </div>
              <div className="identity-stats-list">
                <div className="identity-stat-row">
                  <span className="stat-label">Specialized Disciplines</span>
                  <span className="stat-val">PHE · Electrical · Firefighting · Fire Alarm</span>
                </div>
                <div className="identity-stat-row">
                  <span className="stat-label">Project Typologies</span>
                  <span className="stat-val">Residential · Commercial · Industrial · Institutional</span>
                </div>
                <div className="identity-stat-row">
                  <span className="stat-label">Design Standards</span>
                  <span className="stat-val">NBC 2016 · NFPA · IS Codes · CPHEEO</span>
                </div>
                <div className="identity-stat-row">
                  <span className="stat-label">Head Office</span>
                  <span className="stat-val">Madipakkam, Chennai, Tamil Nadu</span>
                </div>
                <div className="identity-stat-row">
                  <span className="stat-label">Director</span>
                  <span className="stat-val">{settings.director_name || 'M. Arumugam'}</span>
                </div>
              </div>

              <div className="identity-contact-box">
                <p><strong>Direct Consultation:</strong></p>
                <a href="mailto:ggamepconsultant@gmail.com" className="identity-link">✉ ggamepconsultant@gmail.com</a>
                <a href="tel:+918489274385" className="identity-link">☎ +91 8489274385</a>
                <a href={WA} target="_blank" rel="noreferrer" className="btn btn-yellow identity-btn">WhatsApp Chat ↗</a>
              </div>
            </aside>
          </div>

          {/* 15+ Years of Experience Engineering Showcase */}
          <section className="about-experience-section">
            <div className="experience-showcase-card">
              <div className="exp-blueprint-decor" aria-hidden="true"></div>
              
              <div className="exp-left-col">
                <div className="exp-years-badge">
                  <span className="exp-years-num animate-pulse-glow">15<span className="exp-plus">+</span></span>
                  <div className="exp-years-label">
                    <span className="exp-sub">YEARS OF PROVEN</span>
                    <strong className="exp-main">Engineering Excellence</strong>
                  </div>
                </div>

                <div className="exp-stats-mini-grid">
                  <div className="exp-mini-stat">
                    <span className="mini-stat-num">100+</span>
                    <span className="mini-stat-label">Coordinated Projects</span>
                  </div>
                  <div className="exp-mini-stat">
                    <span className="mini-stat-num">100%</span>
                    <span className="mini-stat-label">Statutory Compliance</span>
                  </div>
                  <div className="exp-mini-stat">
                    <span className="mini-stat-num">Zero</span>
                    <span className="mini-stat-label">Site Clash Target</span>
                  </div>
                </div>
              </div>

              <div className="exp-right-col">
                <div className="exp-badge-pill">
                  <span className="badge-pulse-dot"></span>
                  SINCE 2009 · INDUSTRY LEADERSHIP
                </div>
                <h3 className="exp-heading">
                  A Decade &amp; a Half of Precision MEP Design &amp; Value Engineering
                </h3>
                <p className="exp-description">
                  For over <strong>15 years</strong>, GGA MEP Design Consultants has been at the forefront of building services engineering. Our senior consulting engineers bring more than a decade and a half of dedicated expertise in designing complex, high-demand building systems for landmark residential communities, corporate IT towers, state-of-the-art hospitals, and expansive industrial campuses.
                </p>

                <div className="exp-milestone-features">
                  <div className="exp-feature-item">
                    <div className="feature-icon-box">📐</div>
                    <div>
                      <h4>Mathematical &amp; Code Precision</h4>
                      <p>15+ years refining hydraulic calculations, electrical demand diversity, and NFPA life-safety models.</p>
                    </div>
                  </div>
                  <div className="exp-feature-item">
                    <div className="feature-icon-box">🤝</div>
                    <div>
                      <h4>Trusted by Tier-1 Developers</h4>
                      <p>Longstanding design coordination with India’s leading builders, architects, and structural consultants.</p>
                    </div>
                  </div>
                  <div className="exp-feature-item">
                    <div className="feature-icon-box">💡</div>
                    <div>
                      <h4>Life-Cycle Value Engineering</h4>
                      <p>Designs engineered to minimize capital expenditure and reduce operational energy costs across decades.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="about-vision-mission-section">
            <div className="section-header-centered">
              <span className="services-kicker">OUR GUIDING PRINCIPLES</span>
              <h2>Vision &amp; Mission</h2>
              <p>
                The enduring standards that shape our client partnerships, technical deliverables, and future engineering milestones.
              </p>
            </div>

            <div className="vision-mission-grid">
              {/* Vision Card */}
              <div className="vm-card vision-card">
                <div className="vm-card-top">
                  <span className="vm-icon" aria-hidden="true">🎯</span>
                  <span className="vm-badge">OUR VISION</span>
                </div>
                <h3 className="vm-title">Recognized for Technical Excellence &amp; Safety</h3>
                <blockquote className="vm-quote">
                  “To become a trusted MEP engineering design consultancy, recognized for technical excellence, innovative solutions, and a strong commitment to safety and quality.”
                </blockquote>
                <div className="vm-highlights">
                  <div className="vm-pill">✦ Trusted Consultancy</div>
                  <div className="vm-pill">✦ Technical Excellence</div>
                  <div className="vm-pill">✦ Innovative Solutions</div>
                  <div className="vm-pill">✦ Safety &amp; Quality Commitment</div>
                </div>
              </div>

              {/* Mission Card */}
              <div className="vm-card mission-card">
                <div className="vm-card-top">
                  <span className="vm-icon" aria-hidden="true">🚀</span>
                  <span className="vm-badge">OUR MISSION</span>
                </div>
                <h3 className="vm-title">Reliable, Sustainable &amp; Economical Solutions</h3>
                <blockquote className="vm-quote">
                  “To provide reliable, sustainable, and economical engineering design solutions that meet client expectations, enhance building performance, and support long-term operational efficiency.”
                </blockquote>
                <div className="vm-highlights">
                  <div className="vm-pill">✦ Reliable Execution</div>
                  <div className="vm-pill">✦ Sustainable Engineering</div>
                  <div className="vm-pill">✦ Client-Focused Solutions</div>
                  <div className="vm-pill">✦ Long-Term Operational Efficiency</div>
                </div>
              </div>
            </div>
          </section>

          {/* 4 Core Design Pillars */}
          <section className="about-pillars-section">
            <div className="section-header-centered">
              <span className="services-kicker">OUR DESIGN APPROACH</span>
              <h2>Core Pillars of Our Engineering Solutions</h2>
              <p>
                Every project at GGA is guided by four fundamental engineering criteria to ensure flawless execution and occupant safety.
              </p>
            </div>

            <div className="pillars-grid">
              {corePillars.map((p) => (
                <div className="pillar-card" key={p.num}>
                  <div className="pillar-top">
                    <span className="pillar-icon" aria-hidden="true">{p.icon}</span>
                    <span className="pillar-num">{p.num}</span>
                  </div>
                  <h4 className="pillar-title">{p.title}</h4>
                  <p className="pillar-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sectors Served */}
          <section className="about-sectors-section">
            <div className="section-header-centered">
              <span className="services-kicker">DEVELOPMENT TYPOLOGIES</span>
              <h2>Developments We Design For</h2>
              <p>
                Engineering design solutions customized to the unique spatial, functional, and statutory demands of diverse building typologies.
              </p>
            </div>

            <div className="sectors-grid">
              {sectorsServed.map((s, idx) => (
                <div className="sector-item-card" key={idx}>
                  <span className="sector-emoji" aria-hidden="true">{s.icon}</span>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Project Planning & Execution Scope */}
          <section className="about-scope-section">
            <div className="section-header-centered">
              <span className="services-kicker">END-TO-END SUPPORT</span>
              <h2>From Concept to Construction Documentation</h2>
              <p>
                GGA MEP Design Consultants actively supports project planning and execution through structured technical milestones.
              </p>
            </div>

            <div className="scope-list-grid">
              {supportScope.map((item, idx) => (
                <div className="scope-list-item" key={idx}>
                  <span className="scope-num">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="scope-text">
                    <p>{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Consultation Banner */}
          <div className="services-cta-banner">
            <div className="cta-left">
              <span className="services-kicker kicker-light">PARTNER WITH GGA</span>
              <h3>Ready to plan and engineer your next development?</h3>
              <p>
                Reach out to GGA MEP Design Consultants to discuss project scope, design coordination, technical calculations, and documentation requirements.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-yellow" to="/contact-us">
                Contact Us ↗
              </Link>
              <a
                className="btn btn-outline"
                href={WA}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Consultation ↗
              </a>
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
  if (slug === 'services') {
    return <ServicesPage />;
  }
  if (slug === 'about-us') {
    return <AboutPage />;
  }
  const fallback = FALLBACK[slug] || FALLBACK['about-us'];
  const page = useData(`/pages/${slug}`, fallback);
  useEffect(()=>{
    document.title = page.seo_title || `${page.title} | GGA MEP Design Consultants`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && page.seo_description) meta.content = page.seo_description;
  }, [page, slug]);

  return (
    <>
      <section className="page-hero">
        <EngineeringBackground variant="page"/>
        <div className="container page-hero-inner">
          <div>
            <span className="eyebrow"><span className="dot"></span> GGA DESIGN CONSULTANTS</span>
            <h1>{page.title}</h1>
            <p>{page.subtitle}</p>
          </div>
          <PencilMark/>
        </div>
      </section>
      <section className="section">
        <EngineeringBackground variant="light"/>
        <div className="container content-layout">
          <div className="content-main">
            <span className="eyebrow dark">GET GREAT ADVICE</span>
            <h2>{page.subtitle}</h2>
            <p className="body-copy">{page.body}</p>
          </div>
          <aside className="contact-card">
            <span className="eyebrow">LET'S TALK</span>
            <h3>Have a project in mind?</h3>
            <p>Tell us about your building and MEP design requirements.</p>
            <Link className="btn btn-yellow" to="/contact-us">Contact GGA ↗</Link>
            <div className="aside-rule"></div>
            <p className="aside-contact">✉ <a href="mailto:ggamepconsultant@gmail.com">ggamepconsultant@gmail.com</a></p>
            <p className="aside-contact">☎ <a href="tel:+918489274385">+91 8489274385</a></p>
          </aside>
        </div>
      </section>
    </>
  );
}

function Contact() {
  const settings = useData('/settings', {});
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = e => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'loading', text: 'Securing your enquiry...' });
    try {
      const r = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Could not send enquiry');
      setStatus({
        type: 'success',
        text: d.message || 'Thank you! Your enquiry has been received and saved.'
      });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        text: err.message + ' (Check that the backend is running)'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const officeAddress = settings.office_address || 'Flat No B, Vallabari Apartment, Vallal Pari Street, Ram Nagar, Madipakkam, Chennai 600091';
  const mapQuery = encodeURIComponent(officeAddress);

  return <>
    <section className="page-hero"><EngineeringBackground variant="page"/><div className="container page-hero-inner"><div><span className="eyebrow"><span className="dot"></span> START A CONVERSATION</span><h1>Contact GGA</h1><p>Tell us about your project. We’ll get back to you.</p></div><PencilMark/></div></section>
    <section className="section"><EngineeringBackground variant="light"/><div className="container contact-layout"><div className="contact-details"><span className="eyebrow dark">CONTACT DETAILS</span><h2>Let's discuss<br/><em>your next project.</em></h2><p>Reach out to discuss MEP design scope, coordination, drawings or technical support.</p><div className="contact-detail"><span>EMAIL</span><a href="mailto:ggamepconsultant@gmail.com">{settings.contact_email||'ggamepconsultant@gmail.com'}</a></div><div className="contact-detail"><span>PHONE</span><a href="tel:+918489274385">{settings.contact_phone||'+91 8489274385'}</a></div><div className="contact-detail"><span>OFFICE</span><p>{officeAddress}</p></div><a className="btn btn-dark" href={WA} target="_blank" rel="noreferrer">Message us on WhatsApp ↗</a></div>
    <form className="contact-form" onSubmit={submit}>
      <h3>Send an enquiry</h3>
      <p>Fields marked * are required.</p>
      <label>Full name *<input name="name" value={form.name} onChange={update} required maxLength="120" placeholder="Your name"/></label>
      <label>Email address *<input name="email" type="email" value={form.email} onChange={update} required maxLength="254" placeholder="you@example.com"/></label>
      <label>Phone number<input name="phone" value={form.phone} onChange={update} placeholder="+91" /></label>
      <label>How can we help? *<textarea name="message" value={form.message} onChange={update} required maxLength="5000" rows="5" placeholder="Tell us a little about your project..."/></label>
      <button className="btn btn-yellow" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending Enquiry...' : 'Send enquiry ↗'}
      </button>

      {status.type === 'success' && (
        <div className="premium-status-banner success-banner" role="alert">
          <div className="banner-icon-ring">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="banner-svg-check">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="banner-content">
            <strong>Enquiry Received Successfully!</strong>
            <p>{status.text}</p>
            <span className="banner-note">Our engineering team will review your requirements and reach out shortly.</span>
          </div>
        </div>
      )}

      {status.type === 'error' && (
        <div className="premium-status-banner error-banner" role="alert">
          <div className="banner-icon-ring error-ring">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="banner-svg-cross">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <div className="banner-content">
            <strong>Unable to Send Enquiry</strong>
            <p>{status.text}</p>
          </div>
        </div>
      )}

      {status.type === 'loading' && (
        <div className="premium-status-banner loading-banner">
          <div className="banner-spinner"></div>
          <div className="banner-content">
            <span>{status.text}</span>
          </div>
        </div>
      )}
    </form>
    </div></section>
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
  const settings = useData('/settings', {});
  return (
    <>
      <ToptoScroll />
      <Header settings={settings} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
      </main>
      <Footer settings={settings} />
      <FloatingActions settings={settings} />
    </>
  );
}
