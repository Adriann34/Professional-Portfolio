import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { projects, Project, ProjectTextPart } from "../data/content";
import { useFadeIn } from "../hooks/useFadeIn";

interface LightboxImage {
  src: string;
  alt: string;
}

// Fake "address bar" text for each project's terminal-chrome preview —
// the live URL when deployed, otherwise a plausible .app slug from the title.
const getProjectUrl = (project: Project): string => {
  if (project.liveUrl) {
    return project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
  return `${project.title.split(" ")[0].toLowerCase()}.app`;
};

const renderRichText = (content: string | ProjectTextPart[], keyPrefix: string) => {
  if (typeof content === "string") return content;

  return content.map((part, index) =>
    part.bold ? (
      <b key={`${keyPrefix}-${index}`}>{part.text}</b>
    ) : (
      <React.Fragment key={`${keyPrefix}-${index}`}>{part.text}</React.Fragment>
    )
  );
};

const Lightbox: React.FC<{
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}> = ({ images, index, onClose, onNavigate }) => {
  const hasMultiple = images.length > 1;

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasMultiple) goPrev();
      else if (e.key === "ArrowRight" && hasMultiple) goNext();
    };
    document.addEventListener("keydown", handleKey);
    // Lock background scroll while the lightbox is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, goPrev, goNext, hasMultiple]);

  const current = images[index];

  return createPortal(
    <div className="lightbox-overlay" onClick={onClose}>
      <button
        className="lightbox-close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close preview"
      >
        ✕
      </button>

      {hasMultiple && (
        <button
          className="lightbox-nav lightbox-nav-prev"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={current.src} alt={current.alt} className="lightbox-image" />
      </div>

      {hasMultiple && (
        <button
          className="lightbox-nav lightbox-nav-next"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      {hasMultiple && (
        <div className="lightbox-counter">
          {index + 1} / {images.length}
        </div>
      )}
    </div>,
    document.body
  );
};

const ProjectVisual: React.FC<{ project: Project }> = ({ project }) => {
  const [mainError, setMainError] = useState(false);
  const [secondaryError, setSecondaryError] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Prefer the full gallery (if provided) so the lightbox can step through every
  // screenshot, not just the two shown in the compact card visual. Falls back to
  // main + secondary for projects that only have those two.
  const images: LightboxImage[] =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [
          { src: project.mainImage, alt: project.mainImageAlt },
          ...(project.secondaryImage && !secondaryError
            ? [{ src: project.secondaryImage, alt: project.secondaryImageAlt || project.mainImageAlt }]
            : []),
        ];

  // When using the gallery, the card's main/secondary thumbnails should open the
  // lightbox at their own position in that gallery, not always index 0 / 1.
  const mainIndex = Math.max(0, images.findIndex((img) => img.src === project.mainImage));
  const secondaryIndex = project.secondaryImage
    ? Math.max(0, images.findIndex((img) => img.src === project.secondaryImage))
    : 0;

  return (
    <>
      <div className="project-visual">
        <div className="term-bar">
          <div className="term-dots">
            <span className="term-dot term-dot-red" />
            <span className="term-dot term-dot-yellow" />
            <span className="term-dot term-dot-green" />
          </div>
          <span className="term-title">{getProjectUrl(project)}</span>
        </div>
        <div className="project-visual-body">
          {mainError ? (
            <div className="project-visual-fallback">{project.title} Preview</div>
          ) : (
            <div className="project-mockup-stack">
              <img
                className="main-shot zoomable"
                src={project.mainImage}
                alt={project.mainImageAlt}
                onError={() => setMainError(true)}
                onClick={() => setLightboxIndex(mainIndex)}
              />
              {project.secondaryImage && !secondaryError && (
                <img
                  className="secondary-shot zoomable"
                  src={project.secondaryImage}
                  alt={project.secondaryImageAlt}
                  onError={() => setSecondaryError(true)}
                  onClick={() => setLightboxIndex(secondaryIndex)}
                />
              )}
              {images.length > 2 && (
                <button
                  type="button"
                  className="gallery-count-pill"
                  onClick={() => setLightboxIndex(0)}
                  aria-label={`View all ${images.length} screenshots`}
                >
                  +{images.length - 2} more
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(next) => setLightboxIndex(next)}
        />
      )}
    </>
  );
};

const ProjectCard: React.FC<{ project: Project; delay: string }> = ({
  project,
  delay,
}) => {
  const ref = useFadeIn<HTMLDivElement>();
  const cardVars = { "--delay": delay } as React.CSSProperties;

  return (
    <div
      className={`project-card fade-in${
        project.title === "Gacha Command Center"
          ? " project-card-gacha"
          : project.title === "Renew"
            ? " project-card-renew"
            : ""
      }`}
      style={cardVars}
      ref={ref}
    >
      <div className="project-inner">
        <ProjectVisual project={project} />
        <div className="project-info">
          <div className="project-category">{project.category}</div>
          <div className="project-title">{project.title}</div>
          <p className="project-desc">
            {renderRichText(project.description, `${project.title}-description`)}
          </p>
          <ul className="project-highlights">
            {project.highlights.map((h) => (
              <li key={typeof h.text === "string" ? h.text : h.text.map((part) => part.text).join("")}>
                {renderRichText(h.text, `${project.title}-highlight`)}
              </li>
            ))}
          </ul>
          <div className="project-stack">
            {project.stack.map((tech) => (
              <span className="stack-tag ui-tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-grad ui-button project-cta"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
              </svg>
              Try it live
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const titleRef = useFadeIn<HTMLDivElement>();

  return (
    <section className="section" id="projects">
      <div className="container ui-container">
        <div className="fade-in" ref={titleRef}>
          <div className="section-eyebrow">
            <span className="eyebrow-prompt">$</span> cat projects.log
          </div>
          <div className="section-title">Featured Projects</div>
        </div>
        <div className="projects-list">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              delay={`${i * 0.1}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
