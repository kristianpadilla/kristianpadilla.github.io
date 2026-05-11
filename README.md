# Kristian Padilla Portfolio - Modular Version

This is the split version of the original `index (1).html` download. The main file is now `index.html`.

## Upload to GitHub Pages

Upload everything in this folder to the root of your GitHub Pages repository. Keep the folder names exactly as-is:

- `index.html`
- `pages/`
- `css/`
- `js/`
- `data/`
- any existing root assets already referenced by the site, especially `favicon.svg` and `og-card.png`

## Important preview note

Because the HTML pages are now loaded as partial files, preview it through GitHub Pages or a local web server. Opening `index.html` by double-clicking may block `fetch()` in some browsers.

Local preview command:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Edit guide

### HTML content

- Home: `pages/home.html`
- About: `pages/about.html`
- Skills: `pages/skills.html`
- Experience: `pages/experience.html`
- Projects/labs: `pages/projects.html`
- Roadmap: `pages/roadmap.html`
- Human side: `pages/human.html`
- Net/browser section: `pages/net.html`
- Contact: `pages/contact.html`

### Styling

- Global colors/fonts: `css/variables.css`
- General setup: `css/base.css`
- Navbar: `css/navigation.css`
- Hero/HUD: `css/hero.css`
- Main sections: `css/sections.css`
- Reusable effects/components: `css/components.css`
- Mobile/tablet behavior: `css/responsive.css`

### JavaScript

- Page partial loader: `js/include-loader.js`
- Typing text: `js/typing.js`
- Learning progress bar: `js/progress.js`
- Map/deployment markers: `js/map.js`
- Particles, page switching, reveal animations, splash behavior, and global interactions: `js/main.js`

## Notes

The downloaded file had a Cloudflare-protected email link. It has been converted to `mailto:numbaaa96@gmail.com` so it works on GitHub Pages.
