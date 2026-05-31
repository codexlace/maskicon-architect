const CACHE_NAME = 'maskicon-architect-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './sw-register.js',
  './css/tokens.css',
  './css/layout.css',
  './css/components.css',
  './css/blueprint.css',
  './css/theme.css',
  './js/app.js',
  './js/state.js',
  './js/canvas.js',
  './js/ui.js',
  './js/storage.js',
  './js/export.js',
  './js/utils.js',
  './modules/shapes.js',
  './modules/eyes.js',
  './modules/mouths.js',
  './modules/mascot.js',
  './modules/wordmark.js',
  './modules/assembly.js',
  './assets/icons/app-icon-192.png',
  './assets/icons/app-icon-512.png',
  './assets/icons/maskable-icon.png',
  './assets/ui/logo.svg',
  './assets/ui/grid-bg.svg',
  './assets/mascot/mascot-default.svg',
  './data/guides.json',
  './data/spacing.json',
  './data/presets.json',
  './data/mascot.json'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match('./index.html')))
  );
});
