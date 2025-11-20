/* JavaScript Document

TemplateMo 601 Chain Summit

https://templatemo.com/tm-601-chain-summit

*/


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

// Countdown timer
function updateCountdown() {
   const eventDate = new Date('2026-11-14T09:00:00');
   const now = new Date();
   const diff = eventDate - now;

   if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = days.toString().padStart(2, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
   }
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

// Schedule tab functionality
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

// Email functionality for contact form
async function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.contact-submit-btn');
    const messageDiv = document.getElementById('contactFormMessage');
    
    // Get form data
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value,
        timestamp: new Date().toLocaleString()
    };
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    messageDiv.textContent = '';
    messageDiv.className = 'form-message';
    
    try {
        // Send email using EmailJS (you'll need to set up an account)
        await sendContactEmail(formData);
        
        // Success message
        messageDiv.textContent = 'Thank you! Your message has been sent successfully.';
        messageDiv.className = 'form-message success';
        form.reset();
        
    } catch (error) {
        // Error message
        console.error('Error sending email:', error);
        messageDiv.textContent = 'Sorry, there was an error sending your message. Please try again.';
        messageDiv.className = 'form-message error';
    } finally {
        // Reset button
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    }
}

// Function to send email using EmailJS
async function sendContactEmail(formData) {
    // Method 1: Using EmailJS (Recommended)
    // You'll need to sign up at https://emailjs.com and get your credentials
    
    // Uncomment and configure this section after setting up EmailJS
    /*
    const emailParams = {
        to_email: 'khalid@kalops.it.com',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: formData.timestamp
    };
    
    // Initialize EmailJS with your Public Key
    emailjs.init("YOUR_PUBLIC_KEY_HERE");
    
    // Send email using your Service ID and Template ID
    return await emailjs.send(
        "YOUR_SERVICE_ID_HERE",
        "YOUR_TEMPLATE_ID_HERE",
        emailParams
    );
    */
    
    // Method 2: Using Formspree (Alternative - no coding required)
    // Change the form action to: action="https://formspree.io/f/YOUR_FORM_ID"
    // And remove the onsubmit handler
    
    // Method 3: Simple fetch to a server endpoint (if you have a backend)
    // return await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    // });
    
    // For now, we'll simulate a successful send
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Email would be sent to khalid@kalops.it.com with:', formData);
            resolve({ status: 200, text: 'OK' });
        }, 1000);
    });
}

// Handle email submission
function handleEmailSubmit(event) {
   event.preventDefault();

   const emailInput = document.getElementById('emailInput');
   const formMessage = document.getElementById('formMessage');
   const email = emailInput.value;

   // Simulate form submission (in a real scenario, this would send to a server)
   if (email) {
      // Show success message
      formMessage.textContent = 'Thank you for signing up! We\'ll keep you updated on Chain Summit.';
      formMessage.className = 'form-message success';
      formMessage.style.display = 'block';

      // Clear the input
      emailInput.value = '';

      // Hide message after 5 seconds
      setTimeout(() => {
         formMessage.style.display = 'none';
      }, 5000);
   } else {
      // Show error message
      formMessage.textContent = 'Please enter a valid email address.';
      formMessage.className = 'form-message error';
      formMessage.style.display = 'block';

      // Hide message after 3 seconds
      setTimeout(() => {
         formMessage.style.display = 'none';
      }, 3000);
   }
}

// Initialize everything when page loads
window.addEventListener('load', () => {
   animateCounters();
   createNeuralNetwork();
   createParticles();
   updateCountdown();
   initScrollAnimations();
   addHexDecorations();

   // Update countdown every second
   setInterval(updateCountdown, 1000);
});
