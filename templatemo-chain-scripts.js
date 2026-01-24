/* JavaScript Document - PERFORMANCE OPTIMIZED WITH WEB WORKERS */

// ================= WEB WORKER FOR BACKGROUND ANIMATIONS =================
let animationWorker = null;

function initWebWorker() {
    if (window.Worker) {
        try {
            // Create Web Worker for animations
            const workerCode = `
                let frameId = null;
                let particles = [];
                let nodes = [];
                
                self.onmessage = function(e) {
                    if (e.data.command === 'start') {
                        if (frameId) cancelAnimationFrame(frameId);
                        
                        const { particleCount, nodeCount, isMobile } = e.data;
                        
                        // Initialize particles
                        particles = [];
                        for (let i = 0; i < particleCount; i++) {
                            particles.push({
                                x: Math.random() * 100,
                                y: Math.random() * 100,
                                speed: 0.5 + Math.random() * 1,
                                size: 2 + Math.random() * 2,
                                opacity: 0.2 + Math.random() * 0.3
                            });
                        }
                        
                        // Initialize nodes
                        nodes = [];
                        for (let i = 0; i < nodeCount; i++) {
                            nodes.push({
                                x: Math.random() * 100,
                                y: Math.random() * 100,
                                scale: 1,
                                opacity: 0.2
                            });
                        }
                        
                        // Start animation loop
                        function animate() {
                            // Update particles
                            particles.forEach(p => {
                                p.y -= p.speed * 0.1;
                                if (p.y < -10) {
                                    p.y = 110;
                                    p.x = Math.random() * 100;
                                }
                            });
                            
                            // Update nodes
                            nodes.forEach((n, i) => {
                                n.scale = 0.9 + Math.sin(Date.now() / 1000 + i) * 0.2;
                                n.opacity = 0.1 + Math.sin(Date.now() / 2000 + i) * 0.2;
                            });
                            
                            // Send data back to main thread
                            self.postMessage({
                                particles: particles,
                                nodes: nodes
                            });
                            
                            frameId = requestAnimationFrame(animate);
                        }
                        
                        animate();
                    }
                    
                    if (e.data.command === 'stop') {
                        if (frameId) {
                            cancelAnimationFrame(frameId);
                            frameId = null;
                        }
                    }
                };
            `;
            
            const blob = new Blob([workerCode], { type: 'application/javascript' });
            animationWorker = new Worker(URL.createObjectURL(blob));
            
            animationWorker.onmessage = function(e) {
                updateAnimations(e.data);
            };
            
        } catch (error) {
            console.log('Web Worker not supported, falling back to main thread');
            initMainThreadAnimations();
        }
    } else {
        initMainThreadAnimations();
    }
}

// ================= MAIN THREAD ANIMATIONS (FALLBACK) =================
function initMainThreadAnimations() {
    createNeuralNetwork();
    createParticles();
}

// ================= OPTIMIZED ANIMATION UPDATES =================
let lastFrameTime = 0;
const frameInterval = 1000 / 30; // 30 FPS for mobile, 60 for desktop

function updateAnimations(data) {
    const now = Date.now();
    if (now - lastFrameTime < frameInterval) return;
    lastFrameTime = now;
    
    // Update particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer && data.particles) {
        particlesContainer.innerHTML = '';
        data.particles.forEach(p => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = p.x + '%';
            particle.style.top = p.y + '%';
            particle.style.width = p.size + 'px';
            particle.style.height = p.size + 'px';
            particle.style.opacity = p.opacity;
            particlesContainer.appendChild(particle);
        });
    }
    
    // Update nodes
    const neuralContainer = document.getElementById('neuralNetwork');
    if (neuralContainer && data.nodes) {
        neuralContainer.innerHTML = '';
        data.nodes.forEach(n => {
            const node = document.createElement('div');
            node.className = 'node';
            node.style.left = n.x + '%';
            node.style.top = n.y + '%';
            node.style.transform = `scale(${n.scale})`;
            node.style.opacity = n.opacity;
            neuralContainer.appendChild(node);
        });
    }
}

// ================= PERFORMANCE MONITOR =================
let performanceMonitor = {
    fps: 60,
    lastFrame: Date.now(),
    frames: 0,
    
    start: function() {
        setInterval(() => {
            const now = Date.now();
            this.fps = Math.round((this.frames * 1000) / (now - this.lastFrame));
            this.lastFrame = now;
            this.frames = 0;
            
            // Adjust animation quality based on FPS
            if (this.fps < 30 && window.innerWidth <= 768) {
                reduceAnimationQuality();
            }
        }, 1000);
    },
    
    recordFrame: function() {
        this.frames++;
    }
};

