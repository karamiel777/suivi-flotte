// Service worker du suivi de flotte :
//  - réseau d'abord (toujours la dernière version du site), cache en secours hors-ligne ;
//  - affichage des notifications push (alertes) même quand l'appli est fermée.
const CACHE = 'flotte-shell-v2';
self.addEventListener('install', () => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then(r => r || caches.match('./')))
  );
});

self.addEventListener('push', event => {
  let p = {};
  try { p = event.data ? event.data.json() : {}; } catch (e) { p = {}; }
  const d = p.data || {}, n = p.notification || {};
  const title = d.title || n.title || 'Suivi de flotte';
  const options = {
    body: d.body || n.body || '',
    icon: 'icon-192.png', badge: 'icon-192.png',
    tag: d.tag || undefined,
    data: { url: d.url || self.registration.scope }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || self.registration.scope;
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if (c.url.startsWith(self.registration.scope) && 'focus' in c) return c.focus(); }
    return clients.openWindow(url);
  }));
});
