const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.js',
  '/app.js',
  '/config.js',
  '/schemas.js',
  '/components/Base.js',
  '/components/Button.js',
  '/components/Certifications.js',
  '/components/Contact.js',
  '/components/CTA.js',
  '/components/ErrorBoundary.js',
  '/components/Footer.js',
  '/components/Hero.js',
  '/components/index.js',
  '/components/Nav.js',
  '/components/ProjectCard.js',
  '/components/Section.js',
  '/components/SkillGrid.js',
  '/components/Timeline.js',
  '/services/AssetService.js',
  '/services/DataService.js',
  '/services/ErrorTrackingService.js',
  '/services/FeatureDetectionService.js',
  '/services/GsapAnimationController.js',
  '/services/GsapScrollSpyController.js',
  '/services/InputModeController.js',
  '/services/LozadLazyLoader.js',
  '/services/MobileDetectorService.js',
  '/services/SkillIconService.js',
  '/styles/StyleService.js',
  '/data/portfolioData.json',
  '/favicon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Service Worker: Cache installation failed', error);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Only cache same-origin requests (skip CDN assets)
  if (requestUrl.origin !== location.origin) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
      .catch(() => {
        return caches.match('/index.html');
      })
  );
});
