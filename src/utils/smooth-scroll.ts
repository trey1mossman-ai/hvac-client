export function initializeSmoothScroll(): void {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e: Event) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href')!);
      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
}