New java script



/* JavaScript Document
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
