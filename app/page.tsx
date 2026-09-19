"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Flame,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

const technologies = [
  ["nextdotjs", "Next.js"],
  ["typescript", "TypeScript"],
  ["react", "React"],
  ["supabase", "Supabase"],
  ["vercel", "Vercel"],
  ["prisma", "Prisma"],
] as const;

const slides = [
  {
    image: "/images/renew/captures/desktop/home.webp",
    title: "A marketplace with a point of view.",
    label: "Brand & product direction",
    alt: "Renew marketplace home page with a hardware hero, search, and calls to browse or sell PC parts",
  },
  {
    image: "/images/renew/captures/desktop/browse.webp",
    title: "Discovery designed for real decisions.",
    label: "Search, filters & catalog",
    alt: "Renew marketplace browse page with hardware categories, condition and price filters, sorting, and product cards",
  },
  {
    image: "/images/renew/captures/desktop/listing-ai-verified.webp",
    title: "Trust built from evidence.",
    label: "AI-assisted verification",
    alt: "Renew graphics card listing with condition grade, verification checks, photo evidence, and purchase controls",
  },
  {
    image: "/images/renew/captures/desktop/sell-gpu.webp",
    title: "A guided flow for complex hardware.",
    label: "Category-aware selling",
    alt: "Renew GPU listing form with diagnostic proof steps, photo upload, pricing, specifications, and location fields",
  },
  {
    image: "/images/renew/captures/desktop/sign-in.webp",
    title: "Secure access, without friction.",
    label: "Authentication & Google sign-in",
    alt: "Renew sign-in page with email and password fields, password recovery, and Google authentication",
  },
  {
    image: "/images/renew/captures/desktop/support-chat-open.webp",
    title: "Help, right where it’s needed.",
    label: "AI support assistant",
    alt: "Renew frequently asked questions page with the AI support assistant chat panel open",
  },
];

const capabilities = [
  { name: "Interfaces that feel right.", text: "Responsive layouts, thoughtful interactions, and attention to the smallest detail.", tag: "Frontend development", image: "/images/services/frontend.png" },
  { name: "From idea to application.", text: "Connecting the interface to the logic that makes a product work.", tag: "Full-stack engineering", image: "/images/services/full-stack.png" },
  { name: "A solid foundation.", text: "Structured data, authentication, and storage built into the experience.", tag: "Data & integration", image: "/images/services/data-integration.png" },
  { name: "In sync. In real time.", text: "Live conversations and instant feedback that keep people connected.", tag: "Realtime experiences", image: "/images/services/realtime.png" },
];

const experience = [
  {
    role: "Software Engineer",
    company: "Taters Enterprises Inc.",
    date: "2024 — 2025",
    description: "Built a full-stack ERP platform using React, TypeScript, PHP CodeIgniter, and MySQL to streamline multi-branch operations, reporting, workflow automation, and business performance tracking.",
  },
  {
    role: "Full Stack Web Developer",
    company: "Fairmount Notary",
    date: "2026",
    description: "Designed and built an on-demand remote online notarization platform using Next.js, React, TypeScript, PostgreSQL, and Prisma, integrating Stripe, Supabase, and a third-party service provider to automate secure document intake, notary dispatch, live sessions, and payment settlement.",
  },
];

const projects = [
  {
    title: "Gacha Command Center",
    category: "Personal companion dashboard",
    image: "/images/projects/gacha-command-center-studio.png",
    alt: "Gacha Command Center character dashboard displayed on a MacBook Pro",
    stack: ["React", "TypeScript", "Firebase"],
    href: "https://gacha-command-center.web.app/",
  },
  {
    title: "Taters Web Work System",
    category: "Operations platform",
    image: "/images/projects/taters-cover.png",
    alt: "Taters operations dashboard showing workplace inventory and management tools",
    stack: ["React", "PHP", "MySQL"],
  },
  {
    title: "SimpleMD",
    category: "Native desktop editor",
    image: "/images/projects/simplemd.png",
    alt: "SimpleMD editor with Markdown editing and live preview",
    stack: ["Tauri", "Rust", "TypeScript"],
  },
];

