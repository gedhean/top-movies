// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
// Force development builds
workbox.setConfig({ debug: /* process.env.NODE_ENV */ true })
// Log everything that happens in sw.js
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)
// Change default cache names
workbox.core.setCacheNameDetails({
  prefix: 'hot-movies',
  suffix: 'v1'
})

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()))
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))

// We need this in Webpack plugin (refer to swSrc option):
// https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
workbox.precaching.precacheAndRoute(self.__precacheManifest)
// 1 day in seconds
const DAY_UNIT = 24 * 60 * 60
// app-shell
// workbox.routing.registerRoute('/home', workbox.strategies.cacheFirst())
// New route for images cache
// /.*\.(?:png|jpg|jpeg|svg|gif)/g,
//new RegExp('\.(?:png|gif|jpg|jpeg|svg)$'),
const imageRegEx = /(?:https:\/\/.*)?.*\.(?:png|jpg|jpeg|svg|gif)$/g
workbox.routing.registerRoute(
  imageRegEx,
  workbox.strategies.cacheFirst({
    // Must user cache name when using expiration
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Keep at most 20 entries
        maxEntries: 20,
        // Do not keep any entrie for more than 10 Days
        maxAgeSeconds: 10 * DAY_UNIT,
        // Automatically clean up when quote is exceeded
        purgeOnQuotaError: true
      }),
      // Needed to cache opaque response (third party)
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
)

// Cache other request from TheMovieDB to fetch top movies or search
const thepMovieDBRegEx = /https:\/\/api.themoviedb.org\/3\/(movie\/popular|search\/multi)(.*)/g
workbox.routing.registerRoute(
  thepMovieDBRegEx,
  workbox.strategies.cacheFirst({
    cacheName: 'tmdb-movies',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 10 * DAY_UNIT
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
)

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
const googleFontRegEx = /^https:\/\/fonts\.gstatic\.com/
workbox.routing.registerRoute(
  googleFontRegEx,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 365 * DAY_UNIT,
        maxEntries: 30,
        purgeOnQuotaError: true
      })
    ]
  })
)
// const searchHandle = workbox.strategies.cacheFirst({
//   cacheName: 'routes-cache'
// })
// // Custom handle
// workbox.routing.registerRoute(thepMovieDBRegEx, args => {
//   return searchHandle
//     .handle(args)
//     .then(response => {
//       if (response.status === 404) {
//         console.log('Page not found!');
//         return caches.match('pages/404.html') // custom page
//       }
//       return response
//     })
//     .catch(() => {
//       console.log('You are offline');
//       return caches.match('pages/offline.html')
//     })
// })
