/**
 * SANPAR Products CMS — frontend renderer
 *
 * Loads products from same-origin /data/products.json and upgrades parts of
 * the page that opt in. The hardcoded HTML on each page is the safe baseline:
 * if this script fails to load, fails to fetch, or finds bad data, the page
 * still works fine. Nothing gets blanked out on failure.
 */
(function (window) {
  'use strict';

  var DATA_URL = '/data/products.json';

  var state = {
    loading: null,
    products: null,
    raw: null
  };

  function safe(value, fallback) {
    return (typeof value === 'string' && value.length > 0) ? value : fallback;
  }

  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  async function load() {
    if (state.products) return state.products;
    if (state.loading)  return state.loading;

    state.loading = (async function () {
      try {
        var res = await fetch(DATA_URL + '?t=' + Date.now(), { cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        var data = await res.json();
        if (!data || !Array.isArray(data.products)) throw new Error('Bad data shape');
        state.raw = data;
        state.products = data.products.filter(function (p) { return p && p.active !== false; });
        return state.products;
      } catch (err) {
        // Failure path — leave the page's hardcoded HTML as-is.
        console.warn('[products-cms] Could not load data, keeping static HTML:', err.message);
        state.products = [];
        return state.products;
      } finally {
        state.loading = null;
      }
    })();

    return state.loading;
  }

  /**
   * Find an element marked with data-cms="<key>" inside `root`. Also matches
   * `root` itself — useful on detail pages where the same element carries
   * both data-product-id and data-cms="name" (e.g. the <h1>).
   */
  function findCms(root, key) {
    if (root.matches && root.matches('[data-cms="' + key + '"]')) return root;
    return root.querySelector('[data-cms="' + key + '"]');
  }

  /**
   * Resolve a dotted path against the product object.
   * 'name'         -> p.name
   * 'detail.tagline' -> p.detail && p.detail.tagline
   * Returns undefined if any segment is missing.
   */
  function resolve(obj, path) {
    var parts = path.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  /**
   * Map of CMS keys (used in the HTML's data-cms attribute) to the dotted
   * path of the source field inside the product object. Add new fields
   * here when you tag a new element on the website.
   */
  var FIELD_PATHS = {
    name:        'name',
    description: 'description',
    category:    'category',
    image:       'image',
    tagline:     'detail.tagline',
    intro:       'detail.intro',
    cta_heading: 'detail.cta_heading',
    cta_body:    'detail.cta_body'
  };

  /**
   * Apply a single product's value to a single [data-cms] element.
   * No-op if the element's key is unknown or the source value is empty.
   */
  function applyToTagged(el, product) {
    var key = el.getAttribute('data-cms');
    if (!key) return;
    if (key === 'image') {
      if (product.image) {
        el.setAttribute('src', '/' + product.image.replace(/^\//, ''));
        if (product.name) el.setAttribute('alt', product.name);
      }
      return;
    }
    var path = FIELD_PATHS[key];
    if (!path) return;
    var val = resolve(product, path);
    if (typeof val === 'string' && val.length > 0) {
      el.textContent = val;
    }
  }

  /**
   * Upgrade product-scoped containers on the page in place. Two modes:
   *   1. Listing mode: every [data-product-id] container holds its own
   *      [data-cms] descendants (the card on /products).
   *   2. Detail-page mode: a single [data-product-id] marker (typically on
   *      the <h1>) scopes the whole page. Any [data-cms] anywhere else on
   *      the page (tagline, intro, cta_*) inherits that product's data.
   * Anything without a JSON value is left as the static HTML fallback.
   */
  async function upgradeCards(selector) {
    var products = await load();
    if (!products.length) return;

    var byId = {};
    products.forEach(function (p) { byId[p.id] = p; });

    var containers = document.querySelectorAll(selector);
    containers.forEach(function (card) {
      var id = card.getAttribute('data-product-id');
      var product = byId[id];
      if (!product) return;
      // The container itself may carry a data-cms attribute (e.g. <h1 data-cms="name">).
      if (card.hasAttribute('data-cms')) applyToTagged(card, product);
      // Descendants.
      card.querySelectorAll('[data-cms]').forEach(function (el) {
        applyToTagged(el, product);
      });
    });

    // Detail-page fallback: exactly one [data-product-id] on the page,
    // so any [data-cms] outside that container still belongs to it.
    if (containers.length === 1) {
      var only = containers[0];
      var product = byId[only.getAttribute('data-product-id')];
      if (product) {
        document.querySelectorAll('[data-cms]').forEach(function (el) {
          if (el === only || only.contains(el)) return;
          applyToTagged(el, product);
        });
      }
    }
  }

  /**
   * Render a full listing of products into a container, replacing its children.
   * Use this on the products listing page so admin-added products also appear.
   */
  async function renderList(containerId, options) {
    options = options || {};
    var container = document.getElementById(containerId);
    if (!container) return;

    var products = await load();
    if (!products.length) return;

    var list = products.slice();
    if (options.category) list = list.filter(function (p) { return p.category === options.category; });
    if (options.limit)    list = list.slice(0, options.limit);

    var cardClass = options.cardClass || 'card';
    var html = list.map(function (p) {
      var url   = safe(p.url, 'product-' + p.id + '.html');
      var image = p.image ? ('/' + p.image.replace(/^\//, '')) : '';
      return '' +
        '<div class="' + cardClass + ' animate-on-scroll" data-product-id="' + escapeHtml(p.id) + '">' +
          (image ? '<img src="' + escapeHtml(image) + '" alt="' + escapeHtml(p.name) + '" class="card__image" loading="lazy" data-cms="image">' : '') +
          '<div class="card__body">' +
            (p.category ? '<span class="badge badge--industry" data-cms="category">' + escapeHtml(p.category) + '</span>' : '') +
            '<h3 data-cms="name">' + escapeHtml(p.name) + '</h3>' +
            '<p data-cms="description">' + escapeHtml(p.description || '') + '</p>' +
            '<a href="' + escapeHtml(url) + '" class="btn btn--tertiary">Explore this product <span class="arrow">→</span></a>' +
          '</div>' +
        '</div>';
    }).join('');

    container.innerHTML = html;
  }

  window.SANPAR_CMS = {
    load: load,
    upgradeCards: upgradeCards,
    renderList: renderList
  };

  // Auto-upgrade any product-scoped container on the page (cards on the
  // listing, and the H1/intro/image on detail pages).
  function autoUpgrade() {
    var containers = document.querySelectorAll('[data-product-id]');
    if (containers.length > 0) {
      upgradeCards('[data-product-id]').catch(function () {});
    }
  }

  // Run on initial page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoUpgrade);
  } else {
    autoUpgrade();
  }

  // Hook into SPA router's reinitPage for navigation
  var originalReinit = window.reinitPage;
  window.reinitPage = function () {
    if (originalReinit) originalReinit();
    autoUpgrade();
  };

})(window);
