document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const siteHeader = document.querySelector('.site-header');
const siteNav = document.querySelector('#site-nav');

function setMenuOpen(open) {
  siteHeader.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
}

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuOpen(false);
});

const products = {
  barrier: {
    title: 'Manuka Honey Barrier Cream',
    category: 'Advancis Activon · Skin care',
    format: '25 g',
    image: 'assets/site/manuka-barrier-cream.webp',
    alt: 'Advancis Manuka Honey Barrier Cream campaign image',
  },
  tube: {
    title: 'Activon Tube',
    category: 'Advancis Activon · Manuka honey tube',
    format: '25 g',
    image: 'assets/site/activon-tube.webp',
    alt: 'Advancis Activon Tube and packaging',
  },
  tulle: {
    title: 'Activon Tulle',
    category: 'Advancis Activon · Dressing',
    format: 'Dressing format',
    image: 'assets/site/activon-tulle.webp',
    alt: 'Activon Tulle dressing product image',
  },
};

const productDialog = document.querySelector('#product-dialog');
const dialogClose = productDialog.querySelector('.dialog-close');
const dialogImage = productDialog.querySelector('.dialog-image img');
let lastProductTrigger = null;

document.querySelectorAll('[data-product]').forEach((button) => {
  button.addEventListener('click', () => {
    const product = products[button.dataset.product];
    if (!product) return;

    lastProductTrigger = button;
    document.querySelector('#dialog-title').textContent = product.title;
    document.querySelector('#dialog-category').textContent = product.category;
    document.querySelector('#dialog-format').textContent = product.format;
    dialogImage.src = product.image;
    dialogImage.alt = product.alt;
    productDialog.showModal();
    dialogClose.focus();
  });
});

function closeProductDialog() {
  if (productDialog.open) productDialog.close();
}

dialogClose.addEventListener('click', closeProductDialog);
productDialog.querySelector('.dialog-done').addEventListener('click', closeProductDialog);
productDialog.addEventListener('click', (event) => {
  if (event.target === productDialog) closeProductDialog();
});
productDialog.addEventListener('close', () => {
  if (lastProductTrigger?.isConnected) lastProductTrigger.focus();
});

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const productCards = [...document.querySelectorAll('.product-card')];
const filterStatus = document.querySelector('.filter-status');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    let visible = 0;
    productCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible += 1;
    });

    filterStatus.textContent = `Showing ${visible} ${visible === 1 ? 'product' : 'products'}`;
  });
});

const year = document.querySelector('#current-year');
if (year) year.textContent = String(new Date().getFullYear());

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in-view'));
}
