# McKee Media website

A static website built from the **McKee Media Website** Figma file. It has six pages: Home, Services, Portfolio, About, Blog and Contact.
Plain HTML/CSS/JS with no framework, so it can be hosted anywhere (Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any web server).

## Viewing it locally

Open `index.html` in a browser, or run a local server:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Editing

The page content lives in `src/pages/`. The shared header, footer and buttons are in `src/partials/`.
After editing, rebuild the top-level `.html` files with:

```sh
node build.js
```

(Node.js is the only requirement; there's nothing to install.) Styles are in `assets/css/styles.css` and colors are defined as variables at the top.
The built `.html` files are committed, so the repo is deployable as-is.

## Before launch

**Images are temporary stand-ins.** The Figma API was unavailable (network policy + plan limits), so every photo and logo in
`assets/img/` was cropped from a low-resolution render of the design. Replace them with the originals, keeping the same
filenames. Recommended export size is 2× the display size:

| File | Figma layer | Display size |
|---|---|---|
| `logo.png` | Nav "Untitled-2-02 1" | 184×96 |
| `clients-strip.png` | Home "Clients" band (or export the 4 logos separately) | 1440×128 |
| `who-we-are.png` | Home "Who We Are" photo + key graphic | 532×514 |
| `team-group.jpg` | Contact "Rectangle 27" | 544×482 |
| `team-*.jpg`, `partner-*.jpg` | About team / partner photos | 359×370 |
| `service-*.jpg` | Services "Image Placeholder" frames | 460×380 |
| `case-*.jpg` | Portfolio "Content from the campaign" tiles | 232×291 / 178×291 / 378×325 |

These are also stand-ins:
- `key-pattern.svg` is a simple keyhole pattern standing in for the "Untitled-2-21" pattern image.
- The social icons are hand-drawn SVGs.

**Fonts.** The headings use *Social Gothic Soft* in Figma. It's a commercial font, so the site currently uses **Anton**
(Google Fonts) instead. To switch, add the licensed `SocialGothic-Soft.woff2` to `assets/fonts/` and uncomment the `@font-face` block at the top of `styles.css`.

**Forms.** The contact and newsletter forms are set up for **Netlify Forms** and work with no setup when hosted on Netlify.
Anywhere else, create a form endpoint (for example Formspree) and paste its URL into `FORM_ENDPOINT` in `assets/js/main.js`.

**Links and copy to fill in.** Search the `src/` folder for `TODO`:
- Social profile URLs (header + footer) are currently `#`.
- Blog "Read more" links have no post pages yet.
- The footer "Jobs" link points to Contact.
- The Sabrina Design & Production website URL is missing.
- Esmeralda Gonzalez's bio is identical to Kelly Phillips's in the Figma file.
- The Portfolio hero repeats the About hero copy ("Meet the team behind the strategy").
- The two "NEED PHOTO OR STAT" tiles on Contact are placeholders from the design.
- The Home hero has a slot for a background video (`.hero-media` in `index.html`).
