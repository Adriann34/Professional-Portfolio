import React, { useState } from "react";
import { navLinks } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToSection } from "../utils/scroll";

const sectionIds = navLinks.map((l) => l.href);

const Navbar: React.FC = () => {
  const active = useActiveSection(sectionIds);
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderLinks = (onNavigate: (href: string) => void) =>
    navLinks.map((link) => (
      <a
        key={link.href}
        href={`#${link.href}`}
        className={`nav-link${active === link.href ? " active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(link.href);
        }}
      >
        {link.label}
      </a>
    ));

  return (
    <nav>
      <div className="nav-inner">
        <span className="nav-logo">
          adrian
          <span className="nav-logo-cursor" aria-hidden="true" />
        </span>
        <div className="nav-links">
          {renderLinks((href) => scrollToSection(href))}
        </div>
        <div className="nav-right">
          <button className="nav-cta" onClick={() => scrollToSection("contact")}>
            Hire Me
          </button>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>
      <div className={`nav-mobile-panel${mobileOpen ? " open" : ""}`}>
        {renderLinks((href) => {
          setMobileOpen(false);
          scrollToSection(href);
        })}
      </div>
    </nav>
  );
};

export default Navbar;
