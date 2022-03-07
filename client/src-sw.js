const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { ExpirationPlugin } = require('workbox-expiration');
const { CacheFirst } = require('workbox-strategies');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { registerRoute } = require('workbox-routing');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({

	cacheName: 'page-cache',

	plugins: [
		new CacheableResponsePlugin({
			statuses: [0, 200],
		}),

		new ExpirationPlugin({
			maxAgeSeconds: 30 * 24 * 60 * 60,
		}),

	],

});

warmStrategyCache({

	urls: ['/index.html', '/'],
	strategy: pageCache,

});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);


registerRoute(

	({ request }) => request.destination === 'image',

	new CacheFirst({

		cacheName: 'assets',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),

			new ExpirationPlugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60,
			}),
			
		],
	})
);