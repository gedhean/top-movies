// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
// Force development builds
workbox.setConfig({ debug: /* process.env.NODE_ENV */ true })
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()))
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))

// We need this in Webpack plugin (refer to swSrc option): 
// https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
workbox.precaching.precacheAndRoute(self.__precacheManifest)
// 1 day in seconds
const DAY_UNIT = 24 * 60 * 60 
// app-shell
workbox.routing.registerRoute('/home', workbox.strategies.cacheFirst())
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

// const searchHandle = workbox.strategies.cacheFirst({
//   cacheName: 'search-cache',
//   plugins: [
//     new workbox.expiration.Plugin({
//       maxEntries: 50,
//       maxAgeSeconds: 10 * 24 * 60 * 60 // 30 Days
//     }),
//     // Needed to cache opaque response (third party)
//     new workbox.cacheableResponse.Plugin({
//       statuses: [0, 200]
//     })
//   ]
// })

// workbox.routing.registerRoute(/\/search\/multi/g, args => {
//   return searchHandle
//     .handle(args)
//     .then(response => {
//       if (response.status === 404) {
//         return caches.match('pages/404.html') // custom page
//       }
//       return response
//     })
//     .catch(() => {
//       return caches.match('pages/offline.html')
//     })
// })
