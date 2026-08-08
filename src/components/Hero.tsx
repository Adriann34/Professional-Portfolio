import React from "react";
import { scrollToSection } from "../utils/scroll";

const Hero: React.FC = () => <section className="wrap hero" id="top">
  <div className="eyebrow">Full-stack developer · Manila</div>
  <h1>I build software<br />people <em>actually use.</em></h1>
  <div className="hero-bottom">
    <p className="intro">I&apos;m Adrian, a full-stack developer focused on turning messy, real-world problems into simple, dependable products.</p>
    <p className="hero-note">Marketplaces, business systems, automation and realtime applications. I care more about the product working well and holding up under real conditions.</p>
  </div>
  <a href="#work" className="project-link" onClick={(e) => { e.preventDefault(); scrollToSection("work"); }}>See selected work <span className="link-arrow" aria-hidden="true">↓</span></a>
</section>;
export default Hero;
