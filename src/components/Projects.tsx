import React, { useEffect, useState } from "react";
import { projects, Project, ProjectTextPart } from "../data/content";

const rich = (value: string | ProjectTextPart[]) => typeof value === "string" ? value : value.map((part, i) => part.bold ? <b key={i}>{part.text}</b> : <React.Fragment key={i}>{part.text}</React.Fragment>);

const SHORT_HIGHLIGHTS: Record<string, string[]> = {
  Renew: ["AI photo verification", "Realtime buyer–seller chat", "Verified marketplace listings"],
  "Gacha Command Center": ["Live banners and event timers", "HoYoLAB account sync", "Goals, reminders and reset tracking"],
  "Taters Web Work System": ["Inventory and materials", "Attendance and incident reporting", "Purchase approval workflows"],
  SimpleMD: ["Split editing and live preview", "GFM and syntax highlighting", "Native files and autosave"],
};

const WINDOW_META: Record<string, { path: string; accent: string }> = {
  Renew: { path: "renew-marketplace.vercel.app/browse", accent: "#202321" },
  "Gacha Command Center": { path: "gacha-command-center.web.app/dashboard", accent: "#dad2c6" },
  "Taters Web Work System": { path: "taters.6ms.app/manpower/attendance", accent: "#deded9" },
  SimpleMD: { path: "simplemd.app/editor", accent: "#c9d2d0" },
};

const Lightbox: React.FC<{ images: {src:string;alt:string}[]; index:number; close:()=>void; move:(n:number)=>void }> = ({images,index,close,move}) => {
  useEffect(() => { const key=(e:KeyboardEvent)=>{if(e.key==="Escape")close(); if(e.key==="ArrowLeft")move((index-1+images.length)%images.length); if(e.key==="ArrowRight")move((index+1)%images.length)}; window.addEventListener("keydown",key); document.body.style.overflow="hidden"; return()=>{window.removeEventListener("keydown",key);document.body.style.overflow=""} },[close,index,images.length,move]);
  return <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={close}>
    <button type="button" className="lightbox-close" aria-label="Close image viewer" onClick={(e)=>{e.stopPropagation();close()}}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </button>
    <button type="button" className="lightbox-nav lightbox-nav-prev" aria-label="Previous image" onClick={(e)=>{e.stopPropagation();move((index-1+images.length)%images.length)}}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg>
    </button>
    <div className="lightbox-content" onClick={e=>e.stopPropagation()}><img className="lightbox-image" src={images[index].src} alt={images[index].alt}/></div>
    <button type="button" className="lightbox-nav lightbox-nav-next" aria-label="Next image" onClick={(e)=>{e.stopPropagation();move((index+1)%images.length)}}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7" /></svg>
    </button>
    <div className="lightbox-counter" aria-live="polite">{index+1} / {images.length}</div>
  </div>;
};

const ProjectItem: React.FC<{project:Project; index:number}> = ({project,index}) => {
  const [lightbox,setLightbox]=useState<number|null>(null); const images=project.gallery?.length ? project.gallery : [{src:project.mainImage,alt:project.mainImageAlt}]; const meta=WINDOW_META[project.title];
  return <article className="project"><div className="project-meta"><div><div className="project-number">0{index+1}</div><h3 className="project-title">{project.title === "Taters Web Work System" ? <>Taters<br/>Web Work<br/>System</> : project.title === "Gacha Command Center" ? <>Gacha<br/>Command<br/>Center</> : project.title}</h3><div className="project-type">{project.category}</div></div><div><p className="project-description">{rich(project.description)}</p><ul className="project-highlights">{SHORT_HIGHLIGHTS[project.title].map((item) => <li key={item}>{item}</li>)}</ul>{project.liveUrl && <a className="project-link" href={project.liveUrl} target="_blank" rel="noreferrer">View live project <span className="link-arrow" aria-hidden="true">↗</span></a>}</div></div><div className="window" style={{"--accent": meta.accent} as React.CSSProperties} onClick={()=>setLightbox(0)}><div className="titlebar"><div className="traffic"><span className="r"></span><span className="y"></span><span className="g"></span></div><div className="urlpill"><span className="dot"></span><span className="host">{meta.path}</span></div></div><div className="shot-frame"><img src={project.mainImage} alt={project.mainImageAlt}/><div className="fade"></div></div></div>{lightbox!==null && <Lightbox images={images} index={lightbox} close={()=>setLightbox(null)} move={setLightbox}/>}</article>;
};

const Projects: React.FC = () => <section id="work"><div className="wrap"><div className="section-head"><div className="section-index">01 — SELECTED WORK</div><h2>A few things<br/>I&apos;ve built.</h2></div>{projects.map((project,index)=><ProjectItem key={project.title} project={project} index={index}/>)}</div></section>;
export default Projects;
