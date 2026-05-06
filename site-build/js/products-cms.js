/**
 * SANPAR Products CMS
 * Fetches product data from S3 and renders on the website
 */

const SANPAR_CMS = {
  dataUrl: 'https://sanpar-cms.s3.ap-south-1.amazonaws.com/data/products.json',
  products: [],
  loaded: false,

  /**
   * Load products from S3
   */
  async loadProducts() {
    if (this.loaded) return this.products;

    try {
      const response = await fetch(this.dataUrl + '?t=' + Date.now());
      const data = await response.json();
      this.products = data.products.filter(p => p.active);
      this.loaded = true;
      return this.products;
    } catch (error) {
      console.error('Error loading products from CMS:', error);
      return [];
    }
  },

  /**
   * Get all products
   */
  async getAll() {
    await this.loadProducts();
    return this.products;
  },

  /**
   * Get products by category
   */
  async getByCategory(category) {
    await this.loadProducts();
    return this.products.filter(p => p.category === category);
  },

  /**
   * Get a single product by ID
   */
  async getById(id) {
    await this.loadProducts();
    return this.products.find(p => p.id === id);
  },

  /**
   * Get all categories
   */
  async getCategories() {
    await this.loadProducts();
    return [...new Set(this.products.map(p => p.category))];
  },

  /**
   * Render product cards into a container
   */
  async renderProductCards(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let products = await this.getAll();

    // Filter by category if specified
    if (options.category) {
      products = products.filter(p => p.category === options.category);
    }

    // Limit number of products
    if (options.limit) {
      products = products.slice(0, options.limit);
    }

    container.innerHTML = products.map(product => `
      <div class="product-card" data-product-id="${product.id}">
        <a href="product-${product.id}.html">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="product-card-content">
            <span class="product-category">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          </div>
        </a>
      </div>
    `).join('');
  },

  /**
   * Render product details on a product page
   */
  async renderProductDetails(productId, options = {}) {
    const product = await this.getById(productId);
    if (!product) return null;

    // Update page elements if they exist
    if (options.titleElement) {
      const el = document.querySelector(options.titleElement);
      if (el) el.textContent = product.name;
    }

    if (options.descriptionElement) {
      const el = document.querySelector(options.descriptionElement);
      if (el) el.textContent = product.description;
    }

    if (options.imageElement) {
      const el = document.querySelector(options.imageElement);
      if (el) el.src = product.image;
    }

    if (options.featuresElement) {
      const el = document.querySelector(options.featuresElement);
      if (el && product.features) {
        el.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
      }
    }

    return product;
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SANPAR_CMS;
}
