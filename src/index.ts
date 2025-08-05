// SupplySide Flooring Installation - Main TypeScript Entry
import './styles/main.css';
import { initializeNavigation } from './components/navigation';
import { initializeContactForm } from './components/contact-form';
import { initializeServiceCards } from './components/service-cards';
import { initializeSmoothScroll } from './utils/smooth-scroll';
import { initializeAnalytics } from './utils/analytics';

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('SupplySide Flooring - Initializing');
  
  // Core functionality
  initializeNavigation();
  initializeSmoothScroll();
  
  // Forms
  if (document.querySelector('#contact-form')) {
    initializeContactForm();
  }
  
  // Service cards animation
  if (document.querySelector('.service-card')) {
    initializeServiceCards();
  }
  
  // Analytics (if needed)
  initializeAnalytics();
  
  console.log('SupplySide Flooring - Ready');
});