/* JavaScript Document

TemplateMo 601 Chain Summit - HEAVILY OPTIMIZED FOR MOBILE

https://templatemo.com/tm-601-chain-summit

*/

// ================= URL FIX =================
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
let lastScrollTop = 0;
let ticking = false;

// ================= SIMPLE COUNTERS =================
function animateCounters() {
   const counters = document.querySelectorAll('.stat-number');
   counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target')) || 100;
      counter.textContent = target;
   });
}

// ================= SIMPLE NEURAL NETWORK =================
function createNeuralNetwork() {
   if (isMobile) return; // Skip on mobile for performance
   
   const container = document.getElementById('neuralNetwork');
   if (!container) return;
   
   const nodes = 10;
   container.innerHTML = '';

   for (let i = 0; i < nodes; i++) {
      const node = document.createElement('div');
      node.className = 'node';
      node.style.left = Math.random() * 100 + '%';
      node.style.top = Math.random() * 100 + '%';
      container.appendChild(node);
   }
}

// ================= SIMPLE PARTICLES =================
function createParticles() {
   if (isMobile) return; // Skip on mobile for performance
   
   const container = document.getElementById('particles');
   if (!container) return;
   
   const particleCount = 15;
   container.innerHTML = '';

   for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      container.appendChild(particle);
   }
}

// ================= MOBILE MENU =================
function toggleMenu() {
   const mobileMenu = document.querySelector('.mobile-menu');
   const mobileNav = document.getElementById('mobileNav');
   
   if (!mobileMenu || !mobileNav) return;
   
   mobileMenu.classList.toggle('active');
   mobileNav.classList.toggle('active');
   
   document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

function closeMenu() {
   const mobileMenu = document.querySelector('.mobile-menu');
   const mobileNav = document.getElementById('mobileNav');
   
   if (mobileMenu) mobileMenu.classList.remove('active');
   if (mobileNav) mobileNav.classList.remove('active');
   
   document.body.style.overflow = '';
}

// ================= SCHEDULE TABS =================
function showSchedule(day, event) {
   if (event) event.preventDefault();
   
   const scheduleContents = document.querySelectorAll('.schedule-content');
   scheduleContents.forEach(content => {
      content.classList.remove('active');
   });

   const tabBtns = document.querySelectorAll('.tab-btn');
   tabBtns.forEach(tab => {
      tab.classList.remove('active');
   });

   const selectedDay = document.getElementById(day);
   if (selectedDay) {
      selectedDay.classList.add('active');
   }
   
   if (event && event.target) {
      event.target.classList.add('active');
   }
}

// ================= TIMELINE TOGGLE =================
function toggleTimelineItem(item) {
   if (!item) return;
   
   const details = item.querySelector('.timeline-details');
   const isExpanded = item.classList.contains('expanded');
   
   if (isExpanded) {
      details.style.maxHeight = '0';
      item.classList.remove('expanded');
   } else {
      details.style.maxHeight = details.scrollHeight + 'px';
      item.classList.add('expanded');
   }
}

// ================= SMOOTH SCROLL =================
function smoothScroll(targetId) {
   const target = document.querySelector(targetId);
   if (!target) return;
   
   const targetPosition = target.offsetTop - 80;
   const startPosition = window.pageYOffset;
   const distance = targetPosition - startPosition;
   
   if (Math.abs(distance) < 100) {
      window.scrollTo(0, targetPosition);
      return;
   }
   
   const duration = 400;
   let start = null;
   
   function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      const ease = percentage * (2 - percentage); // easeOutQuad
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (progress < duration) {
         window.requestAnimationFrame(step);
      }
   }
   
   window.requestAnimationFrame(step);
   closeMenu();
}

// ================= SETUP EVENT LISTENERS =================
function setupEventListeners() {
   // Smooth scrolling for anchor links
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
         const href = this.getAttribute('href');
         if (href === '#' || href === '#!') return;
         
         e.preventDefault();
         smoothScroll(href);
      });
   });
   
   // Timeline item clicks
   document.addEventListener('click', function(e) {
      if (e.target.closest('.timeline-header')) {
         const timelineItem = e.target.closest('.timeline-item');
         if (timelineItem) {
            toggleTimelineItem(timelineItem);
         }
      }
      
      // Tab button clicks
      if (e.target.closest('.tab-btn')) {
         const tabBtn = e.target.closest('.tab-btn');
         const tabId = tabBtn.getAttribute('onclick')?.match(/showSchedule\('([^']+)'/)?.[1];
         if (tabId) {
            showSchedule(tabId, e);
         }
      }
      
      // Close mobile menu when clicking outside
      if (isMobile && !e.target.closest('.mobile-menu') && !e.target.closest('.mobile-nav')) {
         closeMenu();
      }
   });
   
   // Optimized scroll handler
   window.addEventListener('scroll', function() {
      if (!ticking) {
         window.requestAnimationFrame(function() {
            updateHeaderOnScroll();
            ticking = false;
         });
         ticking = true;
      }
   });
   
   // Touch event optimization
   if ('ontouchstart' in window) {
      document.addEventListener('touchstart', function() {}, {passive: true});
      document.addEventListener('touchmove', function() {}, {passive: true});
   }
}

// ================= HEADER SCROLL EFFECT =================
function updateHeaderOnScroll() {
   const header = document.querySelector('header');
   if (!header) return;
   
   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
   
   if (scrollTop > 50) {
      header.style.background = 'rgba(10, 10, 15, 0.98)';
   } else {
      header.style.background = 'rgba(10, 10, 15, 0.95)';
   }
   
   lastScrollTop = scrollTop;
}

// ================= INITIALIZE PAGE =================
function initPage() {
   isMobile = window.innerWidth <= 768;
   
   // Only run animations on desktop
   if (!isMobile) {
      createNeuralNetwork();
      createParticles();
   }
   
   // Initialize counters
   animateCounters();
   
   // Setup event listeners
   setupEventListeners();
   
   // Initial header update
   updateHeaderOnScroll();
   
   // Set initial active schedule tab
   const firstTab = document.querySelector('.tab-btn');
   if (firstTab) {
      const tabId = firstTab.getAttribute('onclick')?.match(/showSchedule\('([^']+)'/)?.[1];
      if (tabId) {
         const scheduleContent = document.getElementById(tabId);
         if (scheduleContent) {
            scheduleContent.classList.add('active');
            firstTab.classList.add('active');
         }
      }
   }
   
   // Expand first timeline item
   const firstTimelineItem = document.querySelector('.timeline-item');
   if (firstTimelineItem) {
      toggleTimelineItem(firstTimelineItem);
   }
}

// ================= INITIALIZE WHEN READY =================
if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', initPage);
} else {
   initPage();
}

// ================= WINDOW RESIZE HANDLER =================
window.addEventListener('resize', function() {
   isMobile = window.innerWidth <= 768;
   
   // Reinitialize animations if switching from mobile to desktop
   if (!isMobile) {
      createNeuralNetwork();
      createParticles();
   }
});

// ================= GLOBAL FUNCTIONS =================
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.showSchedule = showSchedule;
window.toggleTimelineItem = toggleTimelineItem;
