export interface SkillTag {
  label: string;
}

export interface SkillCard {
  category: string;
  name: string;
  iconColor: string;
  iconBg: string;
  tags: SkillTag[];
}

export interface ProjectHighlight {
  text: string;
}

export interface ProjectGalleryImage {
  src: string;
  alt: string;
}

export interface Project {
  number: string;
  category: string;
  accentColor: string;
  title: string;
  description: string;
  highlights: ProjectHighlight[];
  stack: string[];
  mainImage: string;
  mainImageAlt: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  glowColor: string;
  visualBackground: string;
  /** External link to a live, working deployment. When present, the card shows a
   *  "Live Demo" button that opens this URL in a new tab. */
  liveUrl?: string;
  /** Full set of preview images for the lightbox, in display order. When omitted,
   *  the lightbox falls back to just mainImage + secondaryImage. Lets a project show
   *  more than two screenshots without changing the compact main/secondary card visual. */
  gallery?: ProjectGalleryImage[];
}

export const skillCards: SkillCard[] = [
  {
    category: "Layer",
    name: "Frontend",
    iconColor: "#5b7fff",
    iconBg: "rgba(91,127,255,0.12)",
    tags: [
      { label: "React" },
      { label: "Next.js" },
      { label: "TypeScript" },
      { label: "Tailwind CSS" },
    ],
  },
  {
    category: "Layer",
    name: "Backend",
    iconColor: "#a259ff",
    iconBg: "rgba(162,89,255,0.12)",
    tags: [
      { label: "PHP" },
      { label: "Cloudflare Workers" },
      { label: "Node.js" },
      { label: "Prisma" },
    ],
  },
  {
    category: "Layer",
    name: "Database & Cloud",
    iconColor: "#00d4aa",
    iconBg: "rgba(0,212,170,0.1)",
    tags: [
      { label: "MySQL" },
      { label: "PostgreSQL" },
      { label: "Firebase" },
      { label: "Firestore" },
      { label: "Supabase" },
    ],
  },
];

