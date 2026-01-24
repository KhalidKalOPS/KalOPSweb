/* JavaScript Document

TemplateMo 601 Chain Summit - MODIFIED FOR KalOPS & NETLIFY FORMS

https://templatemo.com/tm-601-chain-summit

*/

// ================= URL FIX CODE - START =================
(function() {
    // Remove .html from all URLs
    var currentPath = window.location.pathname;
    
    if (currentPath.endsWith('.html')) {
        var newPath = currentPath.replace('.html', '');
        
        // Special case for home page
        if (newPath === '/index') {
            newPath = '/';
        }
        
        // Update URL without refreshing page
        window.history.replaceState({}, document.title, newPath);
    }
})();
// ================= URL FIX CODE - END =================

// FIX 3: MOBILE PERFORMANCE OPTIMIZATION
let isMobile = window.innerWidth <= 768;

// Optimize animations for mobile
function createNeuralNetwork() {
   const container = document.getElementById('neuralNetwork');
   const nodes = isMobile ? 10 : 20; // Fewer nodes on mobile

   for (let i = 0; i < nodes; i++) {
      const node = document.createElement('div');
      node.className = 'node';
      node.style.left = Math.random() * 100 + '%';
      node.style.top = Math.random() * 100 + '%';
      node.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(node);

      // Create connections
      if (i > 0 && Math.random() > 0.5 && !isMobile) { // Fewer connections on mobile
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

// FIX 3: CREATE PARTICLES FOR MOBILE TOO
function createParticles() {
   const container = document.getElementById('particles');
   const particleCount = isMobile ? 20 : 50; // Fewer particles on mobile

   for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (10 + Math.random() * 4) + 's';
      
      // Make particles more visible on mobile
      if (isMobile) {
         particle.style.width = '3px';
         particle.style.height = '3px';
         particle.style.opacity = '0.8';
      }
      
      container.appendChild(particle);
   }
}

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

// Schedule tab functionality - MODIFIED FOR SUPPORT PROCESS
function showSchedule(day, event) {
   // Hide all schedule content
   document.querySelectorAll('.schedule-content').forEach(content => {
      content.classList.remove('active');
   });

   // Remove active class from all tabs
   document.querySelectorAll('.tab-btn').forEach(tab => {
      tab.classList.remove('active');
   });

   // Show selected day and activate tab
   document.getElementById(day).classList.add('active');
   event.target.classList.add('active');
}

// FIX 1: MOBILE MENU TOGGLE
function toggleMenu() {
   const mobileMenu = document.querySelector('.mobile-menu');
   const mobileNav = document.getElementById('mobileNav');

   mobileMenu.classList.toggle('active');
   mobileNav.classList.toggle('active');

   // Prevent body scroll when menu is open
   document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMenu() {
   const mobileMenu = document.querySelector('.mobile-menu');
   const mobileNav = document.getElementById('mobileNav');

   mobileMenu.classList.remove('active');
   mobileNav.classList.remove('active');
   document.body.style.overflow = 'auto';
}

// Timeline item toggle
function toggleTimelineItem(item) {
   item.classList.toggle('expanded');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
         target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         });
         
         // Close mobile menu if open
         closeMenu();
      }
   });
});

// Update active menu items on scroll
function updateActiveMenuItem() {
   const sections = document.querySelectorAll('section[id]');
   const scrollPosition = window.scrollY + 100;

   sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
         // Update desktop menu
         document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
               link.classList.add('active');
            }
         });

         // Update mobile menu
         document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
               link.classList.add('active');
            }
         });
      }
   });
}

// Header scroll effect
window.addEventListener('scroll', () => {
   const header = document.querySelector('header');
   if (window.scrollY > 100) {
      header.style.background = 'rgba(10, 10, 15, 0.95)';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
   } else {
      header.style.background = 'rgba(10, 10, 15, 0.9)';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
   }

   // Update active menu item
   updateActiveMenuItem();
});

// Intersection Observer for scroll animations
const observerOptions = {
   threshold: 0.1,
   rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.classList.add('animated');
      }
   });
}, observerOptions);

// Initialize scroll animations
function initScrollAnimations() {
   // Add animation classes to elements
   document.querySelectorAll('.section h2').forEach(heading => {
      heading.classList.add('animate-on-scroll');
   });

   document.querySelectorAll('.timeline-item').forEach((item, index) => {
      item.style.setProperty('--stagger', index + 1);
      item.classList.add('stagger-animation');
   });

   // Add animations for quick access panel
   document.querySelectorAll('.action-btn').forEach((btn, index) => {
      btn.style.animationDelay = `${index * 0.1}s`;
      btn.classList.add('animate-on-scroll');
   });

   // Observe all animation elements
   document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
   });
}

// Add hexagonal decorations dynamically
function addHexDecorations() {
   const sections = document.querySelectorAll('.section');
   sections.forEach((section, index) => {
      if (index > 0) { // Skip hero section
         const hexCount = 2 + Math.floor(Math.random() * 3);
         for (let i = 0; i < hexCount; i++) {
            const hex = document.createElement('div');
            hex.className = 'hex-decoration';
            hex.style.top = Math.random() * 80 + 10 + '%';
            hex.style.left = Math.random() * 80 + 10 + '%';
            hex.style.animationDelay = Math.random() * 6 + 's';
            section.style.position = 'relative';
            section.appendChild(hex);
         }
      }
   });
}

// Initialize support quick access panel animations
function initSupportPanel() {
   const actionBtns = document.querySelectorAll('.action-btn');
   actionBtns.forEach((btn, index) => {
      btn.style.setProperty('--stagger', index + 1);
      btn.classList.add('stagger-animation');
   });
}

// FIX 3: OPTIMIZE FOR MOBILE
function optimizeForMobile() {
   if (!isMobile) return;
   
   // Reduce animation complexity on mobile
   document.querySelectorAll('.node, .connection, .particle').forEach(el => {
      el.style.animationDuration = '8s';
   });
   
   // Disable heavy hover effects on mobile
   if ('ontouchstart' in window) {
      document.querySelectorAll('.tech-circle, .speaker-card, .sponsor-card').forEach(el => {
         el.style.transition = 'none';
      });
   }
}

// Initialize everything when page loads
window.addEventListener('load', () => {
   // Check if mobile
   isMobile = window.innerWidth <= 768;
   
   animateCounters();
   createNeuralNetwork();
   createParticles();
   initScrollAnimations();
   addHexDecorations();
   initSupportPanel();
   optimizeForMobile();
});

// Reinitialize on resize
window.addEventListener('resize', function() {
   isMobile = window.innerWidth <= 768;
   optimizeForMobile();
});
