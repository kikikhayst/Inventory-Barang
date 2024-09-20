importScripts(`https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js`);

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    //folder assets
    { url: '/assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
    { url: '/assets/instagram.jpg', revision: '1' },
    { url: '/assets/twitter.jpg', revision: '1' },
    { url: '/assets/whatsapp.jpg', revision: '1' },
    { url: '/assets/profil.jpg', revision: '1' },
    { url: '/assets/profil.jpg', revision: '1' },
    { url: '/assets/icon-app-512.png', revision: '1' },
    { url: '/assets/icon-app-192.png', revision: '1' },
    { url: '/assets/icon-app-192-apple.png', revision: '1' },
    { url: '/assets/favicon-16.png', revision: '1' },
    { url: '/assets/foto-liga-inggris.jpg', revision: '1' },
    { url: '/assets/foto-liga-italia.jpg', revision: '1' },

    // folder css
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },

    // folder js
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/workbox-sw.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },

    // folder pages
    { url: '/pages/standingEngland.html', revision: '1' },
    { url: '/pages/standingItaly.html', revision: '1' },
    { url: '/pages/saved.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },

    // not in folder
    { url: '/', revision: '1' },
    { url: '/push.js', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/article.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/service-worker.js', revision: '4' }
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "pages",
    })
);

workbox.routing.registerRoute(
    /\.(?:png|jpg|webp|svg|gif)$/,
    workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 25,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp(`https://api.football-data.org/v2/`),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "standing-teams-article",
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            })
        ]
    })
);


self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});