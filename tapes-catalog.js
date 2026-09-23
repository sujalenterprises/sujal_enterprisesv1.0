const tapeProducts = [
  {
    id: 'polyester-tape',
    name: 'Polyester Tape',
    imageSet: ['TechnovaTapes.webp'],
    description: 'Technova polyester tape is available in multiple colors and different sizes, including 18mm and 42mm, with color options customizable as per customer demand.',
    specs: [
      'Technova brand polyester tape for industrial and electrical use',
      'Available in multiple colors for different applications',
      'Available in different sizes such as 18mm and 42mm',
      'Customizable as per demand and application requirement'
    ]
  },
  {
    id: 'masking-tape',
    name: 'Masking Tape',
    imageSet: ['Maskingtape.jpg'],
    description: 'Masking tape is available in different sizes as per demand, along with paper tape options suitable for clean and practical industrial use.',
    specs: [
      'Available in different sizes as per customer demand',
      'Suitable for masking and paper tape applications',
      'Useful for workshop, finishing and packaging operations',
      'Flexible and suitable for varied industrial requirements'
    ]
  },
  {
    id: 'bopp-tape',
    name: 'BOPP Tape',
    imageSet: ['bopp-brown-tape.webp', 'TransaparentBopp.jpg'],
    description: 'BOPP tape combines strong adhesion with professional packaging and sealing performance for industrial and commercial applications.',
    specs: [
      'Available in brown and transparent variants',
      'Excellent adhesion for packaging and sealing tasks',
      'Good resistance to moisture and regular handling',
      'Suitable for general industrial and commercial use'
    ]
  }
];

const catalog = document.getElementById('tapeCatalog');
const detailPanel = document.getElementById('productDetail');

function renderCatalog() {
  catalog.innerHTML = tapeProducts.map((product) => `
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
  const product = tapeProducts.find((item) => item.id === productId);
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
