// Minimal JavaScript for enhanced functionality
(function() {
    'use strict';
    
    // Smooth scrolling for anchor links
    function smoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Set focus to target for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        });
    }
    
    // Lazy loading for images (progressive enhancement)
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            const images = document.querySelectorAll('.identity-img');
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    // Hero image parallax effect (minimal, only if motion is not reduced)
    function setupParallax() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (!mediaQuery.matches) {
            const heroImage = document.querySelector('.hero-image');
            
            if (heroImage) {
                let ticking = false;
                
                function updateParallax() {
                    const scrolled = window.pageYOffset;
                    const parallax = scrolled * 0.5;
                    
                    heroImage.style.transform = `translateY(${parallax}px)`;
                    ticking = false;
                }
                
                function requestTick() {
                    if (!ticking) {
                        requestAnimationFrame(updateParallax);
                        ticking = true;
                    }
                }
                
                window.addEventListener('scroll', requestTick);
            }
        }
    }
    
    // Keyboard navigation enhancement
    function enhanceKeyboardNavigation() {
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        }
        
        // Enhanced focus management for image gallery
        const images = document.querySelectorAll('.identity-img');
        images.forEach((img, index) => {
            img.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const nextIndex = e.key === 'ArrowRight' 
                        ? (index + 1) % images.length 
                        : (index - 1 + images.length) % images.length;
                    images[nextIndex].focus();
                }
            });
        });
    }
    
    // Announce page changes for screen readers
    function announcePageChange() {
        const pageTitle = document.title;
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Page loaded: ${pageTitle}`;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            if (announcement.parentNode) {
                announcement.parentNode.removeChild(announcement);
            }
        }, 1000);
    }
    
    // Initialize all functions when DOM is loaded
    function init() {
        smoothScroll();
        setupLazyLoading();
        setupParallax();
        enhanceKeyboardNavigation();
        announcePageChange();
    }
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();