# Tariff Refunds Solutions Group Partner Landing Page

This directory contains the source for the strategic-partnership landing page published at `https://tariffrefunds.vip/partner/`.

## Local development

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The app uses `/` as its local development base path.

## Validation

```bash
pnpm check
VITE_BASE_PATH=/partner/ pnpm exec vite build
```

## GitHub Pages deployment

The repository-level workflow at `../.github/workflows/deploy-pages.yml` builds this app with `VITE_BASE_PATH=/partner/`, then copies `partner-app/dist/public/` into the root deployment artifact at `dist/public/partner/`. This keeps the existing training site at the domain root while publishing this app at `/partner/`.

All images and the narrated video are stored in `client/public/assets/`. The deployed site does not depend on `/manus-storage/` URLs.
