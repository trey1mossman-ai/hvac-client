// SupplySide Flooring Installation - Main JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const headerCta = document.querySelector('.header-cta');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-active');
            this.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('mobile-active');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // Smooth Scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
    
    // Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: this.name.value,
                phone: this.phone.value,
                email: this.email.value,
                projectType: this['project-type'].value
            };
            
            // Here you would normally send the data to a server
            // For now, we'll show a success message
            console.log('Form submitted:', formData);
            
            // Show success message
            showFormSuccess();
            
            // Reset form
            this.reset();
        });
    }
    
    // Phone number formatting
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = value.slice(0, 3) + '-' + value.slice(3);
                } else {
                    value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            e.target.value = value;
        });
    }
    
    // Gallery hover effect enhancement
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.after').style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.after').style.opacity = '0';
        });
    });
    
    // Testimonial rotation (optional automatic rotation)
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        // Add subtle entrance animation to testimonials as they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const testimonialObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        testimonials.forEach(testimonial => {
            testimonialObserver.observe(testimonial);
        });
    }
    
    // Service cards animation on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1
        });
        
        serviceCards.forEach(card => {
            serviceObserver.observe(card);
        });
    }
    
    // Process steps animation
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length > 0) {
        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.3
        });
        
        processSteps.forEach(step => {
            processObserver.observe(step);
        });
    }
    
    // Trust badges counter animation
    const badges = document.querySelectorAll('.badge');
    const badgeNumbers = ['40+', '500+', '98%', '100%'];
    
    if (badges.length > 0) {
        const badgeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    // Add number animation here if needed
                }
            });
        }, {
            threshold: 0.5
        });
        
        badges.forEach(badge => {
            badgeObserver.observe(badge);
        });
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Click to call tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone call clicks (Google Analytics or other tracking)
            console.log('Phone call initiated:', this.href);
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'Phone Call',
                    'value': this.href
                });
            }
        });
    });
    
    // Form field validation
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
            
            // Email validation
            if (field.type === 'email' && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    field.classList.add('error');
                    isValid = false;
                }
            }
            
            // Phone validation
            if (field.type === 'tel' && field.value) {
                const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
                if (!phoneRegex.test(field.value)) {
                    field.classList.add('error');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    // Show form success message
    function showFormSuccess() {
        const form = document.getElementById('contact-form');
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
            <p>We've received your request and will contact you within 2 hours during business hours.</p>
        `;
        
        form.parentElement.appendChild(successMessage);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    // Exit intent popup (optional)
    let exitIntentShown = false;
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            // Show exit intent popup
            // This would trigger your exit intent modal
            exitIntentShown = true;
        }
    });
    
    // Add CSS classes for animations
    const style = document.createElement('style');
    style.textContent = `
        /* Mobile Navigation Styles */
        .main-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 300px;
            height: 100vh;
            background-color: var(--white);
            box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            transition: right var(--transition-normal);
            z-index: 999;
            padding: 5rem 2rem 2rem;
        }
        
        .main-nav.mobile-active {
            right: 0;
        }
        
        .main-nav.mobile-active ul {
            flex-direction: column;
            gap: 1rem;
        }
        
        .main-nav.mobile-active a {
            display: block;
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        /* Header scroll effects */
        .main-header.scrolled {
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .main-header.hidden {
            transform: translateY(-100%);
        }
        
        .main-header {
            transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        }
        
        /* Animation classes */
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Form validation styles */
        input.error,
        select.error {
            border-color: #e74c3c !important;
        }
        
        .form-success {
            background-color: var(--success-green);
            color: white;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
            margin-top: 1rem;
            animation: slideIn 0.3s ease;
        }
        
        .form-success i {
            font-size: 3rem;
            margin-bottom: 1rem;
            display: block;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Service cards initial state */
        .service-card {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .service-card.animate-in {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.6s ease;
        }
        
        /* Process steps initial state */
        .process-step {
            opacity: 0;
            transform: scale(0.9);
        }
        
        .process-step.animate-in {
            opacity: 1;
            transform: scale(1);
            transition: all 0.6s ease;
        }
    `;
    document.head.appendChild(style);
});

// Utility function for debouncing
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

// Performance optimization for scroll events
let ticking = false;
function requestTick(callback) {
    if (!ticking) {
        window.requestAnimationFrame(callback);
        ticking = true;
    }
}

// Initialize when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    console.log('SupplySide Flooring Website Initialized');
}