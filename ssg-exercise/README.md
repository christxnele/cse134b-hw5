# HW5 Part 4: Eleventy exercise

This folder rebuilds the Home and About pages from my portfolio with Eleventy. They share one footer, so I only need to update it once.

## Files

- `src/index.html`: home page content
- `src/about.html`: about page content
- `src/_includes/base.njk`: layout for both pages (head, header, nav, and footer include)
- `src/_includes/footer.njk`: the shared footer
- `src/style.css`, `src/theme.js`, `src/media/`: styles, theme toggle, and images copied from my portfolio
- `eleventy.config.js`: input/output folders and which assets get copied

## Install, build, and preview

You need Node.js 18 or newer. Run these from the `ssg-exercise` folder:

```bash
npm install
npm run build
npm start
```

The build goes into `_site/`. `npm start` serves it locally and prints the address to open, usually:

- Home: http://localhost:8080/
- About: http://localhost:8080/about.html

Press `Ctrl + C` to stop the server.

## Checking the shared footer

1. Edit `src/_includes/footer.njk`.
2. Run `npm run build`, then `npm start`.
3. Refresh Home and About. The change appears on both.

## Notes

- Only Home and About are part of this exercise, so links to my other pages and my resume don't work here.
- About uses `permalink: about.html` because Eleventy would otherwise output `about/index.html`, which would break relative paths like `style.css`.
