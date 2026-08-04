// ==========================================================================
// DATA ENGINE & PRODUCT STATE MANAGEMENT
// ==========================================================================

const productsData = Array.from({ length: 40 }).map((_, index) => {
  const id = index + 1;
  const categories = ['electronics', 'fashion', 'home', 'tech'];
  const category = categories[index % categories.length];
  
  const titles = {
    electronics: [`Wireless ANC Headphones v${id}`, `Studio Precision Monitor ${id}`, `Portable Bluetooth Speaker ${id}`],
    fashion: [`Minimalist Leather Watch ${id}`, `Luxe Cashmere Hoodie ${id}`, `Urban Essential Backpack ${id}`],
    home: [`Architectural Desk Lamp ${id}`, `Ceramic Diffuser ${id}`, `Ergonomic Office Chair ${id}`],
    tech: [`Ultra-Slim Mechanical Keyboard ${id}`, `Pro Ergonomic Mouse ${id}`, `4K Cinema Display ${id}`]
  };

  const images = {
    electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    fashion: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    home: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    tech: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
  };

  const titleList = titles[category];
  const title = titleList[index % titleList.length];

  return {
    id,
    title,
    category,
    price: Math.floor(Math.random() * 400) + 29,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 300) + 12,
    image: images[category],
    isFlashSale: index % 3 === 0
  };
});

let cartState = [];
let wishlistState = [];

// ==========================================================================
// INITIALIZATION & DOM ROUTING
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderProductGrid(productsData);
  initHeaderDrawerHandlers();
  initThemeEngine();
  initSliderEngine();
  initCartDrawer();
  initFilterEngine();
  initCountdownTimer();
  initScrollProgress();
});

// ==========================================================================
// RENDER ENGINE
// ==========================================================================
function renderProductGrid(items) {
  const grid = document.getElementById('product-grid');
  const countLabel = document.getElementById('product-count-label');
  
  if (!grid) return;
  grid.innerHTML = '';

  if (countLabel) countLabel.innerText = `Showing ${items.length} items`;

  if (items.length === 0) {
    grid.innerHTML = `<p class="no-results">No products matched your criteria.</p>`;
    return;
  }

  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-wrapper">
        ${product.isFlashSale ? '<span class="badge-sale">SALE</span>' : ''}
        <img src="${product.image}" alt="${product.title}" loading="lazy">
      </div>
      <h3 class="product-title">${product.title}</h3>
      <div class="product-rating">
        <i class="fa-solid fa-star"></i> ${product.rating} <span>(${product.reviews})</span>
      </div>
      <div class="product-price-row">
        <span class="product-price">$${product.price}.00</span>
        <button class="btn-add-cart" onclick="addToCart(${product.id})" aria-label="Add to cart">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ==========================================================================
// MINIMAL HEADER & DRAWER LOGIC
// ==========================================================================
function initHeaderDrawerHandlers() {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sideMenuDrawer = document.getElementById('side-menu-drawer');
  const menuDrawerOverlay = document.getElementById('menu-drawer-overlay');
  const menuDrawerClose = document.getElementById('menu-drawer-close');

  const openSideMenu = () => {
    sideMenuDrawer?.classList.add('active');
    menuDrawerOverlay?.classList.add('active');
  };

  const closeSideMenu = () => {
    sideMenuDrawer?.classList.remove('active');
    menuDrawerOverlay?.classList.remove('active');
  };

  sidebarToggle?.addEventListener('click', openSideMenu);
  menuDrawerClose?.addEventListener('click', closeSideMenu);
  menuDrawerOverlay?.addEventListener('click', closeSideMenu);

  // Search input interaction
  const mainSearch = document.getElementById('main-search-input');
  mainSearch?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = productsData.filter(p => p.title.toLowerCase().includes(query));
    renderProductGrid(filtered);
  });
}

