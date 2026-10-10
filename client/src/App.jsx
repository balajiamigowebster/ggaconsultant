import React, { useEffect, useState } from 'react';
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
      <svg viewBox="0 0 100 100" className="eng-icon icon-fan animate-spin-slow">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" opacity="0.6"/>
        <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M50 36 C50 18 64 8 72 10 C74 22 62 34 50 36Z" fill="currentColor" opacity="0.85" />
        <path d="M62 44 C80 36 90 46 90 54 C78 60 64 52 62 44Z" fill="currentColor" opacity="0.85" />
        <path d="M62 56 C70 74 64 88 56 90 C48 82 54 66 62 56Z" fill="currentColor" opacity="0.85" />
        <path d="M50 64 C50 82 36 92 28 90 C26 78 38 66 50 64Z" fill="currentColor" opacity="0.85" />
        <path d="M38 56 C20 64 10 54 10 46 C22 40 36 48 38 56Z" fill="currentColor" opacity="0.85" />
        <path d="M38 44 C30 26 36 12 44 10 C52 18 46 34 38 44Z" fill="currentColor" opacity="0.85" />
        <circle cx="50" cy="50" r="5" fill="currentColor" />
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
  </>;
}

const defaultServices = [
 {slug:'plumbing-design',title:'Plumbing Design',summary:'Water supply, drainage, storm-water and water-management systems.'},
 {slug:'electrical-design',title:'Electrical Design',summary:'Power distribution, lighting, earthing and electrical building services.'},
 {slug:'fire-fighting-design',title:'Fire Fighting Design',summary:'Hydrant, sprinkler, fire-pump and hydraulic design support.'},
 {slug:'fire-alarm-systems',title:'Fire Alarm Systems',summary:'Fire-alarm system design coordination for building safety.'},
 {slug:'hvac-design',title:'HVAC Design',summary:'HVAC design coordination based on project-specific requirements.'}
];
const defaultProjects = [
 {title:'Tata Electronics Dormitory Development',location:'Hosur',area_sqft:'15,00,000'},
 {title:'Humming Tree Residential Development',location:'Perumbakkam, Chennai',area_sqft:'3,50,000'},
 {title:'Casagrande Residential Building',location:'Sulur, Coimbatore',area_sqft:'2,00,000'}
];

function ContentPage() {
  const { slug } = useParams();
  const fallback = FALLBACK[slug] || FALLBACK['about-us'];
  const page = useData(`/pages/${slug}`, fallback);
  useEffect(()=>{ document.title = page.seo_title || `${page.title} | GGA MEP Design Consultants`; const meta=document.querySelector('meta[name="description"]'); if(meta && page.seo_description) meta.content=page.seo_description; },[page,slug]);
  const services = useData('/services', []);
  const projects = useData('/projects', []);
  return <><section className="page-hero"><EngineeringBackground variant="page"/><div className="container page-hero-inner"><div><span className="eyebrow"><span className="dot"></span> GGA DESIGN CONSULTANTS</span><h1>{page.title}</h1><p>{page.subtitle}</p></div><PencilMark/></div></section>
    <section className="section"><EngineeringBackground variant="light"/><div className="container content-layout"><div className="content-main"><span className="eyebrow dark">GET GREAT ADVICE</span><h2>{page.subtitle}</h2><p className="body-copy">{page.body}</p>
      {slug==='services' && <div className="detail-list">{(services.length?services:defaultServices).map((s,i)=><article key={s.id||s.slug}><span className="detail-num">0{i+1}</span><div><h3>{s.title}</h3><p>{s.details||s.summary}</p></div></article>)}</div>}
      {slug==='projects' && <div className="project-list">{(projects.length?projects:defaultProjects).map((p,i)=><article key={p.id||p.title}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{p.title}</h3><p>{p.location}{p.area_sqft?' · '+p.area_sqft+' sq.ft':''}</p>{p.description&&<p>{p.description}</p>}</div></article>)}</div>}
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

function Footer({settings}) {
 return <footer className="footer"><div className="container footer-main"><div><Link to="/" className="brand footer-brand" aria-label="GGA home"><img src="/images/gga-logo.jpg" alt="GGA - GET GREAT ADVICE" className="brand-logo-img footer-logo-img" /></Link><p>MEP design consultants supporting coordinated building-services design.</p></div><div><h4>EXPLORE</h4><Link to="/about-us">About Us</Link><Link to="/services">Services</Link><Link to="/projects">Projects</Link><Link to="/contact-us">Contact</Link></div><div><h4>GET IN TOUCH</h4><a href="mailto:ggamepconsultant@gmail.com">{settings.contact_email||'ggamepconsultant@gmail.com'}</a><a href="tel:+918489274385">{settings.contact_phone||'+91 8489274385'}</a><a href={WA} target="_blank" rel="noreferrer">WhatsApp ↗</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} GGA Design Consultants</span><span>*Experience statement based on the company profile; verify before publishing.</span></div></footer>;
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
 return <><Header settings={settings}/><main><Routes><Route path="/" element={<Home/>}/><Route path="/about-us" element={<ContentPage/>}/><Route path="/services" element={<ContentPage/>}/><Route path="/projects" element={<ContentPage/>}/><Route path="/contact-us" element={<Contact/>}/></Routes></main><Footer settings={settings}/><FloatingActions settings={settings}/></>;
}
