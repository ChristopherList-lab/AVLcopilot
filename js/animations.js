/* ============================================
   Scroll animations — IntersectionObserver reveals
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Generic fade-in (add .fade-in-up or .animate-on-scroll to elements)
  const fadeElements = document.querySelectorAll('.animate-on-scroll, .fade-in-up');
  if (fadeElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('is-visible'), Number(delay));
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });
    fadeElements.forEach(el => observer.observe(el));
  }

  // Count-up animation — supports data-count-to, data-count-suffix, data-count-prefix
  const counters = document.querySelectorAll('[data-count-to]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.countTo, 10);
          const suffix = el.dataset.countSuffix || '';
          const prefix = el.dataset.countPrefix || '';
          const duration = 1400;
          const startTime = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            el.textContent = prefix + current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = prefix + target.toLocaleString() + suffix;
          };
          requestAnimationFrame(tick);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countObserver.observe(el));
  }
});
