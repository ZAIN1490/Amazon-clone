// Dynamic dataset of unique high-resolution image URLs
const imagePool = {
  electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=600&q=80'
  ],
  fashion: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80'
  ],
  home: [
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
  ],
  tech: [
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80'
  ]
};

// Generate product dataset dynamically
const productsData = Array.from({ length: 40 }).map((_, index) => {
  const id = index + 1;
  const categories = ['electronics', 'fashion', 'home', 'tech'];
  const category = categories[index % categories.length];
  
  const titles = {
    electronics: [`Wireless ANC Headphones v${id}`, `Studio Precision Monitor ${id}`, `Portable Bluetooth Speaker ${id}`, `Noise-Canceling Earbuds ${id}`],
    fashion: [`Minimalist Leather Watch ${id}`, `Luxe Cashmere Hoodie ${id}`, `Urban Essential Backpack ${id}`, `Premium Sunglasses ${id}`],
    home: [`Architectural Desk Lamp ${id}`, `Ceramic Diffuser ${id}`, `Ergonomic Office Chair ${id}`, `Minimalist Wall Clock ${id}`],
    tech: [`Ultra-Slim Mechanical Keyboard ${id}`, `Pro Ergonomic Mouse ${id}`, `4K Cinema Display ${id}`, `Portable SSD Drive ${id}`]
  };

  const titleList = titles[category];
  const title = titleList[index % titleList.length];
  
  const categoryImages = imagePool[category];
  const imageIndex = Math.floor(index / categories.length) % categoryImages.length;

  return {
    id,
    title,
    category,
    price: Math.floor(Math.random() * 400) + 29,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 300) + 12,
    image: categoryImages[imageIndex],
    isFlashSale: index % 3 === 0
  };
});

// Global Application State
let cart = [];
let currentCategory = 'all';
let searchKeyword = '';
let maxPrice = 500;

// DOM Elements Selection
const productGrid = document.getElementById('product-grid');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartToggleBtn = document.getElementById('cart-toggle');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountBadge = document.getElementById('cart-count');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTaxEl = document.getElementById('cart-tax');
const cartTotalEl = document.getElementById('cart-total');
const searchInput = document.getElementById('search-input');
const priceRangeInput = document.getElementById('price-range');
const priceValueDisplay = document.getElementById('price-value');
const themeToggleBtn = document.getElementById('theme-toggle');
const categoryNav = document.getElementById('category-nav');
const menuDrawer = document.getElementById('menu-drawer');
const menuOverlay = document.getElementById('menu-overlay');
const menuToggleBtn = document.getElementById('menu-toggle');
const closeMenuBtn = document.getElementById('close-menu');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
  startCountdownTimers();
});

// Render Product Grid
function renderProducts() {
  const filteredProducts = productsData.filter(product => {
    const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 0; color: var(--text-secondary);">
        <h3>No products found</h3>
        <p>Try adjusting your search filters or price range.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <div class="card-image-wrapper">
        <img src="${product.image}" alt="${product.title}" loading="lazy" />
        ${product.isFlashSale ? `<span class="badge flash-badge">Deal</span>` : ''}
        <button class="quick-add-btn" onclick="addToCart(${product.id})" aria-label="Add to cart">
          Add to Cart
        </button>
      </div>
      <div class="card-content">
        <span class="category-tag">${product.category}</span>
        <h3 class="product-title">${product.title}</h3>
        <div class="rating-row">
          <span class="stars">★</span>
          <span class="rating-val">${product.rating}</span>
          <span class="review-count">(${product.reviews})</span>
        </div>
        <div class="price-row">
          <span class="current-price">$${product.price}.00</span>
          ${product.isFlashSale ? `<span class="original-price">$${Math.floor(product.price * 1.25)}.00</span>` : ''}
        </div>
      </div>
    </article>
  `).join('');
}

// Shopping Cart Functions
window.addToCart = function(productId) {
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = productsData.find(p => p.id === productId);
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
  openCart();
};

window.updateQuantity = function(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  updateCartUI();
};

window.removeFromCart = function(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
};

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountBadge.textContent = totalItems;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 2rem 0; color: var(--text-secondary);">
        Your cart is empty.
      </div>
    `;
    cartSubtotalEl.textContent = '$0.00';
    cartTaxEl.textContent = '$0.00';
    cartTotalEl.textContent = '$0.00';
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" />
      <div class="item-details">
        <div class="item-title">${item.title}</div>
        <div class="item-price">$${item.price}.00</div>
        <div class="quantity-controls">
          <button onclick="updateQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})" aria-label="Remove item">&times;</button>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% estimated tax
  const total = subtotal + tax;

  cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  cartTaxEl.textContent = `$${tax.toFixed(2)}`;
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
}

// Drawer Controls
function openCart() {
  cartDrawer.classList.add('active');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('active');
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function openMenu() {
  menuDrawer.classList.add('active');
  menuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menuDrawer.classList.remove('active');
  menuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Event Listeners
function setupEventListeners() {
  cartToggleBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

  searchInput.addEventListener('input', (e) => {
    searchKeyword = e.target.value;
    renderProducts();
  });

  priceRangeInput.addEventListener('input', (e) => {
    maxPrice = parseInt(e.target.value, 10);
    priceValueDisplay.textContent = `$${maxPrice}`;
    renderProducts();
  });

  categoryNav.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.dataset.category;
      renderProducts();
    }
  });

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  });
}

// Flash Sale Countdown Timer
function startCountdownTimers() {
  let time = 3600 * 5; // 5 hours in seconds
  const timerDisplay = document.getElementById('deal-timer');
  
  if (!timerDisplay) return;

  setInterval(() => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (time > 0) {
      time--;
    } else {
      time = 3600 * 5;
    }
  }, 1000);
}
