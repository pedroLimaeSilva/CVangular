let log = console.log.bind(console);
let err = console.error.bind(console);

let version = '1';
let cacheName = 'pwa-client-v' + version;
let dataCacheName = 'pwa-client-data-v' + version;
let appShellFilesToCache = [
  './',
  './index.html',
  './inline.bundle.js',
  './styles.bundle.js',
  './vendor.bundle.js',
  './main.bundle.js',
  'https://code.jquery.com/jquery-2.1.1.min.js',
  'assets/js/materialize.js',
  'assets/js/init.js',
  'assets/js/progressbar.js',
  'assets/js/main.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(self.skipWaiting());
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Service Worker: Caching App Shell');
      return cache.addAll(appShellFilesToCache);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
  console.log('Service Worker: Active');

  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {

        if (key !== cacheName) {
          console.log('Service Worker: Removing old cache', key);
          return caches.delete(key);
        }

      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  //console.log('Service Worker: Fetch URL ', e.request.url);

  // Match requests for data and handle them separately
  e.respondWith(
    caches.match(e.request.clone()).then((response) => {
      return response || fetch(e.request.clone()).then((r2) => {
        return caches.open(dataCacheName).then((cache) => {
          //console.log('Service Worker: Fetched & Cached URL ', e.request.url);
          cache.put(e.request.url, r2.clone());
          return r2.clone();
        });
      });
    })
  );
});
