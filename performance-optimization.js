// Performance Optimization Script
// This script handles lazy loading, resource optimization, and mobile performance

(function() {
    'use strict';
    
    // Lazy loading for images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    }
                });
            });
            
            // Observe all lazy images
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Optimize font loading
    function optimizeFontLoading() {
        // Preload critical fonts
        const fontPreload = document.createElement('link');
        fontPreload.rel = 'preload';
        fontPreload.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap';
        fontPreload.as = 'style';
        fontPreload.crossOrigin = 'anonymous';
        document.head.appendChild(fontPreload);
        
        // Load fonts asynchronously
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap';
        fontLink.media = 'print';
        fontLink.onload = function() {
            this.media = 'all';
        };
        document.head.appendChild(fontLink);
    }
    
    // Optimize CSS loading
    function optimizeCSSLoading() {
        // Load non-critical CSS asynchronously
        const nonCriticalCSS = [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
        ];
        
        nonCriticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = href;
            link.as = 'style';
            link.onload = function() {
                this.rel = 'stylesheet';
            };
            document.head.appendChild(link);
        });
    }
    
    // Optimize JavaScript loading
    function optimizeJSLoading() {
        // Load non-critical scripts after page load
        const nonCriticalScripts = [
            'https://unpkg.com/aos@2.3.1/dist/aos.js'
        ];
        
        nonCriticalScripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        });
    }
    
    // Mobile-specific optimizations
    function optimizeForMobile() {
        if (window.innerWidth <= 768) {
            // Reduce animations on mobile for better performance
            document.documentElement.style.setProperty('--animation-duration', '0.3s');
            
            // Lazy load non-critical sections
            const sections = document.querySelectorAll('.results, .case-studies, .resources');
            if ('IntersectionObserver' in window) {
                const sectionObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('loaded');
                        }
                    });
                }, { rootMargin: '50px' });
                
                sections.forEach(section => {
                    sectionObserver.observe(section);
                });
            }
        }
    }
    
    // Preload critical resources
    function preloadCriticalResources() {
        const criticalResources = [
            { href: 'styles.css?v=1759850000', as: 'style' },
            { href: 'script.js?v=1759850000', as: 'script' }
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.as === 'style') {
                link.onload = function() {
                    this.rel = 'stylesheet';
                };
            }
            document.head.appendChild(link);
        });
    }
    
    // Initialize performance optimizations
    function init() {
        // Run immediately for critical optimizations
        preloadCriticalResources();
        optimizeFontLoading();
        optimizeCSSLoading();
        
        // Run after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initLazyLoading();
                optimizeForMobile();
            });
        } else {
            initLazyLoading();
            optimizeForMobile();
        }
        
        // Run after page load for non-critical optimizations
        window.addEventListener('load', function() {
            optimizeJSLoading();
        });
    }
    
    // Start optimizations
    init();
    
    // Export for use in other scripts
    window.PerformanceOptimizer = {
        initLazyLoading,
        optimizeFontLoading,
        optimizeCSSLoading,
        optimizeJSLoading,
        optimizeForMobile
    };
})();
