/* JavaScript Document

TemplateMo 601 Chain Summit - MODIFIED FOR KalOPS
FIXED FOR MOBILE PERFORMANCE AND ANIMATIONS

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
let lastScrollTop = 0;
let scrollTimeout;

// ================= DEBOUNCE FUNCTION =================
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

// ================= THROTTLE FUNCTION =================
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

// ================= PERFORMANCE OPTIMIZED COUNTERS =================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;
    
    counters.forEach(counter => {
        if (isMobile) {
            counter.textContent = counter.getAttribute('data-target') || '100';
            return;
        }
        
        const target = parseInt(counter.getAttribute('data-target')) || 100;
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 30);
    });
}

// ================= FIXED BACKGROUND ANIMATIONS FOR MOBILE =================
function createNeuralNetwork() {
    const container = document.getElementById('neuralNetwork');
    if (!container) return;
    
    const nodes = isMobile ? 10 : 20;
    container.innerHTML = '';
    
    for (let i = 0; i < nodes; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(node);
        
        if (i > 0 && Math.random() > 0.6 && !isMobile) {
            const connection = document.createElement('div');
            connection.className = 'connection';
            connection.style.left = Math.random() * 100 + '%';
            connection.style.top = Math.random() * 100 + '%';
            connection.style.width = Math.random() * 150 + 30 + 'px';
            connection.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(connection);
        }
    }
}

// ================= FIXED PARTICLES FOR MOBILE (BUBBLES) =================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = isMobile ? 20 : 50;
    container.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.setProperty('--random-x', Math.random());
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        if (i % 3 === 0) {
            particle.style.width = '3px';
            particle.style.height = '3px';
        } else if (i % 5 === 0) {
            particle.style.width = '2px';
            particle.style.height = '2px';
        }
        
        container.appendChild(particle);
    }
}

// ================= MOBILE MENU FIXES =================
function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!mobileMenu || !mobileNav) return;
    
    mobileMenu.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    
    if (mobileNav.classList.contains('active') && isMobile) {
        setTimeout(() => {
            document.addEventListener('click', closeMenuOnClickOutside);
            document.addEventListener('touchstart', closeMenuOnClickOutside);
        }, 10);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
        document.removeEventListener('touchstart', closeMenuOnClickOutside);
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
    document.removeEventListener('touchstart', closeMenuOnClickOutside);
}

// ================= SCHEDULE TAB FUNCTIONALITY =================
function showSchedule(day, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
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

// ================= TIMELINE ITEM TOGGLE =================
function toggleTimelineItem(item) {
    if (!item) return;
    item.classList.toggle('expanded');
}

// ================= OPTIMIZED SMOOTH SCROLLING =================
function smoothScroll(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    
    if (Math.abs(distance) < 100) return;
    
    let start = null;
    const duration = 500;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * easeProgress);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    requestAnimationFrame(animation);
    closeMenu();
}

// ================= SETUP SMOOTH SCROLLING =================
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            smoothScroll(href);
        });
    });
}

// ================= ACTIVE MENU ITEMS ON SCROLL =================
function updateActiveMenuItem() {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
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

        document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}` || (currentSection === 'home' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }, 100);
}

// ================= HEADER SCROLL EFFECT =================
function updateHeaderOnScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        header.style.background = 'rgba(10, 10, 15, 0.97)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
}

// ================= INTERSECTION OBSERVER FOR ANIMATIONS =================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            if (isMobile) {
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// ================= INITIALIZE SCROLL ANIMATIONS =================
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    
    elementsToAnimate.forEach(el => {
        if (!isMobile || Math.random() > 0.3) {
            observer.observe(el);
        } else {
            el.classList.add('animated');
        }
    });
}

// ================= PERFORMANCE OPTIMIZATIONS =================
function optimizeForMobile() {
    if (!isMobile) return;
    
    // Reduce animation complexity
    const animatedElements = document.querySelectorAll('*[style*="animation"]');
    animatedElements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.animationName && style.animationName !== 'none') {
            el.style.animationDuration = '0.8s';
        }
    });
    
    // Force GPU acceleration for smooth scrolling
    document.querySelectorAll('.tech-circle, .speaker-card, .sponsor-card').forEach(el => {
        el.style.transform = 'translateZ(0)';
    });
}

// ================= INITIALIZE PAGE =================
function initPage() {
    isMobile = window.innerWidth <= 768;
    
    // Initialize components
    setupSmoothScrolling();
    initScrollAnimations();
    optimizeForMobile();
    
    // Initialize background animations (ALWAYS for both desktop and mobile)
    createNeuralNetwork();
    createParticles();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initial updates
    updateHeaderOnScroll();
    updateActiveMenuItem();
}

// ================= SETUP EVENT LISTENERS =================
function setupEventListeners() {
    // Optimized scroll events
    window.addEventListener('scroll', throttle(() => {
        updateHeaderOnScroll();
        updateActiveMenuItem();
    }, 100));
    
    // Optimized resize events
    window.addEventListener('resize', debounce(() => {
        isMobile = window.innerWidth <= 768;
        if (isMobile) {
            optimizeForMobile();
        }
        createNeuralNetwork();
        createParticles();
    }, 250));
    
    // Click events
    document.addEventListener('click', (e) => {
        // Timeline item clicks
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
        
        // Mobile nav links
        if (e.target.closest('.mobile-nav a')) {
            closeMenu();
        }
    });
    
    // Touch events for mobile
    if ('ontouchstart' in window) {
        document.addEventListener('touchstart', function() {}, {passive: true});
        document.addEventListener('touchmove', function() {}, {passive: true});
        
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    // Prevent context menu on mobile
    document.addEventListener('contextmenu', function(e) {
        if (isMobile) {
            e.preventDefault();
        }
    });
}

// ================= CLEANUP FUNCTION =================
function cleanup() {
    if (observer) {
        observer.disconnect();
    }
    
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    document.removeEventListener('click', closeMenuOnClickOutside);
    document.removeEventListener('touchstart', closeMenuOnClickOutside);
}

// ================= INITIALIZE WHEN READY =================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

// ================= CLEANUP ON UNLOAD =================
window.addEventListener('beforeunload', cleanup);
window.addEventListener('unload', cleanup);

// ================= EXPORT FUNCTIONS =================
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.showSchedule = showSchedule;
window.toggleTimelineItem = toggleTimelineItem;
