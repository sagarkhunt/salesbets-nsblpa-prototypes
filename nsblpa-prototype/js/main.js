
document.addEventListener('DOMContentLoaded', function(){
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      const isOpen = mobileMenu.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Contact form handling
  const form = document.querySelector('form.contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.querySelector('[name=name]').value;
      const email = form.querySelector('[name=email]').value;
      const message = form.querySelector('[name=message]').value;
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'card';
      successMessage.style.background = 'var(--success)';
      successMessage.style.color = 'white';
      successMessage.style.marginTop = 'var(--space-md)';
      successMessage.innerHTML = `
        <h3>Thank you, ${name || 'there'}!</h3>
        <p>Your message has been received. We'll get back to you at ${email || 'your email'} soon.</p>
      `;
      
      form.parentNode.insertBefore(successMessage, form.nextSibling);
      form.reset();
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        if (successMessage.parentNode) {
          successMessage.parentNode.removeChild(successMessage);
        }
      }, 5000);
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add fade-in animation to cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all cards
  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });
});
