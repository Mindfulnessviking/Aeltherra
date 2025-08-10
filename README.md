# Aeltherra • West Marches (Static)

Production ready static site for a West Marches campaign in the world of Aeltherra.

## Features
- Multi page HTML with shared header and footer.
- Interactive SVG world map with clickable continents.
- JSON driven sessions, factions, characters.
- LocalStorage tools for reincarnation and loot logging.
- GitHub Pages friendly. No build step.

## Quick start
1. Click upload on GitHub to create a new repository. Drag the contents of this folder.
2. In the repo settings, enable GitHub Pages. Select “Deploy from a branch” and `main` at `/root`.
3. Update `robots.txt` and `sitemap.xml` with your domain.
4. Edit the JSON in `assets/data` to reflect your campaign.
5. Replace `assets/img/map.svg` with your custom map as needed.

## Dev tips
- Use relative paths only. Tested on GitHub Pages.
- Fonts are served from Google Fonts.
- No frameworks. Pure HTML, CSS, and JS.

## License
MIT
