/* ============================================
   SANPAR SPA Router — Client-side navigation
   ============================================ */

(function () {
  'use strict';

  var ROUTES = null;       // loaded from routes.json
  var cache = {};          // slug -> HTML string
  var currentSlug = null;
  var mainEl = document.getElementById('main-content');

  /* --- Slug resolution --- */
  function pathToSlug(path) {
    var p = path.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
    if (!p || p === 'index' || p === 'spa') return 'home';
    return p;
  }

  /* --- Update active nav state --- */
  function updateNav(slug) {
    var route = ROUTES[slug];
    var navActive = route ? route.navActive : '';

    // Desktop nav links
    document.querySelectorAll('.header__menu a').forEach(function (a) {
      a.classList.remove('active');
      var nav = a.getAttribute('data-nav');
      if (nav && nav === navActive) a.classList.add('active');
    });

    // Contact CTA
    var cta = document.querySelector('.header__cta');
    if (cta) cta.classList.toggle('active', navActive === 'Contact');
  }

  /* --- Execute inline <script> tags in injected HTML --- */
  function activateScripts() {
    mainEl.querySelectorAll('script').forEach(function (old) {
      var s = document.createElement('script');
      if (old.src) {
        s.src = old.src;
      } else {
        s.textContent = old.textContent;
      }
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
      // 404 fallback
      mainEl.innerHTML = '<section class="section" style="text-align:center;padding:8rem 0"><div class="container"><h1>Page Not Found</h1><p style="margin:1rem 0 2rem">The page you are looking for does not exist.</p><a href="/" class="btn btn--primary" data-spa>Go Home</a></div></section>';
      currentSlug = slug;
      document.title = 'Page Not Found — SANPAR Industries';
      if (pushState) history.pushState({ slug: slug }, '', '/' + slug);
      return;
    }

    // Fade out
    mainEl.classList.add('spa-loading');

    function inject(html) {
      setTimeout(function () {
        mainEl.innerHTML = html;
        activateScripts();

        // Update meta
        document.title = route.title;
        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', route.description);

        // Update nav
        updateNav(slug);
        currentSlug = slug;

        // Push state
        if (pushState) {
          var url = slug === 'home' ? '/' : '/' + slug;
          history.pushState({ slug: slug }, '', url);
        }

        // Scroll to top
        window.scrollTo(0, 0);

        // Fade in
        mainEl.classList.remove('spa-loading');

        // Re-init animations and counters
        if (window.reinitPage) window.reinitPage();

        // Close mobile nav
        closeMobileNav();
      }, 150); // match the CSS transition duration
    }

    // Check cache
    if (cache[slug]) {
      inject(cache[slug]);
      return;
    }

    // Fetch fragment
    fetch(route.file)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load ' + route.file);
        return res.text();
      })
      .then(function (html) {
        cache[slug] = html;
        inject(html);
      })
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

    // Skip external links, tel, mailto, hash-only, target=_blank
    if (link.target === '_blank') return;
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return;

    // Resolve slug
    var slug = pathToSlug(href);

    // Only intercept if it's a known route
    if (ROUTES[slug]) {
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
      fetch(ROUTES[slug].file).then(function (r) { return r.text(); }).then(function (html) {
        cache[slug] = html;
      }).catch(function () { /* ignore prefetch errors */ });
    }
  });

  /* --- Boot --- */
  fetch('pages/routes.json')
    .then(function (r) { return r.json(); })
    .then(function (routes) {
      ROUTES = routes;
      var slug = pathToSlug(location.pathname);
      history.replaceState({ slug: slug }, '', location.pathname === '/' ? '/' : location.pathname);
      navigateTo(slug, false);
    })
    .catch(function (err) {
      console.error('Failed to load route manifest:', err);
    });

})();
