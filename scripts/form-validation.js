/**
 * Form Validation Script
 * Client-side validation for the hero section estimate form
 */

(function() {
    'use strict';
    
    // Validation patterns
    const patterns = {
        name: /^[a-zA-Z\s'-]{2,50}$/,
        phone: /^\d{3}-\d{3}-\d{4}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        zipcode: /^\d{5}$/
    };
    
    // Error messages
    const errorMessages = {
        name: 'Please enter a valid name (2-50 characters)',
        phone: 'Please enter a valid phone number (xxx-xxx-xxxx)',
        email: 'Please enter a valid email address',
        zipcode: 'Please enter a valid 5-digit zip code',
        'service-type': 'Please select a service type'
    };
    
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('estimate-form');
        if (!form) return;
        
        // Initialize form validation
        initializeValidation(form);
        
        // Auto-format phone number
        initializePhoneFormatter();
        
        // Initialize form submission
        initializeFormSubmission(form);
    });
    
    /**
     * Initialize form validation
     */
    function initializeValidation(form) {
        const inputs = form.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            // Validate on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Remove error on input
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    clearError(this);
                }
            });
            
            // Special handling for select
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', function() {
                    validateField(this);
                });
            }
        });
    }
    
    /**
     * Validate individual field
     */
    function validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        // Check if field is empty
        if (!fieldValue) {
            showError(field, errorElement, `${field.placeholder || 'This field'} is required`);
            return false;
        }
        
        // Check specific field patterns
        if (patterns[fieldName]) {
            if (!patterns[fieldName].test(fieldValue)) {
                showError(field, errorElement, errorMessages[fieldName]);
                return false;
            }
        }
        
        // Special validation for select
        if (field.tagName === 'SELECT' && fieldValue === '') {
            showError(field, errorElement, errorMessages[fieldName]);
            return false;
        }
        
        // Field is valid
        clearError(field);
        return true;
    }
    
    /**
     * Show error message
     */
    function showError(field, errorElement, message) {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    /**
     * Clear error message
     */
    function clearError(field) {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
    
    /**
     * Initialize phone number formatter
     */
    function initializePhoneFormatter() {
        const phoneInput = document.getElementById('phone');
        if (!phoneInput) return;
        
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    formattedValue = value;
                } else if (value.length <= 6) {
                    formattedValue = value.slice(0, 3) + '-' + value.slice(3);
                } else {
                    formattedValue = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            
            e.target.value = formattedValue;
        });
        
        // Prevent non-numeric input
        phoneInput.addEventListener('keypress', function(e) {
            const char = String.fromCharCode(e.which);
            if (!/[0-9]/.test(char) && e.which !== 8 && e.which !== 46) {
                e.preventDefault();
            }
        });
    }
    
    /**
     * Initialize form submission
     */
    function initializeFormSubmission(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const inputs = form.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                // Focus on first error field
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                }
                return;
            }
            
            // Show loading state
            const submitButton = form.querySelector('.btn-submit');
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            
            // Collect form data
            const formData = new FormData(form);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success handling
                console.log('Form submitted:', data);
                
                // Show success message
                showSuccessMessage(form);
                
                // Reset form
                form.reset();
                
                // Remove loading state
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                
                // Track conversion (if analytics is set up)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'generate_lead', {
                        'event_category': 'engagement',
                        'event_label': 'hero_form'
                    });
                }
            }, 1500);
        });
    }
    
    /**
     * Show success message
     */
    function showSuccessMessage(form) {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
            <div class="success-icon">✓</div>
            <h4>Thank You!</h4>
            <p>We'll contact you within 2 hours during business hours.</p>
        `;
        
        form.style.display = 'none';
        form.parentElement.appendChild(successMessage);
        
        // Animate in
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 100);
        
        // Reset after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
            setTimeout(() => {
                successMessage.remove();
                form.style.display = 'block';
            }, 300);
        }, 5000);
    }
    
})();

// Add CSS for success message
const style = document.createElement('style');
style.textContent = `
    .form-success-message {
        text-align: center;
        padding: 2rem;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease-out;
    }
    
    .form-success-message.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .success-icon {
        width: 60px;
        height: 60px;
        background: var(--olive-green);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        margin: 0 auto 1rem;
    }
    
    .form-success-message h4 {
        color: var(--deep-navy);
        margin-bottom: 0.5rem;
    }
    
    .form-success-message p {
        color: var(--cool-gray);
    }
`;
document.head.appendChild(style);