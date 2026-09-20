const FORM_CONFIG = {
  endpoint: 'https://script.google.com/macros/s/AKfycbzrLt-nkuSNwsYq2n_CWBgmr5AXxa3C28zgTVhLvA9JmctoCwo0BW0qIVT1BVPs6DcSRg/exec'
};

function isFormConfigured() {
  return Boolean(FORM_CONFIG.endpoint) && !FORM_CONFIG.endpoint.includes('YOUR_DEPLOYMENT_ID');
}

function getFormValues(form) {
  const data = new FormData(form);
  const values = Object.fromEntries(data.entries());

  return {
    name: values.name || '',
    email: values.email || '',
    phone: values.phone || '',
    company: values.company || '',
    product: values.product || '',
    message: values.message || '',
    consent: values.consent || ''
  };
}

async function submitFormByEmail(form) {
  const values = getFormValues(form);

  if (!isFormConfigured()) {
    alert('Form service is not configured yet. Please contact the site owner.');
    return false;
  }

  try {
    const encoded = new URLSearchParams(new FormData(form));
    const response = await fetch(FORM_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: encoded.toString()
    });

    if (!response.ok) {
      throw new Error(`Apps Script request failed with status ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Form submission failed:', error);
    alert('Unable to send the enquiry right now. Please try again later.');
    return false;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const zoomLinks = document.querySelectorAll('.zoom-trigger');

  if (zoomLinks.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    const content = document.createElement('div');
    content.className = 'lightbox-content';
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'lightbox-close';
    closeButton.setAttribute('aria-label', 'Close image zoom');
    closeButton.textContent = '×';
    const image = document.createElement('img');
    image.alt = 'Zoomed product image';
    content.appendChild(closeButton);
    content.appendChild(image);
    lightbox.appendChild(content);
    document.body.appendChild(lightbox);

    const openLightbox = (src, alt) => {
      image.src = src;
      image.alt = alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      image.src = '';
    };

    zoomLinks.forEach((link) => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const href = link.getAttribute('href');
        const alt = link.querySelector('img')?.getAttribute('alt') || 'Product image';
        if (href) openLightbox(href, alt);
      });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  const counters = document.querySelectorAll('.count');
  const options = { threshold: 0.5 };

  const animateCounter = (counter) => {
    const target = parseInt(counter.dataset.count, 10) || 0;
    const duration = 1400;
    let start = 0;
    const step = Math.max(1, Math.round(target / (duration / 16)));

    const update = () => {
      start += step;
      if (start >= target) {
        counter.textContent = target;
        return;
      }
      counter.textContent = start;
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, options);

  counters.forEach((counter) => observer.observe(counter));
});

// Modal and form handling
document.addEventListener('DOMContentLoaded', function () {
  const openers = document.querySelectorAll('.open-modal');
  const modals = document.querySelectorAll('.modal');
  const modalCloseButtons = document.querySelectorAll('.modal-close');

  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(m) {
    if (!m) return;
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const form = m.querySelector('form');
    if (form) {
      form.style.display = '';
      form.reset();
    }
    const success = m.querySelector('.modal-success');
    if (success) success.style.display = 'none';
  }

  openers.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const id = btn.dataset.modal || 'contact-modal';
      openModal(id);
    });
  });

  modalCloseButtons.forEach(b => b.addEventListener('click', function (e) {
    const m = e.target.closest('.modal');
    closeModal(m);
  }));

  modals.forEach(m => {
    m.addEventListener('click', function (e) {
      if (e.target === m) closeModal(m);
    });
  });

  document.querySelectorAll('.enquiry-form, .modal form').forEach(form => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const modal = form.closest('.modal');
      const isModal = Boolean(modal);

      const success = isModal ? modal.querySelector('.modal-success') : null;
      const formButton = form.querySelector('button[type="submit"]');
      if (formButton) {
        const originalText = formButton.textContent;
        formButton.disabled = true;
        formButton.textContent = 'Sending...';

        try {
          const sent = await submitFormByEmail(form);
          if (sent !== false) {
            if (isModal) {
              form.style.display = 'none';
              if (success) success.style.display = '';
              const qi = document.querySelector('.quick-inquiry');
              if (qi) qi.style.left = '20px';
              setTimeout(() => closeModal(modal), 2500);
            } else {
              form.reset();
              alert('Your enquiry has been sent successfully.');
            }
          }
        } finally {
          formButton.disabled = false;
          formButton.textContent = originalText;
        }
      }
    });
  });
});
