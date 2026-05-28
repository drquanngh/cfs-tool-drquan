const CACHE_NAME = 'cfs-app-v6';
const ASSETS = [
  'index.html',
  'manifest.json',
  'download.png',
  'benh-vien-lao-khoa-trung-uong-luon-la-diem-tua-an-vui-manh-khoe-cua-nguoi-benh-cao-tuoi_649be6b1ecb5b.jpg'
];

// Cài đặt và lưu trữ tài nguyên vào bộ nhớ đệm (Cache)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Xóa bỏ các bộ nhớ đệm cũ khi có bản cập nhật mới
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Chiến lược lấy tài nguyên: Ưu tiên Cache (Offline), nếu không có mới gọi Network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request);
    })
  );
});