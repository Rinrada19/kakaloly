// public/service-worker.js

const CACHE_NAME = "my-pwa-cache-v2"; // เปลี่ยนเวอร์ชันทุกครั้งที่อัปเดต
const urlsToCache = [
  "/",
  "/index.html",
  "/static/css/main.css",
  "/static/js/main.js",
  // เพิ่มเส้นทางของไฟล์ที่คุณต้องการเก็บใน cache ที่นี่
];

// ติดตั้ง Service Worker และเก็บ cache
// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((error) => {
        console.error("Cache addAll failed:", error);
      });
    })
  );
});

// ลบ cache เก่าเมื่อมีการอัปเดตใหม่
// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// จัดการกับ fetch request ทั้งหมด
// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", (event) => {
  // ตรวจสอบว่าเป็น GET request หรือไม่
  if (event.request.method === "GET") {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // ถ้ามี cache ที่ตรงกับ request
        if (cachedResponse) {
          return cachedResponse; // ส่ง cache กลับ
        }

        // ดึงข้อมูลจากเครือข่ายและบันทึกลง cache
        return fetch(event.request)
          .then((networkResponse) => {
            // ตรวจสอบว่า request สำเร็จ (status 200)
            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type !== "basic"
            ) {
              return networkResponse;
            }

            // บันทึก response ลง cache ใหม่
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return networkResponse;
          })
          .catch((error) => {
            console.error("Network fetch failed:", error);

            // กรณีเกิดข้อผิดพลาดจากการเชื่อมต่อ: ให้ส่งข้อความ error
            return new Response(
              "Network error occurred and no cache available.",
              {
                status: 408,
                statusText: "Request Timeout",
              }
            );
          });
      })
    );
  } else {
    // ถ้าเป็น request แบบอื่น ๆ (POST, PUT, DELETE) ไม่ทำการแคช
    event.respondWith(fetch(event.request));
  }
});
