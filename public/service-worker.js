// public/service-worker.js

const CACHE_NAME = "my-pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/static/css/main.css",
  "/static/js/main.js",
  // เพิ่มเส้นทางของไฟล์ที่คุณต้องการเก็บใน cache ที่นี่
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // eslint-disable-next-line array-callback-return
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", (event) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No valid token, re-login required");
    return;
  }

  // ส่งคำขอ API พร้อมกับ token
  event.respondWith(
    fetch(event.request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => {
      console.error("Fetch request failed", error);
    })
  );
});
