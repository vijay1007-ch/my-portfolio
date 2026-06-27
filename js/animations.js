/* ============================================
   ANIMATIONS — Scroll Reveal, Counters, Effects
   ============================================ */

(function () {
  'use strict';

  /* ── Scroll Reveal via IntersectionObserver ── */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stagger children if they exist
            const children = entry.target.querySelectorAll('.animate-on-scroll');
            children.forEach(function (child, i) {
              child.style.transitionDelay = (i * 100) + 'ms';
              child.classList.add('visible');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── Animated Counters ── */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'), 10);
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      
      element.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  /* ── Skill Bar Fill Animation ── */
  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar');
    if (!bars.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const level = entry.target.getAttribute('data-level');
            entry.target.style.width = level + '%';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    bars.forEach(function (bar) {
      observer.observe(bar);
    });
  }

  /* ── Typing Animation ── */
  window.initTypingAnimation = function (element, strings, speed, deleteSpeed, pauseDuration) {
    if (!element || !strings.length) return;
    
    speed = speed || 80;
    deleteSpeed = deleteSpeed || 40;
    pauseDuration = pauseDuration || 2000;

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentString = strings[stringIndex];
      
      if (isDeleting) {
        element.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
      } else {
        element.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? deleteSpeed : speed;

      if (!isDeleting && charIndex === currentString.length) {
        delay = pauseDuration;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        delay = 300;
      }

      setTimeout(type, delay);
    }

    type();
  };

  /* ── Button Ripple Effect ── */
  function initRippleEffect() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn, .ripple-container');
      if (!btn) return;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);

      ripple.addEventListener('animationend', function () {
        ripple.remove();
      });
    });
  }

  /* ── Parallax Background ── */
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    if (!parallaxElements.length) return;

    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      parallaxElements.forEach(function (el) {
        const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.3;
        el.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
      });
    }, { passive: true });
  }

  /* ── Scroll Progress Bar ── */
  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    }, { passive: true });
  }

  /* ── Back to Top Button ── */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Custom Cursor ── */
  function initCustomCursor() {
    // Only on non-touch devices
    if ('ontouchstart' in window) return;

    const cursor = document.querySelector('.custom-cursor');
    const ring = document.querySelector('.custom-cursor-ring');
    if (!cursor || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX - 4 + 'px';
      cursor.style.top = mouseY - 4 + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX - 16 + 'px';
      ring.style.top = ringY - 16 + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    document.querySelectorAll('a, button, .btn, .glass-card, .filter-tab, input, textarea').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('hover'); });
    });
  }

  /* ── Loading Screen ── */
  function initLoadingScreen() {
    const loader = document.querySelector('.loading-screen');
    if (!loader) return;

    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('hidden');
        // Remove from DOM after animation
        setTimeout(function () {
          loader.remove();
        }, 500);
      }, 600);
    });
  }

  /* ── Initialize All Animations ── */
  function init() {
    initLoadingScreen();
    initScrollReveal();
    initCounters();
    initSkillBars();
    initRippleEffect();
    initParallax();
    initScrollProgress();
    initBackToTop();
    initCustomCursor();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
