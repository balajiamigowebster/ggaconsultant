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
    <Link to="/" className="brand" aria-label="GGA home"><span className="brand-pencil">✎</span><span className="brand-letters">GGA<small>GET GREAT ADVICE</small></span></Link>
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
    <section className="hero"><div className="hero-grid"></div><div className="container hero-inner">
      <div className="hero-copy"><span className="eyebrow"><span className="dot"></span> MEP DESIGN CONSULTANTS</span>
        <h1>{page.title}<em>.</em></h1><p className="hero-sub">{page.subtitle}</p><p className="hero-body">{page.body}</p>
        <div className="hero-actions"><Link className="btn btn-yellow" to="/services">Explore our services <span>↗</span></Link><Link className="btn btn-outline" to="/contact-us">Discuss a project</Link></div>
        <div className="hero-stats"><div><strong>10+</strong><span>Years of experience*</span></div><div><strong>MEP</strong><span>Integrated design support</span></div><div><strong>India + Gulf</strong><span>Project experience*</span></div></div>
      </div>
      <div className="hero-art"><div className="art-ring ring-one"></div><div className="art-ring ring-two"></div><div className="blueprint"><span>BUILDING SYSTEMS</span><div className="blueprint-building"><i></i><i></i><i></i><i></i><i></i></div><div className="blueprint-lines"></div></div><PencilMark/><div className="floating-label label-top">DESIGN <b>+</b> COORDINATION</div><div className="floating-label label-bottom"><span>✦</span> Thoughtful by design</div></div>
    </div><div className="hero-bottom-line"></div></section>
    <section className="trust-strip"><div className="container trust-inner"><span>DESIGN SERVICES</span><b>Plumbing</b><b>Electrical</b><b>Fire Fighting</b><b>Fire Alarm</b><b>HVAC</b></div></section>
    <section className="section"><div className="container"><div className="section-heading"><div><span className="eyebrow dark">WHAT WE DO</span><h2>Engineering the details<br/><em>that make buildings work.</em></h2></div><p>Building services need to work together. We support coordinated design development, technical documentation and project communication from concept to execution.</p></div>
      <div className="service-grid">{(services.length?services:defaultServices).slice(0,5).map((s,i)=><article className="service-card" key={s.id||s.slug}><div className="service-icon">{['⌁','ϟ','✳','◎','↗'][i]}</div><span className="card-number">0{i+1}</span><h3>{s.title}</h3><p>{s.summary}</p><Link to="/services">Learn more <span>↗</span></Link></article>)}</div>
    </div></section>
    <section className="dark-band"><div className="container band-inner"><div><span className="eyebrow">HOW WE SUPPORT YOU</span><h2>Clear coordination.<br/><em>Confident execution.</em></h2></div><Link className="btn btn-yellow" to="/about-us">Discover GGA <span>↗</span></Link></div></section>
    <section className="section projects-preview"><div className="container"><div className="section-heading"><div><span className="eyebrow dark">PROJECT EXPERIENCE</span><h2>Many building types.<br/><em>One coordinated approach.</em></h2></div><Link className="text-link" to="/projects">View project list ↗</Link></div><div className="project-grid">{(projects.length?projects:defaultProjects).slice(0,3).map((p,i)=><article className="project-card" key={p.id||p.title}><div className={`project-art project-art-${i+1}`}><span>{p.location||'PROJECT EXPERIENCE'}</span><div className="building-shape"><i></i><i></i><i></i><i></i></div></div><div className="project-info"><h3>{p.title}</h3><p>{p.location}{p.area_sqft?' · '+p.area_sqft+' sq.ft':''}</p></div></article>)}</div></div></section>
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
  return <><section className="page-hero"><div className="container page-hero-inner"><div><span className="eyebrow"><span className="dot"></span> GGA DESIGN CONSULTANTS</span><h1>{page.title}</h1><p>{page.subtitle}</p></div><PencilMark/></div></section>
    <section className="section"><div className="container content-layout"><div className="content-main"><span className="eyebrow dark">GET GREAT ADVICE</span><h2>{page.subtitle}</h2><p className="body-copy">{page.body}</p>
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
 return <><section className="page-hero"><div className="container page-hero-inner"><div><span className="eyebrow"><span className="dot"></span> START A CONVERSATION</span><h1>Contact GGA</h1><p>Tell us about your project. We’ll get back to you.</p></div><PencilMark/></div></section><section className="section"><div className="container contact-layout"><div className="contact-details"><span className="eyebrow dark">CONTACT DETAILS</span><h2>Let's discuss<br/><em>your next project.</em></h2><p>Reach out to discuss MEP design scope, coordination, drawings or technical support.</p><div className="contact-detail"><span>EMAIL</span><a href="mailto:ggamepconsultant@gmail.com">{settings.contact_email||'ggamepconsultant@gmail.com'}</a></div><div className="contact-detail"><span>PHONE</span><a href="tel:+918489274385">{settings.contact_phone||'+91 8489274385'}</a></div><div className="contact-detail"><span>OFFICE</span><p>{settings.office_address||'Madipakkam, Chennai, Tamil Nadu'}</p></div><a className="btn btn-dark" href={WA} target="_blank" rel="noreferrer">Message us on WhatsApp ↗</a></div>
 <form className="contact-form" onSubmit={submit}><h3>Send an enquiry</h3><p>Fields marked * are required.</p><label>Full name *<input name="name" value={form.name} onChange={update} required maxLength="120" placeholder="Your name"/></label><label>Email address *<input name="email" type="email" value={form.email} onChange={update} required maxLength="254" placeholder="you@example.com"/></label><label>Phone number<input name="phone" value={form.phone} onChange={update} placeholder="+91" /></label><label>How can we help? *<textarea name="message" value={form.message} onChange={update} required maxLength="5000" rows="5" placeholder="Tell us a little about your project..."/></label><button className="btn btn-yellow" type="submit">Send enquiry ↗</button>{status&&<p className="form-status" role="status">{status}</p>}</form></div></section></>;
}

function Footer({settings}) {
 return <footer className="footer"><div className="container footer-main"><div><Link to="/" className="brand footer-brand"><span className="brand-pencil">✎</span><span className="brand-letters">GGA<small>GET GREAT ADVICE</small></span></Link><p>MEP design consultants supporting coordinated building-services design.</p></div><div><h4>EXPLORE</h4><Link to="/about-us">About Us</Link><Link to="/services">Services</Link><Link to="/projects">Projects</Link><Link to="/contact-us">Contact</Link></div><div><h4>GET IN TOUCH</h4><a href="mailto:ggamepconsultant@gmail.com">{settings.contact_email||'ggamepconsultant@gmail.com'}</a><a href="tel:+918489274385">{settings.contact_phone||'+91 8489274385'}</a><a href={WA} target="_blank" rel="noreferrer">WhatsApp ↗</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} GGA Design Consultants</span><span>*Experience statement based on the company profile; verify before publishing.</span></div></footer>;
}

export default function App() {
 const settings=useData('/settings',{});
 return <><Header settings={settings}/><main><Routes><Route path="/" element={<Home/>}/><Route path="/about-us" element={<ContentPage/>}/><Route path="/services" element={<ContentPage/>}/><Route path="/projects" element={<ContentPage/>}/><Route path="/contact-us" element={<Contact/>}/></Routes></main><Footer settings={settings}/><a className="floating-wa" href={WA} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">◉</a></>;
}
