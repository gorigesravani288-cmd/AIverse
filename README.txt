AIverse — PWA Icon Pack
========================
Design: AIV monogram merged with an orbit-node symbol
Background: indigo -> fuchsia gradient (matches your Explore Tools button)

FILES
-----
icon-192.png              Standard app icon, 192x192 (rounded square, for "any" purpose)
icon-512.png               Standard app icon, 512x512 (rounded square, for "any" purpose)
icon-maskable-192.png      Maskable icon, 192x192 (full-bleed, safe for OS shape masks)
icon-maskable-512.png      Maskable icon, 512x512 (full-bleed, safe for OS shape masks)
apple-touch-icon.png       180x180, full-bleed square for iOS home screen
favicon-16x16.png          Browser tab icon
favicon-32x32.png          Browser tab icon (retina)
favicon-48x48.png          Windows taskbar / larger favicon use
favicon.ico                Multi-size .ico (16/32/48) for legacy browser support
manifest-snippet.json      Icons block to paste into your site.webmanifest
head-snippet.html          Tags to paste into your <head>

HOW TO USE
----------
1. Drop all files into your site's root (or /icons/ folder — update paths below if so).
2. Add the contents of manifest-snippet.json into the "icons" array of your
   site.webmanifest / manifest.json file.
3. Add the contents of head-snippet.html into your index.html <head>.

Maskable icons intentionally have extra padding around the artwork — that's
required so Android/OS shape masks (circle, squircle, rounded square) don't
crop off the monogram. The "any" icons (icon-192/512) are pre-rounded and
meant to be shown as-is without an OS mask.