function reduceAnimationQuality() {
    // Reduce particle count
    const particles = document.querySelectorAll('.particle');
    if (particles.length > 15) {
        for (let i = 15; i < particles.length; i++) {
            particles[i].style.display = 'none';
        }
    }
    
    // Reduce animation complexity
    document.querySelectorAll('.node, .connection').forEach(el => {
        el.style.animationDuration = '8s';
    });
}

// ================= OPTIMIZED INITIALIZATION =================
let isMobile = window.innerWidth <= 768;
let isInitialized = false;

function initPage() {
    if (isInitialized) return;
    isInitialized = true;
    
    isMobile = window.innerWidth <= 768;
    
    // Start performance monitor
    performanceMonitor.start();
    
    // Initialize Web Worker for animations
    initWebWorker();
    
    if (animationWorker) {
        // Use Web Worker for smooth animations
        animationWorker.postMessage({
            command: 'start',
            particleCount: isMobile ? 20 : 40,
            nodeCount: isMobile ? 8 : 15,
            isMobile: isMobile
        });
    } else {
        // Fallback to main thread
        initMainThreadAnimations();
    }
    
    // Setup event listeners
    setupEventListeners();
    
    // Initial animations
    animateCounters();
    initScrollAnimations();
}

// ================= OPTIMIZED EVENT LISTENERS =================
let scrollTimeout;
let resizeTimeout;

function setupEventListeners() {
    // Optimized scroll handler
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                updateHeaderOnScroll();
                updateActiveMenuItem();
                scrollTimeout = null;
            }, 100);
        }
    }, { passive: true });
    
    // Optimized resize handler
    window.addEventListener('resize', () => {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(() => {
                isMobile = window.innerWidth <= 768;
                resizeTimeout = null;
            }, 250);
        }
    }, { passive: true });
    
    // Touch events optimization
    if ('ontouchstart' in window) {
        document.addEventListener('touchstart', () => {}, { passive: true });
        document.addEventListener('touchmove', () => {}, { passive: true });
    }
    
    // Click events
    document.addEventListener('click', (e) => {
        if (e.target.closest('.mobile-menu')) {
            toggleMenu();
        }
        
        if (e.target.closest('.mobile-nav a')) {
            closeMenu();
        }
        
        if (e.target.closest('.timeline-header')) {
            toggleTimelineItem(e.target.closest('.timeline-item'));
        }
        
        if (e.target.closest('.tab-btn')) {
            const tabBtn = e.target.closest('.tab-btn');
            const tabId = tabBtn.getAttribute('onclick')?.match(/showSchedule\('([^']+)'/)?.[1];
            if (tabId) showSchedule(tabId, e);
        }
    }, { passive: true });
}

// ================= EXISTING FUNCTIONS (OPTIMIZED) =================
function createNeuralNetwork() {
    const container = document.getElementById('neuralNetwork');
    if (!container || animationWorker) return;
    
    const nodes = isMobile ? 8 : 15;
    
    for (let i = 0; i < nodes; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(node);
    }
}

function createParticles() {
    const container = document.getElementById('particles');
    if (!container || animationWorker) return;
    
    const particleCount = isMobile ? 20 : 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (20 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target')) || 100;
        counter.textContent = target;
    });
}

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

function showSchedule(day, event) {
    if (event) event.preventDefault();
    
    document.querySelectorAll('.schedule-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const selectedDay = document.getElementById(day);
    if (selectedDay) selectedDay.classList.add('active');
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

function toggleTimelineItem(item) {
    if (!item) return;
    
    const details = item.querySelector('.timeline-details');
    if (item.classList.contains('expanded')) {
        details.style.maxHeight = '0';
        item.classList.remove('expanded');
    } else {
        details.style.maxHeight = details.scrollHeight + 'px';
        item.classList.add('expanded');
    }
}

function updateHeaderOnScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 15, 0.98)';
    } else {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
    }
}

function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            performanceMonitor.recordFrame();
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

function initScrollAnimations() {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ================= CLEANUP =================
function cleanup() {
    if (animationWorker) {
        animationWorker.postMessage({ command: 'stop' });
        animationWorker.terminate();
    }
    
    if (scrollTimeout) clearTimeout(scrollTimeout);
    if (resizeTimeout) clearTimeout(resizeTimeout);
    
    observer.disconnect();
}

// ================= INITIALIZE =================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

window.addEventListener('beforeunload', cleanup);
window.addEventListener('unload', cleanup);

// ================= EXPORT FUNCTIONS =================
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.showSchedule = showSchedule;
window.toggleTimelineItem = toggleTimelineItem;
