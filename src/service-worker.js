/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || [])
//workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// App Shell
workbox.routing.registerNavigationRoute('/index.html')

//Google Analitics
workbox.googleAnalytics.initialize()

workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/,
    workbox.strategies.staleWhileRevalidate(),
    'GET')

workbox.routing.registerRoute(
    /^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 30 * 24 * 60 * 60
            })
        ]
    }), 'GET')

workbox.routing.registerRoute(/^https?.*/,
    workbox.strategies.networkFirst(), 'GET')

workbox.routing.registerRoute( /(.*)articles(.*)\.(?:png|gif|jpg)/,
    workbox.strategies.cacheFirst({
        cacheName: 'images-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60
            })
        ]
    })
)