export const projects: Project[] = [
  {
    number: "01 / 03",
    category: "Full-Stack Marketplace",
    accentColor: "#b8722c",
    title: "Renew",
    description:
      "A marketplace for buying and selling used PC hardware, GPUs, CPUs, and everything in between, where every listing carries a seller-filled diagnostic report (condition grade, benchmark score, tested power draw) backed by photo proof, so buyers can trust a used part before it ships. Built on Next.js, TypeScript with Prisma/Supabase Postgres for data, Supabase Auth for sign-in, and Supabase Realtime for listing-scoped buyer/seller chat.",
    highlights: [
      { text: "Diagnostic report listings include grade, benchmark score, wattage, photo proof, tailored per hardware category" },
      { text: "Full auth: email/password with reset flow, plus Google OAuth via Supabase" },
      { text: "Browse with category tabs, grade/price filters, search, and sort" },
      { text: "Listing-scoped realtime chat between buyer and seller via Supabase Realtime" },
    ],
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Prisma", "Supabase"],
    mainImage: "/images/renew-01-homepage.jpg",
    mainImageAlt: "Renew homepage — used PC hardware marketplace with a featured verified listing",
    secondaryImage: "/images/renew-10-listing-view.jpg",
    secondaryImageAlt: "Renew listing detail page showing the diagnostic report and proof checklist",
    glowColor: "#b8722c",
    visualBackground:
      "linear-gradient(135deg, rgba(184,114,44,0.1), rgba(0,212,170,0.05))",
    gallery: [
      { src: "/images/renew-01-homepage.jpg", alt: "Homepage — hero, featured listing, and category strip" },
      { src: "/images/renew-02-recently-verified.jpg", alt: "Homepage — recently verified listings grid" },
      { src: "/images/renew-03-homepage-bottom.jpg", alt: "Homepage — trust bar and seller call-to-action" },
      { src: "/images/renew-04-browse-listings.jpg", alt: "Browse listings — category tabs, filters, and sort" },
      { src: "/images/renew-05-sell-form.jpg", alt: "Sell hardware — category picker" },
      { src: "/images/renew-06-sell-creation.jpg", alt: "Sell hardware — listing creation form with diagnostic report" },
      { src: "/images/renew-07-sell-preview.jpg", alt: "Sell hardware — live preview while filling out the diagnostic report" },
      { src: "/images/renew-08-account.jpg", alt: "Account dashboard — your listings" },
      { src: "/images/renew-09-account-settings.jpg", alt: "Account dashboard — profile and security settings" },
      { src: "/images/renew-10-listing-view.jpg", alt: "Listing detail page with diagnostic report and proof checklist" },
      { src: "/images/renew-11-chat.jpg", alt: "Listing-scoped realtime chat between buyer and seller" },
    ],
  },
  {
    number: "02 / 03",
    category: "Live-Service Dashboard System",
    accentColor: "#8b5cf6",
    title: "Gacha Command Center",
    description:
      "A live, two-service dashboard system: a React/TypeScript frontend with Firebase Auth + real-time Firestore sync, fed by a separate Cloudflare Worker that runs a scheduled ETL job aggregating data from multiple unauthenticated third-party APIs — with data-integrity guards, fallback resolution, and graceful degradation when upstream sources fail. Applied to Genshin Impact, a live service game (banners, events, resets, 100+ characters).",
    highlights: [
      { text: "Live banners, events, and version tracking via a scheduled Cloudflare Worker" },
      { text: "Character showcase synced using Enka API — builds, artifacts, and stats" },
      { text: "Personal Task tracker with deadlines, categories, and global search" },
      { text: "Smart reminders for banner/event/reset deadlines, fully configurable" },
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Firestore Rest API", "Cloudflare Workers"],
    mainImage: "/images/gcc-02-dashboard.png",
    mainImageAlt: "Gacha Command Center dashboard with banner, event, and reset countdowns",
    secondaryImage: "/images/gcc-01-signin.png",
    secondaryImageAlt: "Gacha Command Center sign-in screen",
    glowColor: "#8b5cf6",
    visualBackground:
      "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(34,211,238,0.07))",
    liveUrl: "https://gacha-command-center.web.app/",
    gallery: [
      { src: "/images/gcc-01-signin.png", alt: "Sign-in page" },
      { src: "/images/gcc-02-dashboard.png", alt: "Dashboard — version, banners, events, and reset countdowns" },
      { src: "/images/gcc-03-tracker.png", alt: "Tracker page — personal goal tracking" },
      { src: "/images/gcc-04-account.png", alt: "My Account page — live character showcase" },
      { src: "/images/gcc-05-settings.png", alt: "Settings — profile" },
      { src: "/images/gcc-06-settings-security.png", alt: "Settings — security" },
      { src: "/images/gcc-07-notifications.png", alt: "Notifications window" },
      { src: "/images/gcc-08-search.png", alt: "Global search bar" },
      { src: "/images/gcc-09-settings-notifications.png", alt: "Settings — notification preferences" },
    ],
  },
  {
    number: "03 / 03",
    category: "Operations Platform",
    accentColor: "#00d4aa",
    title: "Taters Web Work System",
    description:
      "A full-stack operations management platform for Taters, a food company in the Philippines, featuring a React/TypeScript frontend that communicates with a PHP (CodeIgniter) REST API via Axios and persists data in a MySQL database. Covers inventory levels, daily manpower attendance, incident reports, machine logs, purchase requisitions, and efficiency metrics in a unified admin panel.",
    highlights: [
      { text: "Materials and inventory level management" },
      { text: "Daily manpower attendance and incident reporting" },
      { text: "Machine logs and efficiency metrics dashboards" },
      { text: "Purchase requisition and approval workflows" },
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "PHP", "MySQL"],
    mainImage: "/images/taters-main.jpg",
    mainImageAlt: "Taters web system",
    glowColor: "#00d4aa",
    visualBackground:
      "linear-gradient(135deg, rgba(0,212,170,0.07), rgba(91,127,255,0.06))",
  },
];

export const contactInfo = {
  phone: "09395027112",
  email: "adriantanbusiness34@gmail.com",
  location: "Manila, Philippines",
  linkedinUrl: "https://www.linkedin.com/in/adrian-jude-tan/",
  linkedinHandle: "adrian-jude-tan",
  githubUrl: "https://github.com/Adriann34",
  githubHandle: "Adriann34",
  onlineJobsUrl: "https://v2.onlinejobs.ph/jobseekers/info/5118200",
  onlineJobsHandle: "Adrian Tan",
};

export const navLinks = [
  { href: "about", label: "About" },
  { href: "skills", label: "Skills" },
  { href: "projects", label: "Projects" },
  { href: "contact", label: "Contact" },
];
