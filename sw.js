const CACHE="arjun-world-v5";
const STATIC=["./manifest.webmanifest","./world_reference_map.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);
 if(e.request.mode==="navigate"||u.pathname.endsWith("/index.html")){
   e.respondWith(fetch(e.request).catch(()=>caches.match("./index.html"))); return;
 }
 e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));
});