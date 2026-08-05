// ============================================================
// AIverse Service Worker
// Caches the core app shell so it loads instantly on repeat
// visits and still works (mostly) with no internet connection.
// ============================================================

// Bump this version string whenever you change css/js files so
// old caches get cleared out and users get the new version.
const CACHE_VERSION = "aiverse-v1";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/data.js",
  "./js/state.js",
  "./js/render.js",
  "./js/app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
];

// --- INSTALL: pre-cache the app shell ---
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// --- ACTIVATE: clean up old cache versions ---
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// --- FETCH: cache-first for same-origin app files, network for everything else ---
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only handle GET requests
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (isSameOrigin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req)
          .then((res) => {
            // Cache a copy of newly-fetched same-origin assets for next time
            const resClone = res.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, resClone));
            return res;
          })
          .catch(() => {
            // Offline and not cached: fall back to the app shell for navigations
            if (req.mode === "navigate") {
              return caches.match("./index.html");
            }
          });
      })
    );
  } else {
    // Cross-origin (e.g. Google Fonts): try network, fall back to cache if available
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req))
    );
  }
});
