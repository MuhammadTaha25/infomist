# Deploying infomist-web to Hostinger

Static Vite build + PHP backend for `/blogging` and job applications, served
by Apache on Hostinger shared hosting (hPanel).

## Build

```bash
cd artifacts/infomist-web
npm ci                 # first time / after dependency changes
npm run typecheck      # must pass
npm run build          # -> dist/public/   (alias: npm run build:hostinger)
```

Root-domain deploy uses `BASE_PATH=/` (the default). For a subfolder:
`BASE_PATH=/sub/ npm run build`.

`dist/public/` contains everything to upload — hashed JS/CSS in `assets/`,
`index.html`, all media, `sitemap.xml`, `robots.txt`, the hidden `.htaccess`
files, and the `api/` PHP backend.

## Upload

Upload the **contents of `dist/public/`** into `public_html/` (replace, keep
hidden files). Do **not** upload the `dist/public` folder itself.

## One-time server setup

1. Create the data directory next to `public_html` so blog + application data
   survives redeploys:
   `public_html/../infomist-blog-data/`  (chmod `770`)
   — if you can't create it there, the PHP falls back to `api/data/` inside the
   web root (wiped on every redeploy).
2. Visit `https://<domain>/api/setup.php` once, create the admin account, then
   **delete `api/setup.php`**.
3. In hPanel, enable SSL, then uncomment the Force-HTTPS block at the bottom of
   `.htaccess`.
4. n8n (contact + strategist forms POST straight to the webhooks): on each
   Webhook node set Options → "Allowed Origins (CORS)" to the site domain.

## What Apache does (`public/.htaccess`)

- Real files/directories (`assets/*`, images, `sitemap.xml`, …) are served as-is.
- `api/*.php` runs as PHP; a **missing** `api/*` path is a real 404, never
  index.html.
- Every other path falls through to `index.html` so client-side routes
  (`/our-story`, `/solutions/computer-vision`, deep links, refresh) work.
- Hashed assets get a 1-year immutable cache; `index.html` is never cached.

## Test the built output locally (mirrors Hostinger)

Needs PHP on PATH.

```bash
npm run build
npm run serve:hostinger      # php -S 0.0.0.0:8092 -t dist/public scripts/hostinger-router.php
```

`scripts/hostinger-router.php` reproduces the `.htaccess` rules. `npm run serve`
(vite preview) is fine for the static site but does **not** run PHP, so
`/blogging` and job-application saving won't work there.
