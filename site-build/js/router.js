/* ============================================
   SANPAR SPA Router — Client-side navigation
   Auto-detects base path for GitHub Pages / DigitalOcean
   ============================================ */

(function () {
  'use strict';

  var ROUTES = null;
  var cache = {};
  var currentSlug = null;
  var mainEl = document.getElementById('main-content');
  var BASE = '';

  /* --- Slug resolution --- */
  function pathToSlug(path) {
    var p = path;
    if (BASE && p.indexOf(BASE) === 0) {
      p = p.substring(BASE.length);
    }
    p = p.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
    if (!p || p === 'index' || p === 'spa' || p === '404') return 'home';
    return p;
  }

  /* --- Build browser URL for a slug --- */
  function buildUrl(slug) {
    if (slug === 'home') return BASE + '/';
    return BASE + '/' + slug;
  }

  /* --- Build fetch URL for a file relative to site root --- */
  function assetUrl(filePath) {
    return BASE + '/' + filePath;
  }

  /* --- Update active nav state --- */
  function updateNav(slug) {
    var route = ROUTES[slug];
    var navActive = route ? route.navActive : '';
    document.querySelectorAll('.header__menu a').forEach(function (a) {
      a.classList.remove('active');
      var nav = a.getAttribute('data-nav');
      if (nav && nav === navActive) a.classList.add('active');
    });
    var cta = document.querySelector('.header__cta');
    if (cta) cta.classList.toggle('active', navActive === 'Contact');
  }

  /* --- Execute inline <script> tags in injected HTML --- */
  function activateScripts() {
    mainEl.querySelectorAll('script').forEach(function (old) {
      var s = document.createElement('script');
      if (old.src) { s.src = old.src; } else { s.textContent = old.textContent; }
      old.parentNode.replaceChild(s, old);
    });
  }

  /* --- Close mobile nav if open --- */
  function closeMobileNav() {
    var drawer = document.querySelector('.mobile-nav');
    var overlay = document.querySelector('.mobile-overlay');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* --- Navigate to a route --- */
  function navigateTo(slug, pushState) {
    if (pushState === undefined) pushState = true;
    if (slug === currentSlug) return;

    var route = ROUTES[slug];
    if (!route) {
      mainEl.innerHTML = '<section class="section" style="text-align:center;padding:8rem 0"><div class="container"><h1>Page Not Found</h1><p style="margin:1rem 0 2rem">The page you are looking for does not exist.</p><a href="' + buildUrl('home') + '" class="btn btn--primary" data-spa>Go Home</a></div></section>';
      currentSlug = slug;
      document.title = 'Page Not Found — SANPAR Industries';
      if (pushState) history.pushState({ slug: slug }, '', buildUrl(slug));
      mainEl.classList.remove('spa-loading');
      return;
    }

    mainEl.classList.add('spa-loading');

    function inject(html) {
      setTimeout(function () {
        mainEl.innerHTML = html;
        activateScripts();
        document.title = route.title;
        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', route.description);
        updateNav(slug);
        currentSlug = slug;
        if (pushState) history.pushState({ slug: slug }, '', buildUrl(slug));
        window.scrollTo(0, 0);
        mainEl.classList.remove('spa-loading');
        if (window.reinitPage) window.reinitPage();
        closeMobileNav();
      }, 150);
    }

    if (cache[slug]) { inject(cache[slug]); return; }

    fetch(assetUrl(route.file))
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load ' + route.file);
        return res.text();
      })
      .then(function (html) { cache[slug] = html; inject(html); })
      .catch(function (err) {
        console.error('Router fetch error:', err);
        mainEl.innerHTML = '<section class="section" style="text-align:center;padding:8rem 0"><div class="container"><h1>Error Loading Page</h1><p>Please try refreshing.</p></div></section>';
        mainEl.classList.remove('spa-loading');
      });
  }

  /* --- Link interception --- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href) return;
    if (link.target === '_blank') return;
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return;
    var slug = pathToSlug(href);
    if (ROUTES && ROUTES[slug]) {
      e.preventDefault();
      navigateTo(slug);
    }
  });

  /* --- Back/Forward --- */
  window.addEventListener('popstate', function (e) {
    var slug = (e.state && e.state.slug) ? e.state.slug : pathToSlug(location.pathname);
    navigateTo(slug, false);
  });

  /* --- Prefetch on hover --- */
  document.addEventListener('mouseover', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) return;
    var slug = pathToSlug(href);
    if (ROUTES && ROUTES[slug] && !cache[slug]) {
      fetch(assetUrl(ROUTES[slug].file)).then(function (r) { return r.text(); }).then(function (html) {
        cache[slug] = html;
      }).catch(function () {});
    }
  });

  /* --- Boot: auto-detect base path --- */
  function tryBoot(basePath) {
    var url = basePath + '/pages/routes.json';
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('Not found at ' + url);
      return r.json();
    }).then(function (routes) {
      BASE = basePath;
      ROUTES = routes;
      var slug = pathToSlug(location.pathname);
      history.replaceState({ slug: slug }, '', location.pathname);
      navigateTo(slug, false);
    });
  }

  // Try root first (localhost), then first path segment (GitHub Pages / subpath)
  tryBoot('').catch(function () {
    var firstSeg = location.pathname.split('/').filter(Boolean)[0];
    if (firstSeg) {
      return tryBoot('/' + firstSeg);
    }
  }).catch(function (err) {
    console.error('Router: Could not detect base path', err);
  });

})();
