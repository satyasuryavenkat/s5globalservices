import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, ArrowRight, Menu, X, Pause, Play, Plus, Minus, MoveUpRight } from 'lucide-react';
import { services, navigation, steps, faqs } from './data';

export function Button({ to, children, light = false }) { return <Link to={to} className={`button ${light ? 'button-light' : ''}`}>{children}<ArrowUpRight size={19}/></Link>; }
export function Eyebrow({ children, light = false }) { return <div className={`eyebrow ${light ? 'light' : ''}`}><span/>{children}</div>; }
export function Brand() { return <Link to="/" className="brand" aria-label="S5 Global Services home"><span className="brand-symbol">S5<span>↗</span></span><span className="brand-name">GLOBAL<br/>SERVICES<span>PEOPLE. PRECISION. PROGRESS.</span></span></Link>; }

export function Header() {
  const [open, setOpen] = useState(false), [scrolled, setScrolled] = useState(false);
  const location = useLocation(), button = useRef(null), nav = useRef(null);
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => { const scroll = () => setScrolled(window.scrollY > 25); scroll(); window.addEventListener('scroll', scroll, { passive: true }); return () => window.removeEventListener('scroll', scroll); }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const key = e => {
      if (e.key === 'Escape') { setOpen(false); button.current?.focus(); }
      if (e.key === 'Tab') {
        const links = [...nav.current.querySelectorAll('a'), button.current];
        if (e.shiftKey && document.activeElement === links[0]) { e.preventDefault(); links.at(-1).focus(); }
        else if (!e.shiftKey && document.activeElement === links.at(-1)) { e.preventDefault(); links[0].focus(); }
      }
    };
    nav.current.querySelector('a')?.focus(); document.addEventListener('keydown', key);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', key); };
  }, [open]);
  return <header className={`header ${scrolled || location.pathname.startsWith('/machinery/') ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}><Brand/><nav ref={nav} className={open ? 'nav open' : 'nav'} aria-label="Main navigation">{navigation.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}<Link to="/contact" className="nav-contact">Let’s talk <ArrowUpRight size={16}/></Link></nav><button ref={button} className="menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></header>;
}

export function Motion({ children }) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {if (entry.isIntersecting) {entry.target.classList.add('visible');observer.unobserve(entry.target);}}), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el)); document.querySelector('main')?.focus({ preventScroll: true });
    return () => observer.disconnect();
  }, [location.pathname]);
  return <div className="page-transition" key={location.pathname}>{children}</div>;
}

export function VideoScene({ name, paused, onFailure }) {
  const ref = useRef(null);
  useEffect(() => {const video = ref.current;if (!video) return;if (paused) video.pause();else video.play().catch(() => onFailure?.());}, [paused, name]);
  return <video ref={ref} className="scene-video" src={`/videos/${name}.mp4`} poster={`/images/editorial/${name}-poster.jpg`} autoPlay={!paused} muted loop playsInline preload="metadata" aria-hidden="true" onError={() => onFailure?.()}/>;
}
export function Hero({ service }) {
  const [active, setActive] = useState(service ? services.indexOf(service) : 0);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches), [failed, setFailed] = useState(false);
  const current = service || services[active];
  useEffect(() => {if (service || paused || failed) return;const timer = setTimeout(() => {setActive(i => (i + 1) % services.length);setFailed(false);}, 12000);return () => clearTimeout(timer);}, [active, paused, failed, service]);
  return <section className={`cinematic-hero ${service ? 'service-hero' : ''}`}><div className="hero-media" key={current.video}><VideoScene name={current.video} paused={paused} onFailure={() => setFailed(true)}/></div><div className="hero-overlay"/><div className="hero-grid" aria-hidden="true"/>
    <div className="hero-content"><div className="hero-topline"><Eyebrow light>{service ? current.eyebrow : 'S5 GLOBAL SERVICES · MADE FOR WHAT’S NEXT'}</Eyebrow><span className="hero-coordinate">PEOPLE / PROCESS / POSSIBILITIES</span></div>
      <div className="hero-title-wrap"><h1>{service ? current.title : <>Powering people.<br/>Engineering <em>progress.</em></>}</h1><div className="hero-intro"><p>{service ? current.description : 'The people you need. The machinery you imagine. One partner to bring your next big ambition to life.'}</p><Button to={service ? `/contact?service=${encodeURIComponent(current.heading)}` : '/services'}>{service ? 'Discuss your project' : 'Discover our services'}</Button></div></div>
      <div className="hero-bottom">{service ? <Link className="hero-back" to="/services">All services <ArrowUpRight size={17}/></Link> : <div className="hero-tabs" role="group" aria-label="Choose service video">{services.map((item, index) => <button key={item.slug} aria-pressed={active === index} className={active === index ? `active ${paused || failed ? 'stopped' : ''}` : ''} onClick={() => {setActive(index);setFailed(false);}}><span>{item.number}</span><b>{item.short}</b><ArrowUpRight size={15}/><i key={`${active}-${paused}`}/></button>)}</div>}
      <div className="hero-controls"><span className="live-label"><i/>{failed ? 'PRESS PLAY TO WATCH' : paused ? 'FILM PAUSED' : 'INDUSTRY IN MOTION'}</span><button className="video-toggle" aria-label={paused || failed ? 'Play background video' : 'Pause background video'} onClick={() => {setPaused(paused || failed ? false : true);setFailed(false);if(failed) document.querySelector('.scene-video')?.play().catch(() => setFailed(true));}}>{paused || failed ? <Play size={16}/> : <Pause size={16}/>}</button></div></div></div><a className="scroll-cue" href="#intro" aria-label="Scroll to introduction"><ArrowDown size={16}/></a></section>;
}

export function PageHero({ eyebrow, title, accent, description, image = '/images/editorial/team.jpg' }) {return <section className="page-hero"><img src={image} alt="" className="page-hero-image"/><div className="page-hero-shade"/><div className="container page-hero-content"><Link className="breadcrumb" to="/">Home <ArrowRight size={12}/></Link><Eyebrow light>{eyebrow}</Eyebrow><h1>{title}<br/><em>{accent}</em></h1><p>{description}</p></div><span className="page-hero-caption">S5 GLOBAL SERVICES / PEOPLE. PRECISION. PROGRESS.</span></section>;}
export function Marquee() { const words = ['PEOPLE', 'PRECISION', 'PROCESSING', 'POSSIBILITIES', 'PROGRESS'];return <div className="marquee" aria-label="People, precision, processing, possibilities, progress"><div className="marquee-track" aria-hidden="true">{[...words, ...words].map((word, i) => <span key={i}>{word}<i>✳</i></span>)}</div></div>; }
export function SectionHeading({ eyebrow, title, accent, description, to, link }) {return <div className="section-heading reveal"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}<br/><em>{accent}</em></h2></div><div className="heading-aside">{description && <p>{description}</p>}{to && <Link className="text-link" to={to}>{link || 'Explore more'}<ArrowUpRight size={18}/></Link>}</div></div>;}
export function ServiceCards() { return <div className="service-grid">{services.map((service, index) => <Link className="service-card reveal" style={{ '--delay': `${index * 90}ms` }} to={`/services/${service.slug}`} key={service.slug}><img src={service.image} alt={service.heading} loading="lazy"/><div className="card-shade"/><span className="card-number">{service.number} / SOLUTIONS</span><div className="service-card-content"><div className="service-card-icon"><ArrowUpRight size={27}/></div><span className="card-eyebrow">{service.eyebrow}</span><h3>{service.heading}</h3><p>{service.description}</p><span className="card-link">Explore the service <ArrowRight size={16}/></span></div></Link>)}</div>; }
export function AboutStory({ full = false }) {return <section id="intro" className="section container editorial-section"><div className="editorial-images reveal"><div className="image-main"><img src="/images/editorial/engineer.jpg" alt="Engineer working on industrial equipment" loading="lazy"/></div><div className="image-inset"><img src="/images/editorial/team.jpg" alt="Technical team collaborating on a project" loading="lazy"/></div><div className="image-stamp"><span>S5</span>BUILT AROUND<br/>YOUR AMBITION<ArrowUpRight size={22}/></div></div><div className="editorial-copy reveal"><Eyebrow>{full ? 'WHO WE ARE' : 'MORE THAN A SERVICE PROVIDER'}</Eyebrow><h2>Big ambitions need<br/><em>the right partner.</em></h2><p className="lead">People make it possible.<br/>The right machinery makes it happen.</p><p>S5 Global Services brings manpower, juice processing machinery, and whisky and beer manufacturing equipment into one focused conversation: what does your business need to move forward?</p><p>Our approach begins with your requirements. From new production ideas to evolving operations, we connect the practical details with the bigger picture.</p>{full ? <p>Inspired by a product engineering mindset, we consider process and equipment together. Clear requirements help turn production challenges into practical options while keeping your product vision in focus.</p> : <Button to="/about" light>Meet S5 Global Services</Button>}<div className="editorial-foot"><span>01 <b>People first</b></span><span>02 <b>Purpose always</b></span></div></div></section>;}
export function ProcessPreview() {return <section className="section container"><SectionHeading eyebrow="A CLEAR WAY FORWARD" title="Ambitious thinking." accent="Practical next steps." description="The right answer begins with the right questions. See how we turn a first conversation into a focused plan." to="/how-we-work" link="Our approach"/><div className="process-preview">{steps.map(step => <Link key={step.number} className="process-card reveal" to="/how-we-work"><span>{step.number}<ArrowUpRight size={19}/></span><small>{step.label}</small><h3>{step.title}</h3><p>{step.description}</p></Link>)}</div></section>;}
export function CTA({ title = 'Your next big move.', accent = 'Let’s make it happen.' }) {return <section className="cta"><div className="cta-orbit" aria-hidden="true"/><div className="container cta-inner reveal"><div><Eyebrow light>THE NEXT CHAPTER STARTS HERE</Eyebrow><h2>{title}<br/><em>{accent}</em></h2></div><div><p>A stronger team. A smarter process.<br/>A bigger possibility. Tell us your vision.</p><Button to="/contact">Start a conversation</Button></div></div></section>;}
export function FAQList({ preview = false }) {
  const [active, setActive] = useState(0), [category, setCategory] = useState('All questions');
  const shown = preview ? faqs.slice(0, 3) : faqs.filter(item => category === 'All questions' || item[0] === category);
  return <div className="faq-content">{!preview && <div className="filter-pills" role="group" aria-label="Question categories">{['All questions', 'General', 'Machinery', 'Manpower'].map(c => <button aria-pressed={c === category} className={c === category ? 'active' : ''} key={c} onClick={() => {setCategory(c);setActive(null);}}>{c}</button>)}</div>}<div className="faq-list">{shown.map(([cat, question, answer], i) => {const expanded = active === question || (active === 0 && i === 0);return <div className={`faq-item ${expanded ? 'expanded' : ''}`} key={question}><button aria-expanded={expanded} aria-controls={`answer-${i}`} onClick={() => setActive(expanded ? null : question)}><span><small>{cat}</small>{question}</span>{expanded ? <Minus size={19}/> : <Plus size={19}/>}</button><div id={`answer-${i}`} className="faq-answer" hidden={!expanded}><p>{answer}</p></div></div>;})}</div></div>;
}
export function Footer() {return <footer><div className="container"><div className="footer-main"><div className="footer-brand"><Brand/><p>Connecting people, machinery,<br/>and what comes next.</p><Link to="/contact">Build something with us <ArrowUpRight size={19}/></Link></div><div className="footer-links"><span>EXPLORE</span>{[['About us', '/about'], ['Our services', '/services'], ['Machinery', '/machinery'], ['Our approach', '/how-we-work'], ['FAQs', '/faq'], ['Contact', '/contact']].map(([text, path]) => <Link key={path} to={path}>{text}</Link>)}</div><div className="footer-links"><span>OUR SOLUTIONS</span>{services.map(s => <Link key={s.slug} to={`/services/${s.slug}`}>{s.heading}</Link>)}<Link to="/machinery?category=filling">CSD & RTS filling lines</Link><Link to="/credits">Media credits</Link></div><button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><MoveUpRight size={26}/></button></div><div className="footer-wordmark" aria-hidden="true">LET’S BUILD WHAT’S NEXT<span>↗</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} S5 Global Services</span><span>PEOPLE. PRECISION. PROGRESS.</span><span>Built for possibilities.</span></div></div></footer>;}
