/**
 * SupplySide Flooring Installation Chicago
 * Optimized JavaScript for Maximum Conversion
 * Focus: Simplicity, Performance, Mobile Experience
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initFormHandler();
    initMobileMenu();
    initMobileFormModal();
    initStickyHeader();
    initPhoneTracking();
});

/**
 * Simplified Form Handler - Focus on Quick Submission
 */
function initFormHandler() {
    const form = document.getElementById('estimate-form');
    if (!form) return;
    
    const fields = {
        name: form.querySelector('#name'),
        phone: form.querySelector('#phone'),
        service: form.querySelector('#service-type')
    };
    
    // Simple validation patterns
    const patterns = {
        name: /^[a-zA-Z\s]{2,}$/,
        phone: /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/
    };
    
    // Format phone number as user types
    fields.phone.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        e.target.value = value;
    });
    
    // Real-time validation feedback
    Object.entries(fields).forEach(([fieldName, field]) => {
        if (!field) return;
        
        field.addEventListener('blur', function() {
            validateField(fieldName, field, patterns[fieldName]);
        });
        
        // Remove error state on input
        field.addEventListener('input', function() {
            field.classList.remove('error');
            const errorEl = field.nextElementSibling;
            if (errorEl && errorEl.classList.contains('form-error')) {
                errorEl.textContent = '';
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Quick validation
        let isValid = true;
        Object.entries(fields).forEach(([fieldName, field]) => {
            if (!field) return;
            if (!validateField(fieldName, field, patterns[fieldName])) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            // Focus first error field
            const firstError = form.querySelector('.error');
            if (firstError) firstError.focus();
            return;
        }
        
        // Submit form
        await submitForm(form, fields);
    });
}

/**
 * Simple field validation
 */
function validateField(fieldName, field, pattern) {
    const value = field.value.trim();
    const errorEl = field.nextElementSibling;
    
    if (!value) {
        showError(field, errorEl, 'This field is required');
        return false;
    }
    
    if (pattern && !pattern.test(value)) {
        let message = 'Please enter a valid ';
        if (fieldName === 'phone') message += 'phone number';
        else if (fieldName === 'name') message += 'name';
        showError(field, errorEl, message);
        return false;
    }
    
    // Valid
    field.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
    return true;
}

/**
 * Show field error
 */
function showError(field, errorEl, message) {
    field.classList.add('error');
    if (errorEl) errorEl.textContent = message;
}

/**
 * Submit form with loading state
 */
async function submitForm(form, fields) {
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    // Show loading
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Collect data
    const formData = {
        name: fields.name.value.trim(),
        phone: fields.phone.value.trim(),
        service: fields.service.value,
        timestamp: new Date().toISOString(),
        source: 'hero-form',
        page: window.location.pathname
    };
    
    try {
        // Simulate API call (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Track conversion
        trackConversion(formData);
        
        // Show success
        showSuccessState(form);
        
        // Close mobile modal if open
        closeMobileForm();
        
    } catch (error) {
        console.error('Submission error:', error);
        alert('Something went wrong. Please call us at 312-210-0606');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        btnText.textContent = originalText;
    }
}

/**
 * Show success state after form submission
 */
function showSuccessState(form) {
    const formBody = form.querySelector('.form-body');
    const originalContent = formBody.innerHTML;
    
    formBody.innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
            <div style="font-size: 3rem; color: #27ae60; margin-bottom: 1rem;">✓</div>
            <h3 style="font-size: 1.5rem; color: #1C1F2A; margin-bottom: 1rem;">Thank You!</h3>
            <p style="color: #5E5E5E; margin-bottom: 1.5rem;">
                We'll call you within 2 hours during business hours<br>
                or first thing the next business day.
            </p>
            <p style="font-weight: 600;">
                Questions? Call now: 
                <a href="tel:3122100606" style="color: #7A9D54;">312-210-0606</a>
            </p>
        </div>
    `;
    
    // Reset form after 10 seconds
    setTimeout(() => {
        formBody.innerHTML = originalContent;
        form.reset();
        initFormHandler(); // Re-initialize handlers
    }, 10000);
}

/**
 * Mobile Form Modal Handler
 */
function initMobileFormModal() {
    const trigger = document.querySelector('.mobile-form-button');
    const formWrapper = document.querySelector('.hero-form-wrapper');
    
    if (!trigger || !formWrapper) return;
    
    trigger.addEventListener('click', function() {
        openMobileForm();
    });
    
    // Close on background click
    formWrapper.addEventListener('click', function(e) {
        if (e.target === formWrapper) {
            closeMobileForm();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && formWrapper.classList.contains('mobile-form-open')) {
            closeMobileForm();
        }
    });
}

function openMobileForm() {
    const formWrapper = document.querySelector('.hero-form-wrapper');
    formWrapper.classList.add('mobile-form-open');
    document.body.style.overflow = 'hidden';
    
    // Focus first field
    setTimeout(() => {
        const firstField = formWrapper.querySelector('#name');
        if (firstField) firstField.focus();
    }, 300);
}

function closeMobileForm() {
    const formWrapper = document.querySelector('.hero-form-wrapper');
    formWrapper.classList.remove('mobile-form-open');
    document.body.style.overflow = '';
}

/**
 * Mobile Menu Handler
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.header-nav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', function() {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        
        toggle.setAttribute('aria-expanded', !isOpen);
        nav.classList.toggle('mobile-open');
        document.body.classList.toggle('menu-open');
    });
    
    // Close on nav link click
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('mobile-open');
            document.body.classList.remove('menu-open');
        });
    });
}

/**
 * Sticky Header with Smart Hide/Show
 */
function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down - hide
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        }, 50);
    }, { passive: true });
}

/**
 * Phone Number Click Tracking
 */
function initPhoneTracking() {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('phone_click', {
                location: link.closest('.header') ? 'header' : 'hero',
                number: link.getAttribute('href').replace('tel:', '')
            });
        });
    });
}

/**
 * Analytics Tracking Functions
 */
function trackConversion(data) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
            value: 500,
            currency: 'USD',
            service_type: data.service
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: data.service,
            value: 500,
            currency: 'USD'
        });
    }
    
    // Console log for debugging
    console.log('Lead submitted:', data);
}

function trackEvent(eventName, parameters) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    console.log('Event:', eventName, parameters);
}

/**
 * Utility Functions
 */

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (!target) return;
        
        e.preventDefault();
        const headerHeight = 70;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Performance: Lazy load images when they come into view
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});