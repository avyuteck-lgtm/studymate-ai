const C='studymate-v3',SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(/workers\.dev|api\.anthropic|api\.openai|generativelanguage/.test(u.host))return;
 const own=u.origin===location.origin;
 // Own files: network first, so updates always show; cache only when offline.
 if(own){e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(h=>h||caches.match('./index.html'))));return}
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{if(res.ok&&/fonts\.g/.test(u.host)){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})));});
