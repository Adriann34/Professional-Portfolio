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

## Alvono demo

The standalone hair-loss clinic demo is available at `/demos/alvono`, including its six-question assessment at `/demos/alvono#assessment`. Its own document keeps the portfolio's global styles separate from the demo.

The static route reads `public/demo-assets/alvono/index.html` during the build. That folder contains the bundled stylesheet, script, and generated product images. Resource URLs are scoped to `/demo-assets/alvono/` so they work at the clean demo URL. Firebase's route-specific content-type header serves the extensionless exported file as HTML.

To update the demo, copy its HTML, CSS, JavaScript, and assets into that folder, keep those resource URLs, and rebuild. Use synthetic assessment answers; the demo does not transmit or persist them. Patient-platform connections remain outside this demonstration.
