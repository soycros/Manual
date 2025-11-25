    self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("manual-cache").then(cache => {
            return cache.addAll([
                "index.html",
                "admin.html",
                "post.html",
                "css/style.css",
                "js/auth.js",
                "js/posts.js",
                "js/ui.js",
                "js/admin.js",
                "data/posts.json"
            ]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(resp => resp || fetch(e.request))
    );
});
