document.addEventListener('DOMContentLoaded', function() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const easeOutQuad = t => t * (2 - t);
  
  function animateNumber(element, end, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function update() {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      
      if (elapsed < duration) {
        const progress = easeOutQuad(elapsed / duration);
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + '+';
        requestAnimationFrame(update);
      } else {
        element.textContent = end + '+';
      }
    }
    
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const button = entry.target;
        const number = parseInt(button.textContent);
        if (!button.dataset.animated) {
          animateNumber(button, number);
          button.dataset.animated = true;
        }
      }
    });
  }, options);

  document.querySelectorAll('.card-action .button').forEach(button => {
    observer.observe(button);
  });
});