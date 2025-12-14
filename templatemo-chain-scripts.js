function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 40; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(p);
  }
}

function toggleMenu() {
  document.getElementById('mobileNav').classList.toggle('active');
}

function closeMenu() {
  document.getElementById('mobileNav').classList.remove('active');
}

window.addEventListener('load', createParticles);
