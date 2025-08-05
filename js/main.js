/* ===================================
   SupplySide Flooring Installation Chicago
   Main JavaScript - Production Version
   Version: 1.0
   Last Updated: August 2025
   =================================== */

(function() {
    'use strict';

    /* ===================================
       MOBILE MENU FUNCTIONALITY
       =================================== */
    const initMobileMenu = () => {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const body = document.body;
        const header = document.querySelector('.header');
        
        if (!toggle || !mobileNav) return;

        // Toggle mobile menu
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = toggle.getAttribute('aria-expanded') === 'true';
            
            toggle.setAttribute('aria-expanded', !isOpen);
            mobileNav.classList.toggle('mobile-nav--open');
            body.classList.toggle('menu-open');
            
            // Announce state change for screen readers
            const announcement = !isOpen ? 'Menu opened' : 'Menu closed';
            announceToScreenReader(announcement);
        });

        // Close menu when clicking on a link
        const mobileLinks = mobileNav.querySelectorAll('.mobile-nav__link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggle.setAttribute('aria-expanded', 'false');
                mobileNav.classList.remove('mobile-nav--open');
                body.classList.remove('menu-open');
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('mobile-nav--open')) {
                toggle.setAttribute('aria-expanded', 'false');
                mobileNav.classList.remove('mobile-nav--open');
                body.classList.remove('menu-open');
                toggle.focus();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileNav.classList.contains('mobile-nav--open') && 
                !mobileNav.contains(e.target) && 
                !toggle.contains(e.target)) {
                toggle.setAttribute('aria-expanded', 'false');
                mobileNav.classList.remove('mobile-nav--open');
                body.classList.remove('menu-open');
            }
        });
    };

    /* ===================================
       STICKY HEADER ON SCROLL
       =================================== */
    const initStickyHeader = () => {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScroll = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Hide/show header based on scroll direction
            if (currentScroll > scrollThreshold) {
                if (currentScroll > lastScroll) {
                    // Scrolling down
                    header.classList.add('header--hidden');
                } else {
                    // Scrolling up
                    header.classList.remove('header--hidden');
                }
            } else {
                header.classList.remove('header--hidden');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    };

    /* ===================================
       FORM VALIDATION & SUBMISSION
       =================================== */
    const initForms = () => {
        const forms = document.querySelectorAll('.lead-form');
        
        forms.forEach(form => {
            const submitBtn = form.querySelector('.btn--submit');
            
            // Real-time validation
            const inputs = form.querySelectorAll('.form__input, .form__select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => {
                    if (input.classList.contains('form__input--error')) {
                        validateField(input);
                    }
                });
            });

            // Form submission
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Validate all fields
                let isValid = true;
                inputs.forEach(input => {
                    if (!validateField(input)) {
                        isValid = false;
                    }
                });

                if (!isValid) {
                    // Focus first error field
                    const firstError = form.querySelector('.form__input--error, .form__select--error');
                    if (firstError) firstError.focus();
                    return;
                }

                // Show loading state
                submitBtn.classList.add('btn--loading');
                submitBtn.disabled = true;

                try {
                    // Collect form data
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);
                    
                    // Track form submission
                    if (window.gtag) {
                        window.gtag('event', 'generate_lead', {
                            'event_category': 'engagement',
                            'event_label': data.service || 'general'
                        });
                    }

                    // Here you would send the data to your server
                    // For now, we'll simulate a successful submission
                    await simulateFormSubmission(data);

                    // Success handling
                    showFormSuccess(form);
                    form.reset();
                    
                } catch (error) {
                    console.error('Form submission error:', error);
                    showFormError(form);
                } finally {
                    submitBtn.classList.remove('btn--loading');
                    submitBtn.disabled = false;
                }
            });
        });
    };

    // Field validation
    const validateField = (field) => {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove previous error state
        field.classList.remove('form__input--error', 'form__input--success');
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('form__error')) {
            errorElement.textContent = '';
        }

        // Required field check
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }

        // Specific field validation
        switch (name) {
            case 'email':
                if (value && !isValidEmail(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            case 'phone':
                if (value && !isValidPhone(value)) {
                    errorMessage = 'Please enter a valid phone number';
                    isValid = false;
                }
                break;
            case 'zip':
                if (value && !isValidZip(value)) {
                    errorMessage = 'Please enter a valid ZIP code';
                    isValid = false;
                }
                break;
        }

        // Update field state
        if (!isValid) {
            field.classList.add('form__input--error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
        } else if (value) {
            field.classList.add('form__input--success');
        }

        return isValid;
    };

    // Validation helpers
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const isValidPhone = (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10;
    };

    const isValidZip = (zip) => {
        const re = /^\d{5}(-\d{4})?$/;
        return re.test(zip);
    };

    // Simulate form submission (replace with actual API call)
    const simulateFormSubmission = (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve();
            }, 1500);
        });
    };

    // Show success message
    const showFormSuccess = (form) => {
        const message = document.createElement('div');
        message.className = 'form__success-message';
        message.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
            <span>Thank you! We'll contact you within 24 hours.</span>
        `;
        form.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 5000);
    };

    // Show error message
    const showFormError = (form) => {
        const message = document.createElement('div');
        message.className = 'form__error-message';
        message.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span>Something went wrong. Please try again or call us at (312) 210-0606.</span>
        `;
        form.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 5000);
    };

    /* ===================================
       SCROLLING TEXT ANIMATION
       =================================== */
    const initScrollingText = () => {
        const containers = document.querySelectorAll('.scrolling-text');
        
        containers.forEach(container => {
            const words = ['RELIABLE', 'PROFESSIONAL', 'COURTEOUS'];
            let currentIndex = 0;
            
            // Create word element
            const wordElement = document.createElement('span');
            wordElement.className = 'scrolling-text__word';
            wordElement.textContent = words[currentIndex];
            container.appendChild(wordElement);
            
            // Rotate words
            setInterval(() => {
                wordElement.style.opacity = '0';
                
                setTimeout(() => {
                    currentIndex = (currentIndex + 1) % words.length;
                    wordElement.textContent = words[currentIndex];
                    wordElement.style.opacity = '1';
                }, 300);
            }, 3000);
        });
    };

    /* ===================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       =================================== */
    const initSmoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if it's just #
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (!target) return;
                
                e.preventDefault();
                
                // Calculate scroll position (account for sticky header)
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            });
        });
    };

    /* ===================================
       FAQ ACCORDION
       =================================== */
    const initFAQ = () => {
        const faqs = document.querySelectorAll('.faq');
        
        faqs.forEach(faq => {
            const question = faq.querySelector('.faq__question');
            const answer = faq.querySelector('.faq__answer');
            
            if (!question || !answer) return;
            
            question.addEventListener('click', () => {
                const isOpen = question.getAttribute('aria-expanded') === 'true';
                
                // Close all other FAQs in the same container
                const container = faq.closest('.faq-container');
                if (container) {
                    container.querySelectorAll('.faq__question').forEach(q => {
                        q.setAttribute('aria-expanded', 'false');
                        q.nextElementSibling.classList.remove('faq__answer--open');
                    });
                }
                
                // Toggle current FAQ
                question.setAttribute('aria-expanded', !isOpen);
                answer.classList.toggle('faq__answer--open');
            });
        });
    };

    /* ===================================
       PHONE NUMBER FORMATTING
       =================================== */
    const initPhoneFormatting = () => {
        const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="phone"]');
        
        phoneInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 0) {
                    if (value.length <= 3) {
                        value = `(${value}`;
                    } else if (value.length <= 6) {
                        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                    } else if (value.length <= 10) {
                        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
                    } else {
                        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                    }
                }
                
                e.target.value = value;
            });
        });
    };

    /* ===================================
       LAZY LOADING IMAGES
       =================================== */
    const initLazyLoading = () => {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            });
        }
    };

    /* ===================================
       SCREEN READER ANNOUNCEMENTS
       =================================== */
    const announceToScreenReader = (message) => {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            announcement.remove();
        }, 1000);
    };

    /* ===================================
       ANALYTICS TRACKING
       =================================== */
    const initAnalytics = () => {
        // Track phone clicks
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.gtag) {
                    window.gtag('event', 'click', {
                        'event_category': 'engagement',
                        'event_label': 'phone_call',
                        'value': link.getAttribute('href')
                    });
                }
            });
        });

        // Track CTA clicks
        const ctaButtons = document.querySelectorAll('.btn--primary, .btn--phone');
        ctaButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (window.gtag) {
                    window.gtag('event', 'click', {
                        'event_category': 'engagement',
                        'event_label': 'cta_click',
                        'value': button.textContent
                    });
                }
            });
        });
    };

    /* ===================================
       PERFORMANCE MONITORING
       =================================== */
    const initPerformanceMonitoring = () => {
        // Log page load performance
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                console.log(`Page load time: ${pageLoadTime}ms`);
                
                // Send to analytics if available
                if (window.gtag && pageLoadTime > 0) {
                    window.gtag('event', 'timing_complete', {
                        'name': 'load',
                        'value': pageLoadTime,
                        'event_category': 'performance'
                    });
                }
            }
        });
    };

    /* ===================================
       INITIALIZE ALL MODULES
       =================================== */
    const init = () => {
        // Core functionality
        initMobileMenu();
        initStickyHeader();
        initForms();
        initScrollingText();
        initSmoothScroll();
        initFAQ();
        initPhoneFormatting();
        initLazyLoading();
        initAnalytics();
        initPerformanceMonitoring();
        
        // Add loaded class to body
        document.body.classList.add('js-loaded');
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose some functions globally if needed
    window.SupplySide = {
        validateForm: (formElement) => {
            const event = new Event('submit', {
                bubbles: true,
                cancelable: true
            });
            formElement.dispatchEvent(event);
        },
        announceToScreenReader
    };

})();