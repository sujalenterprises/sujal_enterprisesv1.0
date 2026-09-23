const products = [
  {
    id: 'closed-end-wire-connector',
    name: 'CLOSED END WIRE CONNECTOR',
    image: 'ClosedendWireConnectors.jpg',
    description: 'A compact closed-end connector designed for reliable insulation and secure jointing in electrical and automotive applications.',
    specs: [
      'Available variants: CE1X, CE2X and other standard closed-end types',
      'High-conductivity metal body for dependable current flow',
      'Insulated design for safe and clean wiring connections',
      'Suitable for low-voltage and general industrial use'
    ]
  },
  {
    id: 'tyco-terminal',
    name: 'Tyco Terminal',
    image: 'TYCOTerminal.jpg',
    description: 'Tyco terminals built for precision connection and strong mechanical retention in wiring harness assemblies.',
    specs: [
      'Available series: 4.8F, 6.4F and compatible standard terminal sizes',
      'Precision-engineered for stable terminal fit',
      'Ideal for automotive and OEM harness production',
      'Available in standard compatible sizes'
    ]
  },
  {
    id: 'housing-cover-vhr',
    name: 'Housing Cover VHR',
    image: 'product1b.png',
    description: 'A durable housing cover designed to protect and organize connector assemblies while maintaining a secure fit.',
    specs: [
      'Protective housing for multi-pin connector systems',
      'Strong mechanical retention for daily use',
      'Compatible with standard wiring layouts'
    ]
  },
  {
    id: 'terminal-cover',
    name: 'Terminal Cover',
    image: 'TerminalCover.webp',
    description: 'A snap-fit terminal cover that adds insulation, protection, and a neat finish to connected wire terminals.',
    specs: [
      'Available in 4.8F, 6.4F and matching terminal cover sizes',
      'Improves insulation and safety',
      'Reduces exposure to dust and moisture',
      'Useful for both field and factory wiring checks'
    ]
  }
];

const catalog = document.getElementById('connectorCatalog');
const detailPanel = document.getElementById('productDetail');

function renderCatalog() {
  catalog.innerHTML = products.map((product) => `
    <article class="catalog-card" data-id="${product.id}" tabindex="0" aria-label="View details for ${product.name}">
      <div class="catalog-image">
        <img src="${product.image}" alt="${product.name}">
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
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  detailPanel.classList.add('active');
  detailPanel.innerHTML = `
    <div class="detail-layout">
      <img src="${product.image}" alt="${product.name}">
      <div class="detail-meta">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <ul>
          ${product.specs.map((spec) => `<li>${spec}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

renderCatalog();
