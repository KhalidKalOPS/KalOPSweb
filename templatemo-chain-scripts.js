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

// Create neural network animation
function createNeuralNetwork() {
   const container = document.getElementById('neuralNetwork');
   const nodes = 20;

   for (let i = 0; i < nodes; i++) {
      const node = document.createElement('div');
      node.className = 'node';
      node.style.left = Math.random() * 100 + '%';
      node.style.top = Math.random() * 100 + '%';
      node.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(node);

      // Create connections
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

// Mobile menu toggle
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

// ================= NETLIFY FORM HANDLING - UPDATED =================

// Handle contact form submission (Modified for Netlify)
function handleContactSubmit(event) {
   // Netlify will handle the actual submission
   // We just show a loading state
   const form = event.target;
   const submitBtn = form.querySelector('button[type="submit"]');
   const originalText = submitBtn.textContent;
   
   // Show loading state
   submitBtn.textContent = 'Sending...';
   submitBtn.disabled = true;
   
   // Re-enable button after 8 seconds in case of error
   setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
   }, 8000);
   
   // DO NOT use event.preventDefault() - Let Netlify handle the submission
}

// Handle email submission (Modified for Netlify)
function handleEmailSubmit(event) {
   // Netlify will handle the actual submission
   // We just show a loading state
   const form = event.target;
   const submitBtn = form.querySelector('button[type="submit"]');
   const originalText = submitBtn.textContent;
   
   // Show loading state
   submitBtn.textContent = 'Subscribing...';
   submitBtn.disabled = true;
   
   // Re-enable button after 5 seconds in case of error
   setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
   }, 5000);
   
   // DO NOT use event.preventDefault() - Let Netlify handle the submission
}

// Check for Netlify form success/error messages in URL
function checkNetlifyFormStatus() {
   const urlParams = new URLSearchParams(window.location.search);
   const successParam = urlParams.get('success');
   
   // Find message containers on the page
   const successMsg = document.getElementById('formSuccessMessage');
   const errorMsg = document.getElementById('formErrorMessage');
   const formMessage = document.getElementById('formMessage'); // For newsletter
   
   if (successParam === 'true' && successMsg) {
      successMsg.style.display = 'block';
      // Optional: Clear the form
      const form = document.querySelector('form[name="contact"]');
      if (form) form.reset();
      // Scroll to show the message
      setTimeout(() => {
         if (successMsg.scrollIntoView) {
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
         }
      }, 300);
   } 
   else if (successParam === 'false' && errorMsg) {
      errorMsg.style.display = 'block';
      setTimeout(() => {
         if (errorMsg.scrollIntoView) {
            errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
         }
      }, 300);
   }
   
   // Check for newsletter form success
   if (window.location.pathname.includes('success') && formMessage) {
      formMessage.textContent = 'Thank you for subscribing! We\'ll send you store management tips and updates.';
      formMessage.className = 'form-message success';
      formMessage.style.display = 'block';
   }
}

// Initialize support quick access panel animations
function initSupportPanel() {
   const actionBtns = document.querySelectorAll('.action-btn');
   actionBtns.forEach((btn, index) => {
      btn.style.setProperty('--stagger', index + 1);
      btn.classList.add('stagger-animation');
   });
}

// Initialize everything when page loads
window.addEventListener('load', () => {
   animateCounters();
   createNeuralNetwork();
   createParticles();
   initScrollAnimations();
   addHexDecorations();
   initSupportPanel();
   
   // Check if a Netlify form was just submitted
   checkNetlifyFormStatus();
});
