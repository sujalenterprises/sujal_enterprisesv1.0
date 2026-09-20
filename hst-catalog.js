const hstProducts = [
  {
    id: 'hst',
    name: 'HST',
    imageSet: ['images/hstwoer.jpg', 'images/woerhst.webp'],
    description: 'HST products are designed for thermal insulation, mechanical protection and dependable performance in industrial wire and cable applications.',
    specs: [
      'Available in multiple HST product variants for protection and insulation',
      'Suitable for cable management, bundling and insulation coverage',
      'Provides mechanical protection against abrasion and heat exposure',
      'Ideal for industrial, electrical and wiring installation use'
    ]
  },
  {
    id: 'fg-silicone',
    name: 'FG Silicone',
    imageSet: ['images/FGSilicone.webp'],
    description: 'FG Silicone is available in round form and different sizes, including 6mm length options, for precise sealing, insulation and flexible protection needs.',
    specs: [
      'Available in different sizes to match installation requirements',
      'Round form design for efficient sealing and insulation',
      'Suitable for flexible and reliable application performance',
      'Popular in 6mm length options for precision use'
    ]
  },
  {
    id: 'pe-tube',
    name: 'PE Tube',
    imageSet: ['images/petube.png'],
    description: 'PE tubes provide flexible, lightweight and durable protection for wires, cables and bundled assemblies in industrial and electrical installations.',
    specs: [
      'Excellent flexibility and abrasion resistance',
      'Protects wires and cables from impact and environmental exposure',
      'Suitable for routing, bundling and insulation support',
      'Available in standard industrial tube sizes'
    ]
  }
];

const catalog = document.getElementById('hstCatalog');
const detailPanel = document.getElementById('productDetail');

function renderCatalog() {
  catalog.innerHTML = hstProducts.map((product) => `
    <article class="catalog-card" data-id="${product.id}" tabindex="0" aria-label="View details for ${product.name}">
      <div class="catalog-image">
        <img src="${product.imageSet[0]}" alt="${product.name}">
      </div>
      <div class="catalog-body">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      </div>
    </article>
  `).join('');

  catalog.querySelectorAll('.catalog-card').forEach((card) => {
    card.addEventListener('click', () => showProduct(card.dataset.id));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showProduct(card.dataset.id);
      }
    });
  });
}

function showProduct(productId) {
  const product = hstProducts.find((item) => item.id === productId);
  if (!product) return;

  detailPanel.classList.add('active');

  const gallery = product.imageSet.length > 1
    ? `
      <div class="product-slider" aria-label="${product.name} image gallery">
        <button type="button" class="slider-btn prev" aria-label="Previous image">&#10094;</button>
        <div class="slider-viewport">
          <div class="slider-track">
            ${product.imageSet.map((image, index) => `
              <figure class="slide ${index === 0 ? 'active' : ''}">
                <img src="${image}" alt="${product.name} image ${index + 1}">
              </figure>
            `).join('')}
          </div>
        </div>
        <button type="button" class="slider-btn next" aria-label="Next image">&#10095;</button>
        <div class="slider-dots">
          ${product.imageSet.map((_, index) => `
            <button type="button" class="slider-dot ${index === 0 ? 'active' : ''}" aria-label="View image ${index + 1}"></button>
          `).join('')}
        </div>
      </div>
    `
    : `
      <img src="${product.imageSet[0]}" alt="${product.name}" class="single-product-image">
    `;

  detailPanel.innerHTML = `
    <div class="detail-layout">
      ${gallery}
      <div class="detail-meta">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <ul>
          ${product.specs.map((spec) => `<li>${spec}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  if (product.imageSet.length > 1) {
    initSlider(detailPanel.querySelector('.product-slider'));
  }

  detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initSlider(slider) {
  if (!slider) return;

  const track = slider.querySelector('.slider-track');
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dots = Array.from(slider.querySelectorAll('.slider-dot'));
  const prevBtn = slider.querySelector('.slider-btn.prev');
  const nextBtn = slider.querySelector('.slider-btn.next');
  let currentIndex = 0;

  const showSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === currentIndex));
  };

  prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
}

renderCatalog();
