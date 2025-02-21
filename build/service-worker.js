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
      // console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", (event) => {
  // ดึง token จาก localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No valid token, re-login required");
    return;
  }

  // คำขอ fetch ที่มีการใส่ token ใน headers
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // หากมีการตอบสนองจาก cache
      if (cachedResponse) {
        return cachedResponse;
      }

      // หากไม่มีใน cache, ให้ทำการ fetch ไปที่เซิร์ฟเวอร์พร้อมกับ token
      return fetch(event.request, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((error) => {
        console.error("Fetch request failed", error);
      });
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