function Slideshow() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);

  useEffect(() => {
    if (paused || hovered || focused || reduced) return;
    const timer = setInterval(() => api?.scrollNext(), 5000);
    return () => clearInterval(timer);
  }, [api, paused, hovered, focused, reduced]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      className="slideshow"
      aria-label="Renew project slideshow"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <div className="slide-track" aria-hidden="true"><CarouselContent className="slide-track-content">{slides.map((slide) => <CarouselItem className="slide-track-slide" key={slide.image}><div className="slide-track-item" /></CarouselItem>)}</CarouselContent></div>
      <div className="slide-images">{slides.map((slide, index) => <img key={slide.image} src={slide.image} alt={index === active ? slide.alt : ""} aria-hidden={index !== active} className={index === active ? "slide-image active" : "slide-image"} />)}</div>
      <div className="slide-shade" />
      <div className="slide-copy"><span className="eyebrow">{slides[active].label}</span><h3>{slides[active].title}</h3></div>
      <div className="slide-controls">
        <div className="slide-pagination">{slides.map((_, index) => <button key={index} className={active === index ? "selected" : ""} aria-label={`Show slide ${index + 1}`} aria-current={active === index ? "true" : undefined} onClick={() => api?.scrollTo(index)}><span /></button>)}</div>
        <div className="slide-actions"><span className="meta-label">{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span><Button className="round" variant="ghost" size="icon" aria-label="Previous slide" onClick={() => api?.scrollPrev()}><ArrowLeft size={17} /></Button><Button className="round" variant="ghost" size="icon" aria-label={paused || reduced ? "Play slideshow" : "Pause slideshow"} disabled={reduced} onClick={() => setPaused(!paused)}>{paused || reduced ? <Play size={15} /> : <Pause size={15} />}</Button><Button className="round" variant="ghost" size="icon" aria-label="Next slide" onClick={() => api?.scrollNext()}><ArrowRight size={17} /></Button></div>
      </div>
    </Carousel>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const content = <div className="gallery-image"><img src={project.image} alt={project.alt} loading="lazy" /><div className="gallery-overlay"><div><div className="gallery-stack">{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div><span>{project.category}</span><h3>{project.title}</h3></div>{project.href && <ArrowUpRight size={20} aria-hidden="true" />}</div></div>;
  return project.href ? <a className="gallery-card" href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title} live`}>{content}</a> : <article className="gallery-card" tabIndex={0} aria-label={`${project.title}, ${project.category}`}>{content}</article>;
}

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header shell" id="top"><a href="#top" className="wordmark" aria-label="Adrian home">Adrian</a><nav aria-label="Main navigation"><a href="#about">About</a><a href="#experience">Experience</a><a href="#work">Work</a></nav><a className="header-cta" href="#work">Explore my work <ArrowUpRight size={16} /></a></header>
    <main id="main">
      <section className="hero shell" aria-labelledby="hero-title"><div className="hero-kicker meta-label">THOUGHTFULLY BUILT. PERSONALLY CRAFTED.</div><div className="portrait-wrap"><img className="portrait" src="/images/adrian.png" alt="Adrian Tan" fetchPriority="high" /><div className="portrait-caption"><span>Adrian Tan</span><span>Software Engineer</span></div></div><h1 id="hero-title"><span>Software</span><span>Engineer</span></h1><div className="hero-intro"><p>Hi, I’m Adrian. I turn complex<br className="desktop-break" /> ideas into simple, considered<br className="desktop-break" /> digital experiences.</p></div><a className="hero-bottom" href="#work"><span className="circle-arrow"><ArrowDown size={18} /></span><span>SCROLL TO EXPLORE</span></a></section>
      <section className="tech-section" aria-label="Technologies I use"><div className="shell tech-heading"><span className="meta-label">MY EVERYDAY TOOLKIT</span></div><div className="tech-window"><div className="tech-track">{[0, 1].map((copy) => <div className="tech-group" key={copy} aria-hidden={copy === 1}>{technologies.map(([icon, name]) => <div className="tech-pill" key={name}><img src={`/tech/${icon}.svg`} alt="" /><span>{name}</span></div>)}<div className="tech-pill"><Flame aria-hidden="true" /><span>Firebase</span></div></div>)}</div></div></section>
      <section id="about" className="about shell section-space"><div className="section-label reveal"><span className="section-pill">A little about me</span></div><div className="section-heading reveal"><h2>Engineering the details.<br /><span>Seeing the bigger picture.</span></h2></div><div className="about-grid reveal"><Slideshow /><aside className="about-aside"><div><span className="meta-label muted">THE APPROACH</span><h3>Curiosity.<br />Craft.<br />Follow-through.</h3></div><p>I like building things that solve real problems — and taking the time to make them feel effortless.</p><a className="text-link" href="https://renew-marketplace.vercel.app/" target="_blank" rel="noreferrer">Meet my latest project <ArrowUpRight size={17} /></a></aside></div></section>
      <section className="capabilities shell section-space" aria-labelledby="services-title"><div className="capability-heading reveal"><div><span className="capability-eyebrow">SERVICES</span><h2 id="services-title">Ideas, built for what&apos;s next.</h2></div><p>From polished interfaces to powerful infrastructure,<br className="desktop-break" /> I help turn complex ideas into intuitive, real-world products.</p></div><div className="capability-grid">{capabilities.map(({ name, text, tag, image }, index) => <article className={`capability reveal ${index === 2 ? "dark-card" : ""}`} key={name}><div className="capability-content"><div className="capability-copy"><span className="capability-tag">{tag}</span><h3>{name}</h3><p>{text}</p></div></div><div className="capability-visual"><img src={image} alt="" loading="lazy" /></div></article>)}</div></section>
      <section id="experience" className="experience section-space"><div className="shell"><div className="section-label reveal"><span className="section-pill">The journey</span></div><div className="section-heading reveal"><h2>Always learning.<br /><span>Always building.</span></h2></div><div className="experience-rows">{experience.map((item) => <article className="experience-row reveal" key={item.company}><div className="experience-copy"><h3>{item.role}</h3><p className="experience-company">{item.company}</p><p className="experience-description">{item.description}</p></div><span className="experience-date">{item.date}</span></article>)}</div></div></section>
      <section id="work" className="work shell section-space"><div className="section-label reveal"><span className="section-pill">Selected work</span></div><div className="section-heading reveal"><h2>A few things<br /><span>I’ve put into the world.</span></h2></div><div className="project-gallery reveal">{projects.map((project) => <ProjectCard project={project} key={project.title} />)}</div></section>
    </main>
    <footer className="footer"><div className="shell"><div className="footer-top"><span className="meta-label">GOOD WORK STARTS WITH CURIOSITY.</span><a href="#top" className="back-top">Back to top <span><ArrowUp size={20} /></span></a></div><a className="footer-cta" href="mailto:adriantanbusiness34@gmail.com"><h2>Let’s build<br />something good.</h2><ArrowUpRight aria-hidden="true" /></a><div className="footer-bottom"><a className="wordmark" href="#top">Adrian</a><span>Software Engineer</span><nav aria-label="Contact links"><a href="mailto:adriantanbusiness34@gmail.com">Email</a><a href="https://www.linkedin.com/in/adrian-jude-tan/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/Adriann34" target="_blank" rel="noreferrer">GitHub</a></nav><span>© {new Date().getFullYear()} Adrian Tan</span></div></div></footer>
  </>;
}
