export interface SkillTag {
  label: string;
}

export interface SkillCard {
  category: string;
  name: string;
  tags: SkillTag[];
}

export interface ProjectHighlight {
  text: string | ProjectTextPart[];
}

export interface ProjectTextPart {
  text: string;
  bold?: boolean;
}

export interface ProjectGalleryImage {
  src: string;
  alt: string;
}

export interface Project {
  category: string;
  title: string;
  description: string | ProjectTextPart[];
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
    category: "AI-powered Marketplace",
    title: "Renew",
    description: [
      { text: "Renew is an " },
      { text: "AI-powered marketplace", bold: true },
      { text: " for used PC hardware that replaces seller claims with " },
      { text: "machine-verified evidence", bold: true },
      { text: ". Sellers upload proof photos, and an " },
      { text: "AI vision system", bold: true },
      { text: " verifies hardware condition, benchmark performance, power draw, and boot status to generate an inspection-style verification badge for every listing." },
    ],
    highlights: [
      { text: [{ text: "AI-powered photo verification", bold: true }] },
      { text: [{ text: "AI diagnostic autofill listing system", bold: true }] },
      { text: [{ text: "AI customer service chatbot", bold: true }, { text: " grounded in the platform's knowledge base" }] },
      { text: [
        { text: "Real-time buyer to seller chat", bold: true },
        { text: " with photo attachments, strict buyer to seller scope, delivered live via " },
        { text: "Supabase Realtime", bold: true },
      ] },
      { text: [
        { text: "Multi-currency marketplace", bold: true },
        { text: " with " },
        { text: "live exchange rates", bold: true },
        { text: " and geolocation detection" },
      ] },
      { text: [{ text: "Full marketplace lifecycle", bold: true }, { text: " (browse, create, edit, save, sell)" }] },
      { text: [
        { text: "Seller dashboard", bold: true },
        { text: ", " },
        { text: "full auth", bold: true },
        { text: " (email/password + Google OAuth), responsive dark/light theme, and " },
        { text: "defensive input validation", bold: true },
      ] },
      { text: [
        { text: "Anti-abuse engineering", bold: true },
        { text: " via Postgres-backed " },
        { text: "fixed-window rate limiting", bold: true },
        { text: " with global/per-user/per-IP kill switches and " },
        { text: "fail-closed defaults", bold: true },
        { text: ", protecting AI and upload costs" },
      ] },
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Supabase Postgres", "Supabase Auth", "Supabase Realtime", "Supabase Storage", "Google Gemini", "Vercel"],
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
    category: "Personal Companion Dashboard",
    title: "Gacha Command Center",
    description: [
      { text: "Gacha Command Center is a " },
      { text: "command center for Genshin Impact players", bold: true },
      { text: ", a browser app that turns live in-game account data, active banners/events, and reset timers into one at-a-glance dashboard, wrapped in a " },
      { text: "Teyvat-themed UI", bold: true },
      { text: "." },
    ],
    highlights: [
      { text: [
        { text: "Teyvat Overview dashboard", bold: true },
        { text: " with current and featured 5★ banner pools, live event listings, next game version, and persistent countdowns" },
      ] },
      { text: [
        { text: "Reset countdowns", bold: true },
        { text: " for Spiral Abyss and Imaginarium Theater synced via the HoYoLAB API" },
      ] },
      { text: [
        { text: "Battle Chronicle integration", bold: true },
        { text: " with real resin, home coin, expedition, and commission data via a Cloudflare Worker that encrypts and securely stores HoYoLAB cookies, signs requests, and proxies around API CORS and DS limitations" },
      ] },
      { text: [
        { text: "Client-side live ticking", bold: true },
        { text: " for resin, realm currency, transformer, and expeditions projected forward from pure-function snapshots without polling" },
      ] },
      { text: [
        { text: "Smart notification bell", bold: true },
        { text: " with configurable reminders for resets, banner and event endings, capped resin, finished expeditions, commission bonuses, and the ready transformer" },
      ] },
      { text: [
        { text: "My Characters page", bold: true },
        { text: " with roster data, per-character gear, weapons, and artifacts, filterable by element, weapon type, rarity, and favorites" },
      ] },
      { text: [
        { text: "Adventurer's Log goal tracker", bold: true },
        { text: " for creating, scheduling, and tracking farming, Abyss prep, and wish-planning goals backed by Firestore" },
      ] },
      { text: [
        { text: "Email auth with route-guarding", bold: true },
        { text: ", plus Firebase App Check with reCAPTCHA v3 to stop scripted abuse of the free-tier backend" },
      ] },
    ],
    stack: ["React", "TypeScript", "Vite", "React Router", "Tailwind CSS", "Firebase Auth", "Firestore", "Firebase App Check", "Cloudflare Workers"],
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
    description: [
      { text: "A " },
      { text: "full-stack operations management platform", bold: true },
      { text: " for Taters, a food company in the Philippines, featuring a React/TypeScript frontend that communicates with a " },
      { text: "PHP (CodeIgniter) REST API", bold: true },
      { text: " via Axios and persists data in a " },
      { text: "MySQL database", bold: true },
      { text: ". Covers inventory levels, daily manpower attendance, incident reports, machine logs, purchase requisitions, and efficiency metrics in a unified admin panel." },
    ],
    highlights: [
      { text: [{ text: "Materials and inventory level management", bold: true }] },
      { text: [{ text: "Daily manpower attendance", bold: true }, { text: " and incident reporting" }] },
      { text: [{ text: "Machine logs and efficiency metrics dashboards", bold: true }] },
      { text: [{ text: "Purchase requisition and approval workflows", bold: true }] },
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "PHP", "MySQL"],
    mainImage: "/images/taters-main.jpg",
    mainImageAlt: "Taters web system",
  },
  {
    category: "Native Desktop Markdown Editor",
    title: "SimpleMD",
    description: [
      { text: "A " },
      { text: "lightweight native desktop Markdown editor", bold: true },
      { text: " built with " },
      { text: "Tauri v2", bold: true },
      { text: ", providing a distraction-free writing experience with a " },
      { text: "live rendered preview", bold: true },
      { text: " in a fast, low-memory desktop application." },
    ],
    highlights: [
      { text: [{ text: "Three editing modes", bold: true }, { text: ": Edit, Preview, and Split with live Markdown rendering" }] },
      { text: [{ text: "Full Markdown and GitHub Flavored Markdown support", bold: true }, { text: ", including tables, task lists, and blockquotes" }] },
      { text: [{ text: "Built-in syntax highlighting", bold: true }, { text: " with a custom dependency-free tokenizer" }] },
      { text: [{ text: "Native file integration", bold: true }, { text: ", themes, preview zoom, autosave, and live word count" }] },
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
