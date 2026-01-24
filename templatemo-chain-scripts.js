/* JavaScript Document

TemplateMo 601 Chain Summit - MODIFIED FOR KalOPS & NETLIFY FORMS
OPTIMIZED FOR MOBILE PERFORMANCE

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

// Performance optimizations for mobile
let isMobile = window.innerWidth <= 768;
let animationFrameId = null;

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized counter animation
function animateCounters() {
    if (isMobile) return; // Skip on mobile for performance
    
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target')) || 100;
        const duration = 1500; // Reduced duration
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        } else {
            updateCounter();
        }
    });
}

// Optimized neural network animation - reduced for mobile
function createNeuralNetwork() {
    const container = document.getElementById('neuralNetwork');
    if (!container) return;
    
    const nodes = isMobile ? 8 : 15; // Reduced nodes on mobile
    
    for (let i = 0; i < nodes; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(node);
    }
}

// Optimized particles - reduced for mobile
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = isMobile ? 15 : 30; // Reduced particles on mobile
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        container.appendChild(particle);
    }
}

// Schedule tab functionality - OPTIMIZED
function showSchedule(day, event) {
    if (event) event.preventDefault();
    
    // Hide all schedule content
    const scheduleContents = document.querySelectorAll('.schedule-content');
    scheduleContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected day and activate tab
    const selectedDay = document.getElementById(day);
    if (selectedDay) {
        selectedDay.classList.add('active');
    }
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Mobile menu toggle - OPTIMIZED
function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!mobileMenu || !mobileNav) return;
    
    mobileMenu.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    
    // Close menu when clicking outside on mobile
    if (mobileNav.classList.contains('active') && isMobile) {
        setTimeout(() => {
            document.addEventListener('click', closeMenuOnClickOutside);
        }, 10);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

function closeMenuOnClickOutside(event) {
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileNav || !mobileMenu) return;
    
    if (!mobileNav.contains(event.target) && !mobileMenu.contains(event.target)) {
        closeMenu();
    }
}

function closeMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileNav) mobileNav.classList.remove('active');
    
    document.body.style.overflow = '';
    document.removeEventListener('click', closeMenuOnClickOutside);
}

// Timeline item toggle
function toggleTimelineItem(item) {
    if (!item) return;
    item.classList.toggle('expanded');
}

// Optimized smooth scrolling
function smoothScroll(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 500;
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            smoothScroll(href);
            closeMenu();
        });
    });
}

// Optimized active menu items on scroll
function updateActiveMenuItem() {
    if (isMobile) return; // Less frequent updates on mobile
    
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    // Update desktop menu
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });

    // Update mobile menu
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Optimized header scroll effect
function updateHeaderOnScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    } else {
        header.style.background = 'rgba(10, 10, 15, 0.9)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
    }
}

// Intersection Observer for scroll animations - OPTIMIZED
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Initialize scroll animations - OPTIMIZED
function initScrollAnimations() {
    // Add animation classes to elements
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Performance optimization: Remove heavy animations on mobile
function optimizeForMobile() {
    if (!isMobile) return;
    
    // Reduce animation complexity
    const animatedElements = document.querySelectorAll('*[style*="animation"], *[class*="animate"]');
    animatedElements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.animationName && style.animationName !== 'none') {
            el.style.animationDuration = '0.5s';
        }
    });
    
    // Disable parallax or heavy effects
    const bgAnimation = document.querySelector('.bg-animation');
    if (bgAnimation) {
        bgAnimation.style.display = 'none';
    }
}

// Initialize everything when page loads - OPTIMIZED
function initPage() {
    // Check if mobile
    isMobile = window.innerWidth <= 768;
    
    // Initialize components
    setupSmoothScrolling();
    initScrollAnimations();
    optimizeForMobile();
    
    // Initialize animations (reduced on mobile)
    if (!isMobile) {
        createNeuralNetwork();
        createParticles();
    }
    
    // Setup event listeners
    setupEventListeners();
    
    // Initial updates
    updateHeaderOnScroll();
    updateActiveMenuItem();
}

// Setup event listeners with debouncing/throttling
function setupEventListeners() {
    // Debounced scroll events
    window.addEventListener('scroll', debounce(() => {
        updateHeaderOnScroll();
        updateActiveMenuItem();
        
        // Cancel any pending animation frame
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        animationFrameId = requestAnimationFrame(() => {
            // Any frame-based updates
        });
    }, 100));
    
    // Throttled resize events
    window.addEventListener('resize', throttle(() => {
        isMobile = window.innerWidth <= 768;
        optimizeForMobile();
    }, 250));
    
    // Click events
    document.addEventListener('click', (e) => {
        // Handle timeline item clicks
        if (e.target.closest('.timeline-header')) {
            const timelineItem = e.target.closest('.timeline-item');
            if (timelineItem) {
                toggleTimelineItem(timelineItem);
            }
        }
        
        // Handle tab button clicks
        if (e.target.closest('.tab-btn')) {
            const tabBtn = e.target.closest('.tab-btn');
            const tabId = tabBtn.getAttribute('onclick')?.match(/showSchedule\('([^']+)'/)?.[1];
            if (tabId) {
                showSchedule(tabId, e);
            }
        }
    });
    
    // Touch events for mobile
    if (isMobile) {
        document.addEventListener('touchstart', function() {}, {passive: true});
        document.addEventListener('touchmove', function() {}, {passive: true});
    }
}

// Cleanup function
function cleanup() {
    if (observer) {
        observer.disconnect();
    }
    
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    document.removeEventListener('click', closeMenuOnClickOutside);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

// Cleanup on page unload
window.addEventListener('beforeunload', cleanup);
window.addEventListener('unload', cleanup);

// Export functions for global access (if needed)
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.showSchedule = showSchedule;
window.toggleTimelineItem = toggleTimelineItem;
