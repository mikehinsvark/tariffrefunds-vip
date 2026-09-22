# GitHub Pages Deployment Record

**Repository:** `https://github.com/mikehinsvark/tariffrefunds-vip`

**Deployment source:** GitHub Actions workflow in `.github/workflows/deploy-pages.yml`.

**Custom domain:** `tariffrefunds.vip`

**Domain configuration:** GitHub Pages is configured with `tariffrefunds.vip` as its custom domain and HTTPS enforcement enabled.

**Route behavior:** The static deployment includes a `404.html` redirect bridge and startup route restoration. Direct URL requests such as `/business-script` and `/comp-plan` load the intended client route rather than leaving users at a GitHub Pages error screen.

**Partner landing page:** The strategic-partnership experience is maintained as a self-contained Vite application in `partner-app/`. The deployment workflow builds it with `VITE_BASE_PATH=/partner/` and copies its static output into `dist/public/partner/`, publishing it at `https://tariffrefunds.vip/partner/` without changing the existing training routes.

**Asset portability:** The training site's smaller wordmark remains in `client/public/assets/`. Its large logo and overview image are versioned GitHub Release assets under `static-assets-v1`; `VITE_STATIC_EXPORT=true` switches the application to those portable URLs while the Manus workspace continues using its managed asset paths. The partner page's optimized artwork and narrated MP4 are stored in `partner-app/client/public/assets/` so the `/partner/` deployment has no dependency on Manus-managed storage.

**Validation completed:** The root and partner TypeScript checks pass, both Vite applications build successfully, the combined deployment preserves the existing root site, and all `/partner/` images and the 67-second MP4 load from the expected nested URLs.