// ==========================================================================
// CART & DRAWER SYSTEM
// ==========================================================================
function initCartDrawer() {
  const openBtn = document.getElementById('cart-drawer-open');
  const closeBtn = document.getElementById('cart-drawer-close');
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');

  const toggleCart = (open) => {
    if (open) {
      drawer?.classList.add('active');
      overlay?.classList.add('active');
    } else {
      drawer?.classList.remove('active');
      overlay?.classList.remove('active');
    }
  };

  openBtn?.addEventListener('click', () => toggleCart(true));
  closeBtn?.addEventListener('click', () => toggleCart(false));
  overlay?.addEventListener('click', () => toggleCart(false));
}

window.addToCart = function(productId) {
  const item = productsData.find(p => p.id === productId);
  if (!item) return;

  const existing = cartState.find(p => p.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cartState.push({ ...item, qty: 1 });
  }

  updateCartUI();
  showToast(`Added ${item.title} to cart`);
};

function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const itemsContainer = document.getElementById('cart-drawer-items');
  const subtotalEl = document.getElementById('cart-subtotal');
  const taxEl = document.getElementById('cart-tax');
  const grandTotalEl = document.getElementById('cart-grand-total');

  const totalItems = cartState.reduce((acc, i) => acc + i.qty, 0);
  if (badge) badge.innerText = totalItems;

  if (!itemsContainer) return;
  itemsContainer.innerHTML = '';

  let subtotal = 0;

  cartState.forEach(item => {
    subtotal += item.price * item.qty;
    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <p>$${item.price}.00 x ${item.qty}</p>
      </div>
    `;
    itemsContainer.appendChild(row);
  });

  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  if (subtotalEl) subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
  if (taxEl) taxEl.innerText = `$${tax.toFixed(2)}`;
  if (grandTotalEl) grandTotalEl.innerText = `$${grandTotal.toFixed(2)}`;
}

// ==========================================================================
// FILTERS & SORTING ENGINE
// ==========================================================================
function initFilterEngine() {
  const priceRange = document.getElementById('price-range');
  const priceVal = document.getElementById('price-range-val');
  const sortSelect = document.getElementById('sort-select');
  const categoryRadios = document.querySelectorAll('input[name="category"]');

  const applyFilters = () => {
    let result = [...productsData];

    // Category
    const selectedCat = document.querySelector('input[name="category"]:checked')?.value;
    if (selectedCat && selectedCat !== 'all') {
      result = result.filter(p => p.category === selectedCat);
    }

    // Price Range
    if (priceRange) {
      const maxPrice = parseFloat(priceRange.value);
      result = result.filter(p => p.price <= maxPrice);
    }

    // Sort
    if (sortSelect) {
      const val = sortSelect.value;
      if (val === 'price-low') result.sort((a, b) => a.price - b.price);
      if (val === 'price-high') result.sort((a, b) => b.price - a.price);
      if (val === 'rating') result.sort((a, b) => b.rating - a.rating);
    }

    renderProductGrid(result);
  };

  priceRange?.addEventListener('input', (e) => {
    if (priceVal) priceVal.innerText = `$${e.target.value}`;
    applyFilters();
  });

  sortSelect?.addEventListener('change', applyFilters);
  categoryRadios.forEach(radio => radio.addEventListener('change', applyFilters));
}

// ==========================================================================
// UTILITY ENGINES
// ==========================================================================
function initThemeEngine() {
  const toggleBtn = document.getElementById('theme-toggle');
  toggleBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    showToast(`Switched to ${targetTheme} mode`);
  });
}

function initSliderEngine() {
  const slides = document.querySelectorAll('.hero-slide');
  let index = 0;

  setInterval(() => {
    slides[index]?.classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index]?.classList.add('active');
  }, 5000);
}

function initCountdownTimer() {
  const timerBox = document.getElementById('countdown-timer');
  let secondsLeft = 14400; // 4 Hours

  setInterval(() => {
    if (secondsLeft <= 0) return;
    secondsLeft--;
    const h = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
    const m = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
    const s = String(secondsLeft % 60).padStart(2, '0');
    if (timerBox) timerBox.innerText = `${h} : ${m} : ${s}`;
  }, 1000);
}

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (bar) bar.style.width = `${progress}%`;
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}
