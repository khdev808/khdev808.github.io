# KHDev Portfolio

Portfolio site for **KHDev**  -  a development team based in Duluth, MN, specializing in web and mobile apps.

- **Live:** [https://khdev808.github.io](https://khdev808.github.io)
- **Stack:** React, Vite, React Router, Formspree for contact

## Develop

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173). Hot reload is enabled.

## Build for production

```bash
npm run build
```

Output is written to the `docs/` folder for GitHub Pages.

**GitHub Pages setup:** In your repo → Settings → Pages → Source: "Deploy from a branch" → Branch: main → Folder: `/docs` → Save. The SPA will handle all routes (including direct links and refresh on `/projects/:slug`).

## Add a new portfolio item

1. Edit `src/data/projects.js` and add a new object to the `projects` array.
2. Add the project image to `public/assets/png/`.
3. The new project will appear on the home page and be reachable at `/projects/your-slug`.

Required fields: `slug`, `title`, `shortDesc`, `image`, `overview`, `keyFeatures`, `closingPara`, `tools`, `links`.

## Structure

- `src/`  -  React app
  - `components/`  -  Header, Footer, Layout
  - `pages/`  -  Home, ProjectDetail
  - `data/projects.js`  -  Portfolio content (add new projects here)
- `public/assets/`  -  Static images and icons
- `docs/`  -  Build output (generated, used by GitHub Pages)

## License

GPL-3.0
