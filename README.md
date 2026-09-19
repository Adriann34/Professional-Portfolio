# Adrian Tan — Portfolio

Adrian Tan’s portfolio, built with Next.js, React, TypeScript, Tailwind CSS, and the project’s shadcn-style component primitives.

Live site: https://adrian-tan-portfolio.web.app/

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run build
```

The production build is a static export in `out/`. Firebase Hosting serves that directory according to `firebase.json`.

Deployment is intentionally manual:

```bash
firebase deploy --only hosting
```
