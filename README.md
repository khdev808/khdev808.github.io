# KHDev Portfolio

Portfolio site for **KHDev** — a development team based in Duluth, MN, specializing in AI, web, and mobile apps.

- **Live:** [https://khdev808.github.io](https://khdev808.github.io)
- **Stack:** React, Vite, React Router, Formspree for contact

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Hot reload is enabled.

## Build for production

```bash
npm run build
```

Output is written to `docs/` for GitHub Pages.

**GitHub Pages:** Repo → Settings → Pages → Branch: `main` (or your deploy branch) → Folder: `/docs`.

## Add a portfolio project

1. Add gallery images under `public/portfolio-gallery/{id}-{slug}/` (include `artwork.webp` as the hero slide).
2. Register paths in `src/data/portfolioGallery.json` keyed by `galleryId` (e.g. `mobile-2`, `web-6`).
3. Add a case study in `src/data/projects.js` with `slug`, `title`, `shortDesc`, `galleryId` (or `galleryIds` for multiple), `overview`, `keyFeatures`, `closingPara`, `tools`, and `links`.
4. For App Store / Play Store ratings, add iOS app IDs to `src/data/iosStoreRatings.json` and Android package IDs to `src/data/androidStoreRatings.json` (refresh from store data as needed).
5. Run `npm run build` so `docs/` is updated for deploy.

### Project fields

| Field | Required | Notes |
|-------|----------|--------|
| `slug` | Yes | URL path: `/projects/your-slug` |
| `title`, `shortDesc` | Yes | Shown on home and case study |
| `galleryId` / `galleryIds` | Recommended | Drives image slider |
| `image` | Yes | Fallback poster if gallery is empty |
| `category` or `categories` | Yes | `web`, `mobile`, and/or `ai` |
| `links` | Optional | `iOS`, `Android`, `Website` buttons |

## Theme

The site defaults to **System** (follows OS light/dark). Users can choose Light or Dark in the header; preference is stored in `localStorage` under `khdev-theme`. If system preference is unavailable, **light** mode is used.

## Structure

```
src/
  components/     Header, Footer, sliders, ratings, theme toggle
  pages/          Home, ProjectDetail, NotFound
  data/           projects.js, portfolioGallery.json, store ratings
  hooks/          useTheme, useAppRating
  lib/            theme, gallery paths, store rating helpers
public/
  assets/         Logos, icons, legacy PNG posters
  portfolio-gallery/  Per-project WebP screenshots
docs/             Production build (committed for GitHub Pages)
```

## License

GPL-3.0
