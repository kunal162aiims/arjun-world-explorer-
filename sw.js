const CACHE = "arjun-world-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./world_reference_map.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));