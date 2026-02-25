# KHDev Portfolio

Portfolio site for **KHDev** — a development team based in Duluth, MN, specializing in web and mobile apps.

- **Live:** [https://khdev808.github.io](https://khdev808.github.io)
- **Stack:** Static HTML/CSS (SCSS), vanilla JS, Formspree for contact

## Develop

```bash
npm install
npm run compile:scss
```

Then open `index.html` in a browser (or use a local server). Edits to files in `sass/` will rebuild `css/style.css` automatically.

## Build for production

```bash
npm run build
```

This compiles SCSS (minified), then runs PostCSS (Autoprefixer) on `css/style.css`. Use the generated `css/style.css` for deployment (e.g. GitHub Pages).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run compile:scss` | Compile SCSS and watch for changes |
| `npm run compile:scss:once` | Single SCSS compile (no watch) |
| `npm run prefix:css` | Run Autoprefixer on `css/style.css` |
| `npm run compress:css` | Compile SCSS to minified CSS |
| `npm run build` | Full build: compress + prefix |

## Structure

- `index.html` — Home (hero, about, projects, contact)
- `dimple.html`, `troutroutes.html`, `checksammy.html` — Case studies
- `sass/` — SCSS source (`main.scss` → `css/style.css`)
- `css/style.css` — Compiled stylesheet
- `index.js` — Header/menu behavior
- `assets/` — Images and icons

## License

GPL-3.0
