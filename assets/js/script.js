// Theme Toggle Functionality
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  if (themeToggle) {
    themeToggle.textContent = newTheme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
  }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function () {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const themeToggle = document.getElementById('themeToggle');

  document.body.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    themeToggle.textContent = savedTheme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
  }

  // Update current year in footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// Mobile Menu Toggle
function toggleMobileMenu() {
  const nav = document.querySelector('.main-nav');
  if (nav) {
    nav.classList.toggle('active');
  }
}

// Smooth scrolling for same-page anchor links
document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const url = new URL(this.href, window.location.href);
    if (url.pathname === window.location.pathname && url.hash) {
      const target = document.querySelector(url.hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  });
});

// Animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

document.querySelectorAll('.app-card, .stat-item, .blog-post').forEach((el) => {
  observer.observe(el);
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.site-header');

if (header) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });
}

// Contact form (mailto) — opens the visitor's email client with a prefilled message
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const errorMessage = document.getElementById('contact-form-error-message');
  const successMessage = document.getElementById('contact-form-success-message');
  const toEmail = contactForm.dataset.email || 'ask.inshira@gmail.com';

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (errorMessage) errorMessage.textContent = '';
    if (successMessage) successMessage.textContent = '';

    let isValid = true;
    contactForm.querySelectorAll('[required]').forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#e74c3c';
      } else {
        field.style.borderColor = '';
      }
    });

    if (!isValid) {
      if (errorMessage) errorMessage.textContent = 'Please fill in all required fields.';
      return;
    }

    const nameField = document.getElementById('contact-name');
    const emailField = document.getElementById('contact-email');
    const messageField = document.getElementById('contact-message');

    const name = nameField ? nameField.value.trim() : '';
    const email = emailField ? emailField.value.trim() : '';
    const message = messageField ? messageField.value.trim() : '';

    const subject = name ? 'Website contact from ' + name : 'Website contact';
    const bodyLines = [];
    if (name) bodyLines.push('Name: ' + name);
    if (email) bodyLines.push('Email: ' + email);
    bodyLines.push('', message);

    const mailtoUrl =
      'mailto:' +
      toEmail +
      '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(bodyLines.join('\n'));

    window.location.href = mailtoUrl;

    if (successMessage) {
      successMessage.textContent = 'Opening your email app...';
    }
  });
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
}
