# GitHub Pages Deployment Record

**Repository:** `https://github.com/mikehinsvark/tariffrefunds-vip`

**Deployment source:** GitHub Actions workflow in `.github/workflows/deploy-pages.yml`.

**Custom domain:** `tariffrefunds.vip`

**Domain configuration:** GitHub Pages is configured with `tariffrefunds.vip` as its custom domain and HTTPS enforcement enabled.

**Route behavior:** The static deployment includes a `404.html` redirect bridge and startup route restoration. Direct URL requests such as `/business-script` and `/comp-plan` load the intended client route rather than leaving users at a GitHub Pages error screen.

**Asset portability:** The smaller wordmark remains in `client/public/assets/`. The large logo and overview image are versioned GitHub Release assets under `static-assets-v1`; `VITE_STATIC_EXPORT=true` switches the application to those portable URLs while the Manus workspace continues using its managed asset paths.

**Validation completed:** The GitHub Actions build and deploy workflow completed successfully; the HTTPS custom domain loaded the `/comp-plan` route and its controlled internal-reference content.
