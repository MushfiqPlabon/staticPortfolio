// Configuration is injected at build time or runtime
const CACHE_NAME = "portfolio-v2";
const RUNTIME_CACHE = "runtime-v2";
const STATIC_ASSETS = ["/", "/index.html", "/favicon.svg"];
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_SERVICE_UNAVAILABLE = 503;
const RESPONSE_TYPE_BASIC = "basic";
const OFFLINE_MESSAGE = "Offline";
const OFFLINE_STATUS_TEXT = "Service Unavailable";

// Cache static assets during install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(() => {
        // Silent fail - service worker will still install
      }),
  );
  self.skipWaiting();
});

// Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(
            (cacheName) =>
              cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE,
          )
          .map((cacheName) => {
            return caches.delete(cacheName);
          }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch strategy: Network first, falling back to cache
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // For navigation requests, use network first with cache fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches
            .match(request)
            .then((response) => response || caches.match("/index.html"));
        }),
    );
    return;
  }

  // For other requests, use cache first with network fallback
  event.respondWith(
    caches
      .match(request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(request).then((response) => {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== HTTP_STATUS_OK ||
            response.type !== RESPONSE_TYPE_BASIC
          ) {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        return new Response(OFFLINE_MESSAGE, {
          status: HTTP_STATUS_SERVICE_UNAVAILABLE,
          statusText: OFFLINE_STATUS_TEXT,
        });
      }),
  );
});
