/* JavaScript Document

TemplateMo 601 Chain Summit - MODIFIED FOR KalOPS
FIXED FOR MOBILE WITH BUBBLES ANIMATION

https://templatemo.com/tm-601-chain-summit

*/

// ================= URL FIX CODE =================
(function() {
    var currentPath = window.location.pathname;
    
    if (currentPath.endsWith('.html')) {
        var newPath = currentPath.replace('.html', '');
        
        if (newPath === '/index') {
            newPath = '/';
        }
        
        window.history.replaceState({}, document.title, newPath);
    }
})();

// ================= MOBILE DETECTION =================
let isMobile = window.innerWidth <= 768;

// ================= ANIMATE COUNTERS =================
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

// ================= CREATE NEURAL NETWORK (FOR BOTH DESKTOP & MOBILE) =================
function createNeuralNetwork() {
   const container = document.getElementById('neuralNetwork');
   if (!container) return;
   
   const nodes = isMobile ? 15 : 20;

   for (let i = 0; i < nodes; i++) {
      const node = document.createElement('div');
      node.className = 'node';
      node.style.left = Math.random() * 100 + '%';
      node.style.top = Math.random() * 100 + '%';
      node.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(node);

      // Create connections (fewer on mobile)
      if (i > 0 && Math.random() > 0.5 && !isMobile) {
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

// ================= CREATE PARTICLES (BUBBLES) - FIXED FOR MOBILE =================
function createParticles() {
   const container = document.getElementById('particles');
   if (!container) return;
   
   // Create MORE particles for mobile to ensure visibility
   const particleCount = isMobile ? 40 : 50;

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
         particle.style.opacity = '0.6';
         particle.style.animationDuration = (12 + Math.random() * 6) + 's';
      }
      
      container.appendChild(particle);
   }
}

// ================= SCHEDULE TAB FUNCTIONALITY =================
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

// ================= MOBILE MENU TOGGLE =================
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

// ================= TIMELINE ITEM TOGGLE =================
function toggleTimelineItem(item) {
   item.classList.toggle('expanded');
}

// ================= SMOOTH SCROLLING =================
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

// ================= UPDATE ACTIVE MENU ITEMS ON SCROLL =================
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

// ================= HEADER SCROLL EFFECT =================
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

// ================= INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =================
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

// ================= INITIALIZE SCROLL ANIMATIONS =================
function initScrollAnimations() {
   // Add animation classes to elements
   document.querySelectorAll('.section h2').forEach(heading => {
      heading.classList.add('animate-on-scroll');
   });

   document.querySelectorAll('.timeline-item').forEach((item, index) => {
      item.style.setProperty('--stagger', index + 1);
      item.classList.add('stagger-animation');
   });

   // Observe all animation elements
   document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
   });
}

// ================= ADD HEXAGONAL DECORATIONS =================
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

// ================= CHECK AND UPDATE MOBILE STATUS =================
function checkMobileStatus() {
   isMobile = window.innerWidth <= 768;
   
   // Recreate particles on resize for better mobile experience
   const particlesContainer = document.getElementById('particles');
   if (particlesContainer && particlesContainer.children.length === 0) {
      createParticles();
   }
}

// ================= INITIALIZE EVERYTHING =================
window.addEventListener('load', () => {
   // Check if mobile
   checkMobileStatus();
   
   // Initialize animations
   animateCounters();
   createNeuralNetwork();
   createParticles(); // ALWAYS create particles for mobile too
   initScrollAnimations();
   addHexDecorations();
   
   // Setup resize listener
   window.addEventListener('resize', checkMobileStatus);
});

// ================= EXPORT FUNCTIONS =================
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.showSchedule = showSchedule;
window.toggleTimelineItem = toggleTimelineItem;
