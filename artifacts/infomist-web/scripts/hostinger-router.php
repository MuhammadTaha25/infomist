<?php
/**
 * Local Hostinger simulation for the built site.
 *
 *   php -S localhost:8092 -t dist/public scripts/hostinger-router.php
 *
 * Mirrors public/.htaccess: real files (assets, images, sitemap, robots) are
 * served as-is, `.php` runs, `/api/*` that doesn't exist is a real 404, and
 * every other path falls through to index.html so client-side routes work on
 * refresh / deep link. Not used in production — Hostinger's Apache does this.
 */

$root = __DIR__ . '/../dist/public';
$uri  = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = realpath($root . $uri);

// Serve an existing real file (but let PHP-CLI execute .php itself).
if ($path && is_file($path) && strpos($path, realpath($root)) === 0) {
    if (substr($path, -4) === '.php') {
        return false; // hand back to the built-in server to run it
    }
    return false;     // and to serve static assets with correct mime types
}

// A missing /api/* endpoint is a real 404 — never SPA-fallback it.
if (strpos($uri, '/api/') === 0) {
    http_response_code(404);
    echo 'Not found';
    return true;
}

// SPA history fallback.
readfile($root . '/index.html');
return true;
