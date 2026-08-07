export interface SkillTag {
  label: string;
}

export interface SkillCard {
  category: string;
  name: string;
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
  category: string;
  title: string;
  description: string;
  highlights: ProjectHighlight[];
  stack: string[];
  mainImage: string;
  mainImageAlt: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
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
    tags: [
      { label: "PHP" },
      { label: "Cloudflare Workers" },
      { label: "Node.js" },
      { label: "Express" },
      { label: "Prisma" },
    ],
  },
  {
    category: "Layer",
    name: "Database & Cloud",
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
    category: "Full-Stack Marketplace",
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
    mainImage: "/images/renew-new/Renew_Home_1.png",
    mainImageAlt: "Renew homepage — used PC hardware marketplace with a featured verified listing",
    secondaryImage: "/images/renew-new/Renew_Listing_4.png",
    secondaryImageAlt: "Renew listing detail page showing the diagnostic report and proof checklist",
    liveUrl: "https://renew-marketplace.vercel.app/",
    gallery: [
      { src: "/images/renew-new/Renew_Home_1.png", alt: "Homepage — hero, featured listing, and category strip" },
      { src: "/images/renew-new/Renew_Browse_2.png", alt: "Browse listings — category tabs, filters, and sort" },
      { src: "/images/renew-new/Renew_SignIn_3.png", alt: "Sign-in page" },
      { src: "/images/renew-new/Renew_Listing_4.png", alt: "Listing detail page with diagnostic report and proof checklist" },
      { src: "/images/renew-new/Renew_Create_Listing_5.png", alt: "Sell hardware — listing creation form" },
      { src: "/images/renew-new/Renew_Create_listing_6.png", alt: "Sell hardware — listing creation details" },
      { src: "/images/renew-new/Renew_Realtimechat_7.png", alt: "Listing-scoped realtime chat between buyer and seller" },
      { src: "/images/renew-new/Renew_MyListing_8.png", alt: "Account dashboard — your listings" },
      { src: "/images/renew-new/Renew_CustomerService_AI_9.png", alt: "AI customer service assistant" },
      { src: "/images/renew-new/Renew_AI_Verification_10.png", alt: "AI-assisted listing verification" },
    ],
  },
  {
    category: "Live-Service Dashboard System",
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
    mainImage: "/images/gcc-new/GCC_Dashboard_3.png",
    mainImageAlt: "Gacha Command Center dashboard with banner, event, and reset countdowns",
    secondaryImage: "/images/gcc-new/GCC_Signin_2.png",
    secondaryImageAlt: "Gacha Command Center sign-in screen",
    liveUrl: "https://gacha-command-center.web.app/",
    gallery: [
      { src: "/images/gcc-new/GCC_Signin_2.png", alt: "Sign-in page" },
      { src: "/images/gcc-new/GCC_Dashboard_3.png", alt: "Dashboard — version, banners, events, and reset countdowns" },
      { src: "/images/gcc-new/GCC_Dashboard_4.png", alt: "Dashboard — expanded live-service overview" },
      { src: "/images/gcc-new/GCC_Characters_5.png", alt: "Characters page" },
      { src: "/images/gcc-new/GCC_Character-Details_6.png", alt: "Character details page" },
      { src: "/images/gcc-new/GCC_Stats_7.png", alt: "Character stats page" },
      { src: "/images/gcc-new/GCC_Artifacts_8.png", alt: "Artifacts page" },
      { src: "/images/gcc-new/GCC_Talents_9.png", alt: "Talents page" },
      { src: "/images/gcc-new/GCC_Tracker__10.png", alt: "Tracker page — personal goal tracking" },
      { src: "/images/gcc-new/GCC_Settings_11.png", alt: "Settings page" },
      { src: "/images/gcc-new/GCC_Sidebar_1st.png", alt: "Navigation sidebar" },
    ],
  },
  {
    category: "Operations Platform",
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
  },
  {
    category: "Native Desktop Markdown Editor",
    title: "SimpleMD",
    description:
      "A lightweight native desktop Markdown editor built with Tauri v2, providing a distraction-free writing experience with a live rendered preview in a fast, low-memory desktop application.",
    highlights: [
      { text: "Three editing modes: Edit, Preview, and Split with live Markdown rendering" },
      { text: "Full Markdown and GitHub Flavored Markdown support, including tables, task lists, and blockquotes" },
      { text: "Built-in syntax highlighting with a custom dependency-free tokenizer" },
      { text: "Native file integration, themes, preview zoom, autosave, and live word count" },
    ],
    stack: ["React", "TypeScript", "Tauri v2", "Rust", "Vite"],
    mainImage: "/images/simplemd/SimpleMD_1.png",
    mainImageAlt: "SimpleMD editor with Markdown editing and live preview",
    secondaryImage: "/images/simplemd/SimpleMD_2.png",
    secondaryImageAlt: "SimpleMD split editing view",
    gallery: [
      { src: "/images/simplemd/SimpleMD_1.png", alt: "SimpleMD edit mode" },
      { src: "/images/simplemd/SimpleMD_2.png", alt: "SimpleMD split view with live preview" },
      { src: "/images/simplemd/SimpleMD_3.png", alt: "SimpleMD preview mode" },
      { src: "/images/simplemd/SimpleMD_4.png", alt: "SimpleMD Markdown editor" },
      { src: "/images/simplemd/SimpleMD_5.png", alt: "SimpleMD application view" },
      { src: "/images/simplemd/SimpleMD_6.png", alt: "SimpleMD application view" },
      { src: "/images/simplemd/SimpleMD_7.png", alt: "SimpleMD application view" },
      { src: "/images/simplemd/App_Icon(displayitsomewhere).png", alt: "SimpleMD application icon" },
    ],
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
