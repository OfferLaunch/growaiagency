// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const playbookForm = document.getElementById('playbookForm');
const formMessage = document.getElementById('formMessage');

// Active Navigation Detection
function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Determine which page we're on and set active class
    if (currentPath === '/' || currentPath === '/index.html' || currentPath === '/index') {
        // Home page
        const homeLink = document.querySelector('.nav-menu a[href="/"]');
        if (homeLink) homeLink.classList.add('active');
    } else if (currentPath.includes('process')) {
        const processLink = document.querySelector('.nav-menu a[href*="process"]');
        if (processLink) processLink.classList.add('active');
    } else if (currentPath.includes('software')) {
        const softwareLink = document.querySelector('.nav-menu a[href*="software"]');
        if (softwareLink) softwareLink.classList.add('active');
    } else if (currentPath.includes('resources') || currentPath.includes('/blog/')) {
        const resourcesLink = document.querySelector('.nav-menu a[href*="resources"]');
        if (resourcesLink) resourcesLink.classList.add('active');
    } else if (currentPath.includes('case-studies')) {
        const caseStudiesLink = document.querySelector('.nav-menu a[href="/case-studies/"]');
        if (caseStudiesLink) caseStudiesLink.classList.add('active');
    } else if (currentPath.includes('about')) {
        const aboutLink = document.querySelector('.nav-menu a[href*="about"]');
        if (aboutLink) aboutLink.classList.add('active');
    } else if (currentPath.includes('team')) {
        const teamLink = document.querySelector('.nav-menu a[href*="team"]');
        if (teamLink) teamLink.classList.add('active');
    }
}

// Initialize AOS (Animate On Scroll) - Will be loaded asynchronously
// AOS initialization is now handled in the performance optimization script

// Set active navigation on page load
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavigation();
});

// Mobile Menu Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on a link (but allow navigation)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Only close menu for internal links, not external ones
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                // Small delay to allow navigation to start
                setTimeout(() => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }, 100);
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form handling
if (playbookForm) {
    playbookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
            showMessage('Please enter your email address.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showMessage('Thank you! Your playbook is being sent to your email.', 'success');
        this.reset();
        
        // Track conversion (if analytics is set up)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'engagement',
                'event_label': 'playbook_download'
            });
        }
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showMessage('Thank you! We\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .result-item, .step, .case-study-card, .resource-card').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section - DISABLED to prevent interference with Silk background
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const heroBackground = document.querySelector('.hero-background');
//     
//     if (heroBackground) {
//         heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// Stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .result-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    statsObserver.observe(statsSection);
}

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effect - DISABLED to prevent interference with Silk background
    // const scrolled = window.pageYOffset;
    // const heroBackground = document.querySelector('.hero-background');
    // if (heroBackground) {
    //     heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    // }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Focus management for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'assets/images/logos/white and green.png',
        'assets/images/logos/All white.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking (if Google Analytics is loaded)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const text = btn.textContent.trim();
        trackEvent('engagement', 'button_click', text);
    });
});

// Ensure resources button always works
document.addEventListener('DOMContentLoaded', function() {
    const resourcesBtn = document.getElementById('access-resources-btn');
    if (resourcesBtn) {
        resourcesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '/resources';
        });
    }
});

// Track form interactions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const formType = form.classList.contains('playbook-form') ? 'playbook' : 'contact';
        trackEvent('form', 'submit', formType);
    });
});

console.log('Grow AI website loaded successfully!');

