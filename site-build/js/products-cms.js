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
   * Upgrade product cards on the page in place.
   * Cards with a matching `data-product-id` get text/image swapped from the JSON.
   * Cards without a match are left untouched (safe).
   */
  async function upgradeCards(selector) {
    var products = await load();
    if (!products.length) return;

    var byId = {};
    products.forEach(function (p) { byId[p.id] = p; });

    var cards = document.querySelectorAll(selector);
    cards.forEach(function (card) {
      var id = card.getAttribute('data-product-id');
      var p = byId[id];
      if (!p) return;

      var nameEl  = card.querySelector('[data-cms="name"]');
      var descEl  = card.querySelector('[data-cms="description"]');
      var catEl   = card.querySelector('[data-cms="category"]');
      var imgEl   = card.querySelector('[data-cms="image"]');

      if (nameEl && p.name)        nameEl.textContent  = p.name;
      if (descEl && p.description) descEl.textContent  = p.description;
      if (catEl  && p.category)    catEl.textContent   = p.category;
      if (imgEl  && p.image) {
        imgEl.setAttribute('src', '/' + p.image.replace(/^\//, ''));
        if (p.name) imgEl.setAttribute('alt', p.name);
      }
    });
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

  // Auto-upgrade cards when page loads or SPA navigates
  function autoUpgrade() {
    var cards = document.querySelectorAll('.card[data-product-id]');
    if (cards.length > 0) {
      upgradeCards('.card[data-product-id]').catch(function () {});
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
