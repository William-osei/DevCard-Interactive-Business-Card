// DevCard Service Worker - PWA Offline Support
const CACHE_NAME = 'devcard-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.3/qrcode.min.js'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('🚀 DevCard Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching DevCard files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ DevCard cached successfully');
        return self.skipWaiting();
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('🔥 DevCard Service Worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch Strategy: Cache First with Network Fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request).then((fetchResponse) => {
          // Check if we received a valid response
          if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
            return fetchResponse;
          }

          // Clone the response for caching
          const responseToCache = fetchResponse.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return fetchResponse;
        });
      })
      .catch(() => {
        // If both cache and network fail, show offline page for HTML requests
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

// Background Sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    console.log('📧 Syncing contact form data');
    event.waitUntil(syncContactForm());
  }
});

// Handle contact form sync
function syncContactForm() {
  return new Promise((resolve) => {
    // In a real app, you'd sync pending form submissions here
    console.log('📤 Contact form sync completed');
    resolve();
  });
}

// Push Notifications (for future enhancement)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      vibrate: [200, 100, 200],
      tag: 'devcard-notification',
      actions: [
        {
          action: 'open',
          title: 'Open DevCard',
          icon: '/icon-192x192.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icon-192x192.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic Background Sync (for GitHub data updates)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'github-sync') {
    console.log('🔄 Periodic GitHub data sync');
    event.waitUntil(syncGitHubData());
  }
});

function syncGitHubData() {
  return fetch('https://api.github.com/users/William-osei')
    .then(response => response.json())
    .then(data => {
      console.log('✅ GitHub data synced:', data.login);
      // Store updated data in IndexedDB or send to main thread
    })
    .catch(error => {
      console.log('❌ GitHub sync failed:', error);
    });
}

console.log('🎯 DevCard Service Worker loaded and ready!');
