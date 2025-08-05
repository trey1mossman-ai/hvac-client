interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export function initializeContactForm(): void {
  const form = document.querySelector('#contact-form') as HTMLFormElement;
  if (!form) return;
  
  form.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data: FormData = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
    };
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
      // For now, just simulate form submission
      await simulateFormSubmission(data);
      
      // Show success message
      showSuccessMessage(form);
      form.reset();
    } catch (error) {
      showErrorMessage(form);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
  
  // Phone number formatting
  const phoneInput = form.querySelector('input[type="tel"]') as HTMLInputElement;
  if (phoneInput) {
    phoneInput.addEventListener('input', (e: Event) => {
      const input = e.target as HTMLInputElement;
      let value = input.value.replace(/\D/g, '');
      
      if (value.length >= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
      } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      }
      
      input.value = value;
    });
  }
}

async function simulateFormSubmission(data: FormData): Promise<void> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Form submitted:', data);
      resolve();
    }, 1500);
  });
}

function showSuccessMessage(form: HTMLFormElement): void {
  const message = document.createElement('div');
  message.className = 'form-message success';
  message.textContent = 'Thank you! We\'ll contact you within 24 hours.';
  form.appendChild(message);
  
  setTimeout(() => message.remove(), 5000);
}

function showErrorMessage(form: HTMLFormElement): void {
  const message = document.createElement('div');
  message.className = 'form-message error';
  message.textContent = 'Something went wrong. Please call us at 312-210-0606.';
  form.appendChild(message);
  
  setTimeout(() => message.remove(), 5000);
}