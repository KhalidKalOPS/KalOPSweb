/* JavaScript Document

TemplateMo 601 Chain Summit
https://templatemo.com/tm-601-chain-summit
*/

// ================= URL FIX CODE - START =================
(function() {
    var currentPath = window.location.pathname;
    if (currentPath.endsWith('.html')) {
        var newPath = currentPath.replace('.html', '');
        if (newPath === '/index') newPath = '/';
        window.history.replaceState({}, document.title, newPath);
    }
})();
// ================= URL FIX CODE - END =================

// Animate counter numbers
function animateCounters() {
   const counters = document.querySelectorAll('.stat-number');
   counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 200;
      let current = 0;
      const timer = setInterval(() => {
         current += increment;
         counter.textContent = Math.floor(current);
         if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
         }
      }, 10);
   });
}

// Countdown timer (OPTIONAL – can remove if not used)
function updateCountdown() {
   const eventDate = new Date('2026-11-14T09:00:00');
   const now = new Date();
   const diff = eventDate - now;
   if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const d = document.getElementById('days');
      if (d) {
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
      }
   }
}

// Create neural network animation
function createNeuralNetwork() {
   const container = document.getElementById('neuralNetwork');
   if (!container) return;
   const nodes = 20;
   for (let i = 0; i < nodes; i++) {
      const node = document.createElement('div');
      node.className = 'node';
      node.style.left = Math.random() * 100 + '%';
      node.style.top = Math.random() * 100 + '%';
      node.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(node);
      if (i > 0 && Math.random() > 0.5) {
         const connection = document.createElement('div');
         connection.className = 'connection';
         connection.style.left = Math.random() * 100 + '%';
         connection.style.top = Math.random() * 100 + '%';
         connection.style.width = Math.random() * 200 + 50 + 'px';
         connection.style.animationDelay = Math.random() * 3 + 's';
         container.appendChild(connection);
      }
   }
}

// Create floating particles
function createParticles() {
   const container = document.getElementById('particles');
   if (!container) return;
   const particleCount = 50;
   for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (10 + Math.random() * 4) + 's';
      container.appendChild(particle);
   }
}

// Smooth scrolling

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
   });
});

// Header scroll effect
window.addEventListener('scroll', () => {
   const header = document.querySelector('header');
   if (!header) return;
   if (window.scrollY > 100) {
      header.style.background = 'rgba(10, 10, 15, 0.95)';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
   } else {
      header.style.background = 'rgba(10, 10, 15, 0.9)';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
   }
});

// ================= HERO + SERVICES HARD FIX =================

document.addEventListener('DOMContentLoaded', function () {
    const hero = document.getElementById('hero');
    if (hero) {
        hero.style.minHeight = '80vh';
        hero.style.height = 'auto';
        hero.style.paddingBottom = '60px';
    }

    const services = document.getElementById('services');
    if (services) {
        services.style.marginTop = '-120px';
        services.style.paddingTop = '120px';
        services.style.position = 'relative';
        services.style.zIndex = '5';
    }
});

// Initialize
window.addEventListener('load', () => {
   animateCounters();
   createNeuralNetwork();
   createParticles();
   updateCountdown();
});
