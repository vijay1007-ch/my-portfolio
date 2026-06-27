/* ============================================
   NAVIGATION — Sticky Navbar & Mobile Menu
   ============================================ */

(function () {
  'use strict';

  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const navLinkItems = document.querySelectorAll('.nav-links a');

  if (!navbar) return;

  /* ── Scroll: transparent → solid ── */
  function handleScroll() {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
    navbar.classList.toggle('transparent', !scrolled);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on load

  /* ── Mobile Menu Toggle ── */
  function openMenu() {
    navLinks.classList.add('open');
    if (overlay) overlay.classList.add('open');
    if (navToggle) navToggle.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    if (navToggle) navToggle.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close on link click
  navLinkItems.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  /* ── Active Link Highlighting ── */
  function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinkItems.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      // Check if on same page
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    // If on index.html, also highlight based on scroll position
    if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
      highlightOnScroll();
    }
  }

  function highlightOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function () {
      let current = '';
      const scrollPos = window.scrollY + window.innerHeight / 3;

      sections.forEach(function (section) {
        const sectionTop = section.offsetTop;
        if (scrollPos >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinkItems.forEach(function (link) {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.includes('#' + current)) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  setActiveLink();

  /* ── Smooth Scroll for Anchor Links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

})();
