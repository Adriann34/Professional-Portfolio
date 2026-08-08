import React, { useState } from "react";
import { scrollToSection } from "../utils/scroll";

const Navbar: React.FC = () => { const [open, setOpen] = useState(false); const go = (id: string) => { setOpen(false); scrollToSection(id); }; return <header className="wrap site-nav">
    <a className="mark" href="#top">adrian<i>.</i></a>
    <nav className="nav-links" aria-label="Primary">
      <a href="#work">Work</a><a href="#about">About</a><a href="#capabilities">Capabilities</a>
    </nav>
    <a className="nav-cta" href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>Let&apos;s talk <span className="link-arrow" aria-hidden="true">↗</span></a>
    <button className="nav-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
    {open && <div className="mobile-nav"><a href="#work" onClick={(e)=>{e.preventDefault();go("work")}}>Work</a><a href="#about" onClick={(e)=>{e.preventDefault();go("about")}}>About</a><a href="#capabilities" onClick={(e)=>{e.preventDefault();go("capabilities")}}>Capabilities</a><a href="#contact" onClick={(e)=>{e.preventDefault();go("contact")}}>Let&apos;s talk</a></div>}
  </header>;
};
export default Navbar;
