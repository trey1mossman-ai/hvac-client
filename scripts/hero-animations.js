/**
 * Hero Section Animations
 * Handles scrolling text animation and smooth interactions
 */

(function() {
    'use strict';
    
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initScrollingText();
        initSmoothScrolling();
        initButtonAnimations();
        initFormAnimations();
    });
    
    /**
     * Initialize scrolling text animation
     * Words: RELIABLE → PROFESSIONAL → COURTEOUS
     */
    function initScrollingText() {
        const scrollingTextElement = document.querySelector('.scrolling-text');
        if (!scrollingTextElement) return;
        
        const words = JSON.parse(scrollingTextElement.dataset.words || '[]');
        if (words.length === 0) return;
        
        let currentIndex = 0;
        const wordElement = scrollingTextElement.querySelector('.word');
        
        // Create word elements for smooth transitions
        const wordContainer = document.createElement('div');
        wordContainer.style.position = 'relative';
        wordContainer.style.height = '100%';
        wordContainer.style.width = '100%';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = word;
            span.style.position = 'absolute';
            span.style.left = '50%';
            span.style.transform = 'translateX(-50%)';
            span.style.opacity = index === 0 ? '1' : '0';
            span.style.transition = 'opacity 0.3s ease-out';
            wordContainer.appendChild(span);
        });
        
        scrollingTextElement.innerHTML = '';
        scrollingTextElement.appendChild(wordContainer);
        
        const wordElements = wordContainer.querySelectorAll('.word');
        
        // Rotate words every 3 seconds
        setInterval(() => {
            // Fade out current word
            wordElements[currentIndex].style.opacity = '0';
            
            // Move to next word
            currentIndex = (currentIndex + 1) % words.length;
            
            // Fade in next word
            setTimeout(() => {
                wordElements[currentIndex].style.opacity = '1';
            }, 150);
        }, 3000);
    }
    
    /**
     * Initialize smooth scrolling for anchor links
     */
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;
                
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop;
                const scrollOptions = {
                    top: offsetTop,
                    behavior: 'smooth'
                };
                
                window.scrollTo(scrollOptions);
            });
        });
    }
    
    /**
     * Initialize button hover animations
     */
    function initButtonAnimations() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Add ripple effect on click
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    /**
     * Initialize form field animations
     */
    function initFormAnimations() {
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, select');
            if (!input) return;
            
            // Add focus animation
            input.addEventListener('focus', function() {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    group.classList.remove('focused');
                }
            });
            
            // Check if field has value on load
            if (input.value) {
                group.classList.add('focused');
            }
        });
    }
    
    /**
     * Performance optimization: Use requestAnimationFrame for scroll events
     */
    let ticking = false;
    function requestTick(callback) {
        if (!ticking) {
            requestAnimationFrame(callback);
            ticking = true;
        }
    }
    
    /**
     * Add parallax effect to hero background (optional enhancement)
     */
    window.addEventListener('scroll', function() {
        requestTick(function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            
            if (hero && scrolled < hero.offsetHeight) {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                hero.style.transform = `translateY(${yPos}px)`;
            }
            
            ticking = false;
        });
    });
    
})();

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .form-group.focused label {
        transform: translateY(-25px) scale(0.85);
        color: var(--olive-green);
    }
`;
document.head.appendChild(style);