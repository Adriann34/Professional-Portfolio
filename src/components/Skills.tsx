import React from "react";
import { skillCards } from "../data/content";

const Skills: React.FC = () => <section id="capabilities"><div className="wrap">
  <div className="section-head"><div className="section-index">03 — CAPABILITIES</div><h2>Useful by design.</h2></div>
  <div className="capabilities">{skillCards.map((card) => <article className="capability" key={card.name}>
    <h3>{card.name}</h3><p>{card.name === "Frontend" ? "Interfaces that feel clear, fast and considered — from first click to final detail." : card.name === "Backend" ? "The dependable systems behind the screen: APIs, workflows, auth and realtime behavior." : "Practical data foundations and cloud infrastructure that keep products healthy as they grow."}</p>
    <div className="capability-tags">{card.tags.map((tag) => <span key={tag.label}>{tag.label}</span>)}</div>
  </article>)}</div>
</div></section>;
export default Skills;
