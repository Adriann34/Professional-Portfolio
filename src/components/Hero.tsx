import React, { useState } from "react";
import { useFadeIn } from "../hooks/useFadeIn";
import { scrollToSection } from "../utils/scroll";

const STACK_CHIPS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Prisma",
  "PostgreSQL",
  "Supabase",
];

const Hero: React.FC = () => {
  const leftRef = useFadeIn<HTMLDivElement>();
  const rightRef = useFadeIn<HTMLDivElement>();
  const [avatarError, setAvatarError] = useState(false);

  return (
    <section className="section" id="about">
      <div className="container ui-container">
        <div className="hero-grid">
          <div className="fade-in" ref={leftRef}>
            <div className="hero-availability">
              <div className="hero-availability-dot" />
              Available for work
            </div>
            <div className="hero-name">
              Adrian
              <br />
              <span className="hero-name-accent">Tan</span>
            </div>
            <div className="hero-role">Full Stack Developer</div>
            <p className="hero-desc">
              Full-stack developer with experience building and shipping
              production-grade web applications and custom business systems.
              Skilled in designing secure APIs, scalable backend architectures,
              authentication systems, real-time applications, AI integrations,
              workflow automation, and application security.
            </p>
            <div className="hero-actions">
              <a
                href="#projects"
                className="btn-grad ui-button"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("projects");
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="m8 21 4-4 4 4" />
                  <path d="M12 17v4" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                className="btn-ghost ui-button"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Get in Touch
              </a>
            </div>
          </div>

          {/* Terminal-styled profile card + stat cards */}
          <div
            className="hero-right fade-in"
            style={{ "--delay": "0.15s" } as React.CSSProperties}
            ref={rightRef}
          >
            <div className="profile-card">
              <div className="term-bar">
                <div className="term-dots">
                  <span className="term-dot term-dot-red" />
                  <span className="term-dot term-dot-yellow" />
                  <span className="term-dot term-dot-green" />
                </div>
                <span className="term-title">adrian@portfolio: ~</span>
              </div>
              <div className="profile-body">
                <div className="avatar">
                  {avatarError ? (
                    <span className="avatar-initials">AT</span>
                  ) : (
                    <img
                      src="/images/profile-photo.png"
                      alt="Adrian Tan"
                      onError={() => setAvatarError(true)}
                    />
                  )}
                </div>
                <div>
                  <div className="profile-name">Adrian Tan</div>
                  <div className="profile-title">Full Stack Developer</div>
                </div>
                <div className="profile-dot" />
              </div>
            </div>

            <div className="hero-cards-grid">
              <div className="hcard">
                <div className="hcard-label">PROJECTS</div>
                <div className="hcard-value">4+ Projects</div>
                <div className="hcard-sub">Shipped products</div>
              </div>
              <div className="hcard">
                <div className="hcard-label">EXPERIENCE</div>
                <div className="hcard-value">1.5+ Years</div>
                <div className="hcard-sub">Years building</div>
              </div>
            </div>

            <div className="stack-card">
              <div className="stack-label">PRIMARY STACK</div>
              <div className="stack-chip-row">
                {STACK_CHIPS.map((label) => (
                  <span key={label} className="stack-chip">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
