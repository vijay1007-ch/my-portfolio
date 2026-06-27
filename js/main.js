/* ============================================
   MAIN — Data Loader & Section Renderers
   ============================================
   Loads JSON data and injects HTML content
   into page sections. No content is hardcoded.
   ============================================ */

(function () {
  'use strict';

  /* ── Data Cache ── */
  const cache = {};

  /* ── Compute base URL from script location ── */
  const baseURL = (function () {
    // Find the script tag for main.js to determine the site root
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (src && src.indexOf('main.js') !== -1) {
        // Remove 'js/main.js' to get the root
        return src.replace(/js\/main\.js.*$/, '');
      }
    }
    return '';
  })();

  /* ── JSON Loader ── */
  async function loadJSON(file) {
    if (cache[file]) return cache[file];
    
    // Check if there is an edit in localStorage first
    const key = 'portfolio_' + file.replace('.json', '');
    let localData = null;
    try {
      localData = localStorage.getItem(key);
    } catch (e) {
      console.warn('Could not access localStorage for ' + file + ':', e);
    }
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        cache[file] = parsed;
        return parsed;
      } catch (e) {
        console.warn('Could not parse localStorage data for ' + file + ', fetching from server.');
      }
    }

    try {
      const response = await fetch(baseURL + 'data/' + file);
      if (!response.ok) throw new Error('Failed to load ' + file);
      const data = await response.json();
      cache[file] = data;
      return data;
    } catch (err) {
      console.warn('Could not load ' + file + ':', err.message);
      return null;
    }
  }

  /* ── Social Icon SVGs ── */
  const socialIcons = {
    github: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    email: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>'
  };

  /* ── Helper: Get social icon SVG ── */
  function getSocialIcon(iconName) {
    return socialIcons[iconName] || '<span>' + iconName + '</span>';
  }

  /* ── Render: Hero Section ── */
  async function renderHero() {
    const container = document.getElementById('hero-content');
    if (!container) return;

    const profile = await loadJSON('profile.json');
    if (!profile) return;

    const social = await loadJSON('social.json');
    const socialHTML = social ? social.map(function (s) {
      return '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer" aria-label="' + s.platform + '" title="' + s.platform + '">' + getSocialIcon(s.icon) + '</a>';
    }).join('') : '';

    container.innerHTML = '\n' +
      (profile.available ? '<div class="hero-availability"><span class="availability-dot"></span>' + (profile.availabilityText || 'Available for Projects') + '</div>' : '') + '\n' +
      '<h1>I Build <span class="gradient-text">' + profile.tagline + '</span></h1>\n' +
      '<p class="hero-subtitle">' + profile.subtitle + '</p>\n' +
      '<div class="hero-typed"><span id="typed-text"></span><span class="typing-cursor"></span></div>\n' +
      '<div class="hero-buttons">\n' +
        '<a href="projects.html" class="btn btn-primary btn-lg">View My Work <span>→</span></a>\n' +
        '<a href="contact.html" class="btn btn-secondary btn-lg">Let\'s Talk <span>💬</span></a>\n' +
      '</div>\n' +
      '<div class="hero-social">' + socialHTML + '</div>';

    // Hero image
    const imgWrapper = document.getElementById('hero-image');
    if (imgWrapper) {
      imgWrapper.innerHTML = '<div class="hero-image-ring"></div><img src="' + profile.profileImage + '" alt="' + profile.name + ' — ' + profile.title + '" class="hero-image" loading="eager" onerror="this.style.display=\'none\'">';
    }

    // Init typing animation
    if (profile.roles && window.initTypingAnimation) {
      const typedEl = document.getElementById('typed-text');
      if (typedEl) {
        window.initTypingAnimation(typedEl, profile.roles, 80, 40, 2000);
      }
    }
  }

  /* ── Render: About Section ── */
  async function renderAbout() {
    const container = document.getElementById('about-content');
    if (!container) return;

    const profile = await loadJSON('profile.json');
    if (!profile) return;

    container.innerHTML = '\n' +
      '<div class="about-text">\n' +
        '<p>' + profile.bio + '</p>\n' +
        (profile.mission ? '<div class="glass-card"><h4>🎯 My Mission</h4><p style="margin-top:var(--space-2)">' + profile.mission + '</p></div>' : '') + '\n' +
        '<div class="about-info-grid">\n' +
          '<div class="about-info-item"><span class="label">Location</span><span class="value">📍 ' + profile.location + '</span></div>\n' +
          '<div class="about-info-item"><span class="label">Languages</span><span class="value">🗣️ ' + profile.languages.join(', ') + '</span></div>\n' +
          '<div class="about-info-item"><span class="label">Email</span><span class="value">✉️ ' + profile.email + '</span></div>\n' +
          '<div class="about-info-item"><span class="label">Specialization</span><span class="value">💻 ' + profile.title + '</span></div>\n' +
        '</div>\n' +
      '</div>\n' +
      '<div>\n' +
        (profile.whyWorkWithMe ? 
          '<h4 style="margin-bottom:var(--space-4)">🤝 Why Work With Me?</h4>\n' +
          '<div class="glass-card" style="padding:var(--space-6)">\n' +
            '<ul style="display:grid;grid-template-columns:repeat(2, 1fr);gap:var(--space-3);list-style:none;padding:0">\n' +
              profile.whyWorkWithMe.map(function (item) {
                return '<li style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);color:var(--text-secondary)">\n' +
                  '<span style="color:var(--success);font-weight:bold">✓</span> ' + item + '\n' +
                '</li>';
              }).join('') + '\n' +
            '</ul>\n' +
          '</div>'
        : '') + '\n' +
      '</div>';
  }

  /* ── Render: About Page ── */
  async function renderAboutPage() {
    const profile = await loadJSON('profile.json');
    if (!profile) return;

    const bioEl = document.getElementById('about-bio-text');
    if (bioEl) bioEl.textContent = profile.bio;

    const missionEl = document.getElementById('about-mission-text');
    if (missionEl) missionEl.textContent = profile.mission;

    const whyChooseList = document.getElementById('why-choose-list');
    if (whyChooseList && profile.whyWorkWithMe) {
      whyChooseList.innerHTML = profile.whyWorkWithMe.map(function (item) {
        return '<li><span>✓</span> ' + item + '</li>';
      }).join('');
    }

    // Populate Tech Stack
    const techStackEl = document.getElementById('about-tech-stack');
    if (techStackEl) {
      const skills = await loadJSON('skills.json');
      if (skills) {
        techStackEl.innerHTML = skills.map(function (skill) {
          return '<span class="badge" style="padding:var(--space-2) var(--space-4);font-size:var(--text-sm)">' +
            (skill.icon ? skill.icon + ' ' : '') + skill.name +
          '</span>';
        }).join('');
      }
    }
  }

  /* ── Render: Stats ── */
  async function renderStats() {
    const container = document.getElementById('stats-grid');
    if (!container) return;

    const profile = await loadJSON('profile.json');
    if (!profile || !profile.stats) return;

    const stats = [
      { value: profile.stats.projectsCompleted, label: 'Projects Completed', suffix: '+' },
      { value: profile.stats.happyClients, label: 'Happy Clients', suffix: '+' },
      { value: profile.stats.yearsExperience, label: 'Years Experience', suffix: '+' },
      { value: profile.stats.technologiesUsed, label: 'Technologies', suffix: '+' }
    ];

    container.innerHTML = stats.map(function (stat) {
      return '<div class="stat-card glass-card animate-on-scroll">' +
        '<div class="stat-number" data-count="' + stat.value + '" data-suffix="' + stat.suffix + '">0</div>' +
        '<div class="stat-label">' + stat.label + '</div>' +
      '</div>';
    }).join('');
  }

  /* ── Render: Skills ── */
  async function renderSkills() {
    const container = document.getElementById('skills-grid');
    const tabsContainer = document.getElementById('skills-tabs');
    if (!container) return;

    const skills = await loadJSON('skills.json');
    if (!skills) return;

    // Get unique categories
    const categories = ['All'];
    skills.forEach(function (skill) {
      if (categories.indexOf(skill.category) === -1) {
        categories.push(skill.category);
      }
    });

    // Render tabs
    if (tabsContainer) {
      tabsContainer.innerHTML = categories.map(function (cat, i) {
        return '<button class="filter-tab' + (i === 0 ? ' active' : '') + '" data-category="' + cat + '">' + cat + '</button>';
      }).join('');

      // Tab click handler
      tabsContainer.addEventListener('click', function (e) {
        const tab = e.target.closest('.filter-tab');
        if (!tab) return;

        tabsContainer.querySelectorAll('.filter-tab').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');

        const category = tab.getAttribute('data-category');
        const cards = container.querySelectorAll('.skill-card');
        cards.forEach(function (card) {
          if (category === 'All' || card.getAttribute('data-category') === category) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }

    // Render skills
    container.innerHTML = skills.map(function (skill) {
      return '<div class="skill-card glass-card animate-on-scroll" data-category="' + skill.category + '">' +
        '<div class="skill-icon">' + skill.icon + '</div>' +
        '<div class="skill-info">' +
          '<div class="skill-name" style="margin-bottom:0">' + skill.name + '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ── Render: Services ── */
  async function renderServices(limit) {
    const container = document.getElementById('services-grid');
    if (!container) return;

    const services = await loadJSON('services.json');
    if (!services) return;

    const items = limit ? services.slice(0, limit) : services;

    container.innerHTML = items.map(function (service) {
      return '<div class="service-card glass-card hover-lift animate-on-scroll' + (service.popular ? ' popular' : '') + '">' +
        (service.popular ? '<span class="popular-badge">Popular</span>' : '') +
        '<div class="service-icon">' + service.icon + '</div>' +
        '<h3 class="service-title">' + service.title + '</h3>' +
        '<p class="service-description">' + service.description + '</p>' +
        '<ul class="service-features">' + service.features.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
        '<div class="service-price">' +
          '<span class="price-label">Starting at</span>' +
          '<span class="price-value">' + service.startingPrice + '</span>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ── Render: Projects ── */
  async function renderProjects(limit) {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    const projects = await loadJSON('projects.json');
    if (!projects) return;

    const items = limit ? projects.slice(0, limit) : projects;

    container.innerHTML = items.map(function (project) {
      return '<div class="project-card glass-card animate-on-scroll" data-category="' + project.category + '">' +
        '<div class="project-image">' +
          '<img src="' + project.image + '" alt="' + project.title + '" loading="lazy" onerror="this.parentElement.style.background=\'var(--gradient-card)\';this.style.display=\'none\'">' +
          '<div class="project-overlay">' +
            (project.liveDemo ? '<a href="' + project.liveDemo + '" target="_blank" rel="noopener">Live Demo</a>' : '') +
            (project.github ? '<a href="' + project.github + '" target="_blank" rel="noopener">GitHub</a>' : '') +
          '</div>' +
          '<span class="project-status badge' + (project.status === 'Completed' ? ' badge-success' : ' badge-accent') + '">' + project.status + '</span>' +
        '</div>' +
        '<div class="project-info">' +
          '<span class="project-category">' + project.category + '</span>' +
          '<h3 class="project-title">' + project.title + '</h3>' +
          '<p class="project-description">' + project.description + '</p>' +
          '<div class="project-tech">' + project.techStack.map(function (t) { return '<span class="badge">' + t + '</span>'; }).join('') + '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ── Render: Experience ── */
  async function renderExperience() {
    const container = document.getElementById('experience-timeline');
    if (!container) return;

    const experience = await loadJSON('experience.json');
    if (!experience) return;

    container.innerHTML = experience.map(function (exp) {
      return '<div class="timeline-item animate-on-scroll">' +
        '<div class="timeline-dot"></div>' +
        '<div class="timeline-content">' +
          '<h3>' + exp.role + '</h3>' +
          '<h4>' + exp.company + '</h4>' +
          '<p>' + exp.description + '</p>' +
          '<ul class="timeline-highlights">' + exp.highlights.map(function (h) { return '<li>' + h + '</li>'; }).join('') + '</ul>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ── Render: Certificates ── */
  async function renderCertificates() {
    const container = document.getElementById('certificates-grid');
    if (!container) return;

    const certs = await loadJSON('certificates.json');
    if (!certs) return;

    container.innerHTML = certs.map(function (cert) {
      return '<div class="certificate-card glass-card hover-lift animate-on-scroll" style="display:flex;flex-direction:column;overflow:hidden;padding:0">' +
        '<div class="certificate-image" style="position:relative;width:100%;height:180px;overflow:hidden;background:var(--bg-secondary)">' +
          '<img src="' + cert.image + '" alt="' + cert.name + '" style="width:100%;height:100%;object-fit:contain;padding:var(--space-2)" onerror="this.style.display=\'none\'">' +
          '<span class="certificate-badge" style="position:absolute;top:var(--space-3);right:var(--space-3);z-index:2;background:rgba(37,99,235,0.15);backdrop-filter:blur(4px);width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:var(--text-lg)">' + cert.badge + '</span>' +
        '</div>' +
        '<div class="certificate-info" style="padding:var(--space-5);display:flex;flex-direction:column;gap:var(--space-2);flex:1">' +
          '<h3 class="certificate-name" style="font-size:var(--text-md);font-weight:var(--font-weight-semibold);line-height:var(--line-height-tight)">' + cert.name + '</h3>' +
          '<div class="certificate-provider" style="font-size:var(--text-xs);color:var(--secondary);font-weight:var(--font-weight-medium)">' + cert.provider + '</div>' +
          '<div class="certificate-date" style="font-size:var(--text-xs);color:var(--text-muted)">Issued: ' + cert.issueDate + '</div>' +
          '<a href="' + cert.credentialUrl + '" target="_blank" rel="noopener" class="btn btn-ghost btn-sm certificate-link" style="margin-top:auto;width:fit-content;padding-left:0;color:var(--primary-light)">View PDF ↗</a>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ── Render: Testimonials ── */
  async function renderTestimonials() {
    const container = document.getElementById('testimonials-grid');
    if (!container) return;

    const testimonials = await loadJSON('testimonials.json');
    if (!testimonials) return;

    container.innerHTML = testimonials.map(function (t) {
      const initials = t.name.split(' ').map(function (n) { return n[0]; }).join('');
      const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);

      return '<div class="testimonial-card glass-card animate-on-scroll">' +
        '<div class="testimonial-rating">' + stars + '</div>' +
        '<p class="testimonial-quote">' + t.review + '</p>' +
        '<div class="testimonial-author">' +
          '<div class="testimonial-avatar-placeholder">' + initials + '</div>' +
          '<div>' +
            '<div class="testimonial-name">' + t.name + '</div>' +
            '<div class="testimonial-company">' + t.company + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ── Render: Contact Info ── */
  async function renderContactInfo() {
    const container = document.getElementById('contact-info');
    if (!container) return;

    const profile = await loadJSON('profile.json');
    const social = await loadJSON('social.json');
    if (!profile) return;

    const infoCards = [
      { icon: '✉️', label: 'Email', value: profile.email, href: 'mailto:' + profile.email },
      { icon: '📱', label: 'Phone', value: profile.phone, href: 'tel:' + profile.phone },
      { icon: '💬', label: 'WhatsApp', value: 'Chat on WhatsApp', href: 'https://wa.me/' + profile.whatsapp },
      { icon: '📍', label: 'Location', value: profile.location, href: null }
    ];

    let html = infoCards.map(function (info) {
      const valueHTML = info.href
        ? '<a href="' + info.href + '" target="_blank" rel="noopener">' + info.value + '</a>'
        : info.value;
      return '<div class="contact-info-card glass-card">' +
        '<div class="contact-info-icon">' + info.icon + '</div>' +
        '<div class="contact-info-text">' +
          '<span class="contact-info-label">' + info.label + '</span>' +
          '<span class="contact-info-value">' + valueHTML + '</span>' +
        '</div>' +
      '</div>';
    }).join('');

    // Social links
    if (social) {
      html += '<div class="contact-socials">' + social.map(function (s) {
        return '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-secondary" aria-label="' + s.platform + '" title="' + s.platform + '">' + getSocialIcon(s.icon) + '</a>';
      }).join('') + '</div>';
    }

    // Map
    if (profile.mapEmbedUrl) {
      html += '<div class="contact-map"><iframe src="' + profile.mapEmbedUrl + '" allowfullscreen loading="lazy" title="Location Map"></iframe></div>';
    }

    container.innerHTML = html;
  }

  /* ── Render: Footer ── */
  async function renderFooter() {
    const socialContainer = document.getElementById('footer-socials');
    const yearEl = document.getElementById('footer-year');
    const nameEl = document.getElementById('footer-name');

    const profile = await loadJSON('profile.json');
    const social = await loadJSON('social.json');

    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (nameEl && profile) nameEl.textContent = profile.name;

    if (socialContainer && social) {
      socialContainer.innerHTML = social.map(function (s) {
        return '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer" aria-label="' + s.platform + '" title="' + s.platform + '">' + getSocialIcon(s.icon) + '</a>';
      }).join('');
    }
  }

  /* ── Render: WhatsApp FAB ── */
  async function renderWhatsAppFAB() {
    const fab = document.getElementById('whatsapp-fab');
    if (!fab) return;

    const profile = await loadJSON('profile.json');
    if (!profile || !profile.whatsapp) return;

    fab.href = 'https://wa.me/' + profile.whatsapp + '?text=Hi%20' + encodeURIComponent(profile.name) + ',%20I%27d%20like%20to%20discuss%20a%20web%20project.';
  }

  /* ── Contact Form Handler ── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Clear previous errors
      form.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('error'); });

      // Validate
      let hasError = false;
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');

      if (name && !name.value.trim()) {
        name.closest('.form-group').classList.add('error');
        hasError = true;
      }

      if (email && (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))) {
        email.closest('.form-group').classList.add('error');
        hasError = true;
      }

      if (message && !message.value.trim()) {
        message.closest('.form-group').classList.add('error');
        hasError = true;
      }

      if (hasError) return;

      // Construct mailto
      const subject = form.querySelector('[name="subject"]');
      const mailtoUrl = 'mailto:' + (cache['profile.json'] ? cache['profile.json'].email : 'vijay@example.com') +
        '?subject=' + encodeURIComponent((subject ? subject.value : 'Website Inquiry')) +
        '&body=' + encodeURIComponent(
          'Name: ' + (name ? name.value : '') + '\n' +
          'Email: ' + (email ? email.value : '') + '\n\n' +
          (message ? message.value : '')
        );

      window.open(mailtoUrl, '_self');

      // Show success
      const successMsg = form.querySelector('.form-success');
      if (successMsg) {
        successMsg.classList.add('visible');
        setTimeout(function () { successMsg.classList.remove('visible'); }, 5000);
      }

      form.reset();
    });
  }

  /* ── Page Initializer ── */
  async function initPage() {
    // Clear stale placeholder cache from localStorage if it contains old email
    try {
      const cachedProfile = localStorage.getItem('portfolio_profile');
      if (cachedProfile && cachedProfile.indexOf('vijay@example.com') !== -1) {
        localStorage.removeItem('portfolio_profile');
        localStorage.removeItem('portfolio_social');
        localStorage.removeItem('portfolio_projects');
        localStorage.removeItem('portfolio_skills');
        localStorage.removeItem('portfolio_experience');
        localStorage.removeItem('portfolio_certificates');
        localStorage.removeItem('portfolio_testimonials');
      }
    } catch (e) {
      console.warn('Could not clear localStorage cache:', e);
    }

    // Normalize: handle both '/about.html' and '/about' (clean URLs)
    var rawPage = window.location.pathname.split('/').pop() || '';
    var currentPage = rawPage.replace('.html', '') || 'index';

    // Common elements on all pages
    renderFooter();
    renderWhatsAppFAB();
    initContactForm();

    // Page-specific rendering
    switch (currentPage) {
      case 'index':
      case 'index.html':
      case '':
        await renderHero();
        await renderAbout();
        await renderSkills();
        await renderExperience();
        break;

      case 'about':
        await renderAboutPage();
        break;

      case 'contact':
        await renderContactInfo();
        break;

      case 'projects':
      case 'projects.html':
        await renderProjects();
        break;

      case 'certificates':
      case 'certificates.html':
        await renderCertificates();
        break;
    }

    // Re-initialize animations for newly injected content
    // Small delay to let DOM update
    setTimeout(function () {
      const elements = document.querySelectorAll('.animate-on-scroll:not(.visible)');
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      elements.forEach(function (el) { observer.observe(el); });

      // Re-init skill bars
      document.querySelectorAll('.skill-bar').forEach(function (bar) {
        const observer2 = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.width = entry.target.getAttribute('data-level') + '%';
              observer2.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });
        observer2.observe(bar);
      });

      // Re-init counters
      document.querySelectorAll('[data-count]').forEach(function (counter) {
        const observer3 = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const target = parseInt(entry.target.getAttribute('data-count'), 10);
              const suffix = entry.target.getAttribute('data-suffix') || '';
              const duration = 2000;
              const startTime = performance.now();
              function update(t) {
                const elapsed = t - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                entry.target.textContent = Math.floor(eased * target) + suffix;
                if (progress < 1) requestAnimationFrame(update);
                else entry.target.textContent = target + suffix;
              }
              requestAnimationFrame(update);
              observer3.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        observer3.observe(counter);
      });

      // Re-init cursor for newly added elements
      if (!('ontouchstart' in window)) {
        const ring = document.querySelector('.custom-cursor-ring');
        if (ring) {
          document.querySelectorAll('a, button, .btn, .glass-card, .filter-tab').forEach(function (el) {
            el.addEventListener('mouseenter', function () { ring.classList.add('hover'); });
            el.addEventListener('mouseleave', function () { ring.classList.remove('hover'); });
          });
        }
      }
    }, 100);
  }

  // Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
  } else {
    initPage();
  }

})();
