self.addEventListener('push', function(event) {
    const data = event.data.json();

    const options = {
        body: data.body,
        // icon: 'icons/icon-192x192.png',
        // badge: 'icons/icon-72x72.png',
        vibrate: [200, 100, 200],
        // sound: 'sounds/notification.mp3',
        data: {
            url: data.url
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    const url = event.notification.data.url || '/';
    
    event.notification.close();

    event.waitUntil(
        clients.openWindow(url)
    );
});


// self.addEventListener('install', event => {
//     event.waitUntil(
//         caches.open('offline-note-app').then(cache => {
//             return cache.addAll([
//                 '/',
//                 '/index.html',
//                 '/css/styles.css',
//                 '/js/app.js',
//                 '/js/idb.js',
//                 '/manifest.json'
//             ]);
//         })
//     );
// });

// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request).then(response => {
//             return response || fetch(event.request);
//         })
//     );
// });
