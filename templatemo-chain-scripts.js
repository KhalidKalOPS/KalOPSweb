/* ===== BACKGROUND EFFECTS ===== */

function createNeuralNetwork() {
  const container = document.getElementById('neuralNetwork');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const node = document.createElement('div');
    node.className = 'node';
    node.style.left = Math.random() * 100 + '%';
    node.style.top = Math.random() * 100 + '%';
    container.appendChild(node);
  }
}

function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(particle);
  }
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===== MOBILE MENU ===== */
function toggleMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileNav').classList.remove('open');
}

/* ===== INIT ===== */
window.addEventListener('load', () => {
  createNeuralNetwork();
  createParticles();
});
// ===== MOBILE MENU FIX =====
function toggleMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileNav = document.getElementById('mobileNav');

  mobileMenu.classList.toggle('active');
  mobileNav.classList.toggle('active');

  document.body.style.overflow = mobileNav.classList.contains('active')
    ? 'hidden'
    : 'auto';
}

function closeMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileNav = document.getElementById('mobileNav');

  mobileMenu.classList.remove('active');
  mobileNav.classList.remove('active');
  document.body.style.overflow = 'auto';
}

