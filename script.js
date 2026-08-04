/**
 * AMAZON LUXE - VANILLA ES6+ E-COMMERCE CORE SYSTEM
 */

// Global Application State Store
const state = {
  products: [],
  filteredProducts: [],
  cart: [],
  wishlist: [],
  theme: localStorage.getItem('theme') || 'light',
  activeCategory: 'all',
  maxPrice: 2500,
  minRating: 0,
  sortBy: 'featured'
};

// Handcrafted 40 Premium Product Dataset Engine
const rawProducts = [
  { id: 1, title: 'Apple AirPods Max Wireless Over-Ear Headphones', brand: 'Apple', category: 'electronics', price: 549, oldPrice: 599, rating: 4.8, reviews: 1240, badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop' },
  { id: 2, title: 'Sony WH-1000XM5 Noise Canceling Headphones', brand: 'Sony', category: 'electronics', price: 398, oldPrice: 420, rating: 4.7, reviews: 890, badge: 'Limited Offer', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop' },
  { id: 3, title: 'MacBook Pro 16-inch M3 Max Studio Grade', brand: 'Apple', category: 'computing', price: 2499, oldPrice: 2699, rating: 4.9, reviews: 430, badge: 'New Arrival', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop' },
  { id: 4, title: 'Minimalist Italian Leather Chronograph Watch', brand: 'Vance', category: 'fashion', price: 280, oldPrice: 350, rating: 4.6, reviews: 210, badge: 'Trending', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop' },
  { id: 5, title: 'Modern Ergonomic Velvet Accent Studio Chair', brand: 'LuxeHome', category: 'home', price: 420, oldPrice: 499, rating: 4.5, reviews: 115, badge: 'Limited Offer', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop' },
  { id: 6, title: 'Ultra-Sharp 4K OLED Gaming Monitor 144Hz', brand: 'Asus', category: 'computing', price: 899, oldPrice: 999, rating: 4.8, reviews: 560, badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop' }
];

// Dynamically generate up to 40 items programmatically for deep catalog demonstration
for (let i = 7; i <= 40; i++) {
  const cats = ['electronics', 'fashion', 'home', 'computing'];
  const cat = cats[i % cats.length];
  rawProducts.push({
    id: i,
    title: `Premium Engineered Collection Item #${i} - Deluxe Edition`,
    brand: `LuxeBrand ${i}`,
    category: cat,
    price: Math.floor(Math.random() * 800) + 99,
    oldPrice: Math.floor(Math.random() * 1000) + 200,
    rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
    reviews: Math.floor(Math.random() * 500) + 20,
    badge: i % 3 === 0 ? 'Best Seller' : 'New Arrival',
    image: rawProducts[i % 6].image
  });
}

// System Initialization Engine
document.addEventListener('DOMContentLoaded', () => {
  state.products = [...rawProducts];
  state.filteredProducts = [...rawProducts];
  
  initTheme();
  initSlider();
  initCountdown();
  renderProducts();
  initEventListeners();
  initScrollEffects();
});

/* Theme Management Module */
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('theme', state.theme);
  showToast(`Switched to ${state.theme.toUpperCase()} mode`);
}

/* Dynamic Product Grid Rendering */
function renderProducts() {
  const grid = document.getElementById('products-grid');
  const countLabel = document.getElementById('results-count');
  
  if (!grid) return;
  grid.innerHTML = '';
  
  countLabel.textContent = `Showing ${state.filteredProducts.length} items`;

  if (state.filteredProducts.length === 0) {
    grid.innerHTML = `<div class="no-results"><h3>No products match your filters</h3></div>`;
    return;
  }

  state.filteredProducts.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <span class="badge-pill">${prod.badge}</span>
      <div class="card-img-container">
        <img src="${prod.image}" alt="${prod.title}" loading="lazy">
      </div>
      <h4 class="prod-title">${prod.title}</h4>
      <div class="rating-stars">
        ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(prod.rating))}
        <span>(${prod.reviews})</span>
      </div>
      <div class="price-row">
        <span class="current-price">$${prod.price}</span>
        <span class="old-price">$${prod.oldPrice}</span>
      </div>
      <div class="card-actions">
        <button class="add-cart-btn" onclick="addToCart(${prod.id})">Add to Cart</button>
        <button class="quick-view-btn" onclick="openQuickView(${prod.id})"><i class="fa-regular fa-eye"></i></button>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* Reactive Filters & Search Core */
function applyFilters() {
  state.filteredProducts = state.products.filter(p => {
    const matchesCat = state.activeCategory === 'all' || p.category === state.activeCategory;
    const matchesPrice = p.price <= state.maxPrice;
    const matchesRating = p.rating >= state.minRating;
    return matchesCat && matchesPrice && matchesRating;
  });

  if (state.sortBy === 'price-low') {
    state.filteredProducts.sort((a,b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    state.filteredProducts.sort((a,b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    state.filteredProducts.sort((a,b) => b.rating - a.rating);
  }

  renderProducts();
}

/* Side Drawer Cart Operations */
function addToCart(id) {
  const item = state.products.find(p => p.id === id);
  const existing = state.cart.find(c => c.id === id);
  
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...item, qty: 1 });
  }

  updateCartUI();
  showToast(`Added "${item.title.substring(0, 20)}..." to Cart`);
}

function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const drawerCount = document.getElementById('cart-drawer-count');
  const container = document.getElementById('cart-items-container');
  
  const totalQty = state.cart.reduce((acc, curr) => acc + curr.qty, 0);
  badge.textContent = totalQty;
  drawerCount.textContent = totalQty;

  container.innerHTML = '';

  let subtotal = 0;

  state.cart.forEach(item => {
    subtotal += item.price * item.qty;
    const cartCard = document.createElement('div');
    cartCard.className = 'cart-item-card';
    cartCard.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div>
        <h5 style="font-size: 0.85rem">${item.title}</h5>
        <span>$${item.price}</span>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button style="background:none;border:none;color:red;cursor:pointer" onclick="removeFromCart(${item.id})">&times;</button>
    `;
    container.appendChild(cartCard);
  });

  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('cart-total').textContent = `$${grandTotal.toFixed(2)}`;
}

function changeQty(id, delta) {
  const item = state.cart.find(c => c.id === id);
  if (!item) return;
  
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    updateCartUI();
  }
}

function removeFromCart(id) {
  state.cart = state.cart.filter(c => c.id !== id);
  updateCartUI();
}

/* Quick View Modal Launcher */
function openQuickView(id) {
  const item = state.products.find(p => p.id === id);
  const modal = document.getElementById('quick-view-modal');
  const body = document.getElementById('modal-body-content');

  body.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center;">
      <img src="${item.image}" style="width:100%; border-radius:12px;">
      <div>
        <h3>${item.title}</h3>
        <p style="color:var(--text-muted); margin: 8px 0;">Brand: ${item.brand}</p>
        <h2 style="color:var(--amazon-orange); margin-bottom: 12px;">$${item.price}</h2>
        <p style="font-size:0.9rem; margin-bottom:16px;">Engineered with state-of-the-art materials offering luxury standard reliability.</p>
        <button class="btn-primary-luxe" onclick="addToCart(${item.id})">Add To Cart</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

/* Hero Slider Engine */
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  let current = 0;

  document.getElementById('slider-next')?.addEventListener('click', () => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  });

  document.getElementById('slider-prev')?.addEventListener('click', () => {
    slides[current].classList.remove('active');
    current = (current - 1 + slides.length) % slides.length;
    slides[current].classList.add('active');
  });
}

/* Countdown Clock Engine */
function initCountdown() {
  let time = 31339; // Seconds counter
  setInterval(() => {
    time--;
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;

    const hEl = document.getElementById('hours');
    if (hEl) {
      hEl.textContent = String(h).padStart(2, '0');
      document.getElementById('minutes').textContent = String(m).padStart(2, '0');
      document.getElementById('seconds').textContent = String(s).padStart(2, '0');
    }
  }, 1000);
}

/* Scroll Effects & Progress Bar */
function initScrollEffects() {
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    document.getElementById('scroll-progress').style.width = scrolled + '%';

    const backTop = document.getElementById('back-to-top');
    if (winScroll > 400) {
      backTop?.classList.add('visible');
    } else {
      backTop?.classList.remove('visible');
    }
  });
}

/* Event Listeners Matrix */
function initEventListeners() {
  // Theme Toggle Button
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  // Cart Drawer Open/Close
  document.getElementById('cart-drawer-open')?.addEventListener('click', () => {
    document.getElementById('cart-drawer').classList.add('active');
    document.getElementById('drawer-overlay').classList.add('active');
  });

  const closeCart = () => {
    document.getElementById('cart-drawer').classList.remove('active');
    document.getElementById('drawer-overlay').classList.remove('active');
  };

  document.getElementById('cart-drawer-close')?.addEventListener('click', closeCart);
  document.getElementById('drawer-overlay')?.addEventListener('click', closeCart);

  // Quick View Modal Close
  document.getElementById('modal-close-btn')?.addEventListener('click', () => {
    document.getElementById('quick-view-modal').classList.remove('active');
  });

  // Category Sidebar Listeners
  document.querySelectorAll('#filter-category li').forEach(li => {
    li.addEventListener('click', (e) => {
      document.querySelectorAll('#filter-category li').forEach(el => el.classList.remove('active'));
      e.target.classList.add('active');
      state.activeCategory = e.target.getAttribute('data-value');
      applyFilters();
    });
  });

  // Price Range Slider Listener
  document.getElementById('price-range')?.addEventListener('input', (e) => {
    state.maxPrice = Number(e.target.value);
    document.getElementById('price-range-val').textContent = `$${state.maxPrice}`;
    applyFilters();
  });

  // Sort Selection Listener
  document.getElementById('sort-select')?.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    applyFilters();
  });

  // Back to Top Listener
  document.getElementById('back-to-top-bar')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Utility Toast System */
function showToast(msg) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
