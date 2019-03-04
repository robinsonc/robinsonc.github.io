var cacheName = 'lumber-calculator';
var filesToCache = [
  '/',
  '/index.html',
  '/fonts/poppins/Poppins-Regular.ttf',
  '/fonts/poppins/Poppins-Medium.ttf',
  '/fonts/poppins/Poppins-Bold.ttf',
  '/css/main.css',
  '/css/util.css',
  '/js/app.js',
  '/js/main.js',
  '/images/icons/icon-72x72.png',
  '/images/bg-01.jpg',
  '/vendor/bootstrap/css/bootstrap.min.css',
  '/vendor/jquery/jquery-3.2.1.min.js',
  '/vendor/bootstrap/js/popper.js',
  '/vendor/bootstrap/js/bootstrap.min.js',
  '/manifest.json'
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});