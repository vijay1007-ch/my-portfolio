# Vijay — Premium Developer Portfolio

A modern, premium, static portfolio website built with **HTML5, CSS3, and Vanilla JavaScript**. No frameworks, no libraries — built entirely from scratch.

## 🚀 Features

- **Dark/Light Theme** — Toggle between themes with localStorage persistence
- **Fully Responsive** — Mobile, tablet, laptop, desktop
- **Data-Driven** — All content loaded from JSON files (no hardcoded text)
- **Glassmorphism UI** — Premium glass effect cards with blur and glow
- **Scroll Animations** — Reveal on scroll, animated counters, parallax
- **Contact Form** — With validation and mailto fallback
- **Project Filters** — Category filter + text search
- **WhatsApp Button** — Floating chat button
- **Custom Cursor** — Subtle dot-ring follower on desktop
- **SEO Optimized** — Meta tags, Open Graph, Twitter Cards, JSON-LD, sitemap
- **Loading Screen** — Smooth loading transition
- **Back to Top** — Scroll-to-top button
- **Scroll Progress Bar** — Visual indicator at top

## 📁 Project Structure

```
portfolio/
├── index.html          # Home page
├── about.html          # About page
├── services.html       # Services page
├── projects.html       # Projects page
├── contact.html        # Contact page
├── 404.html            # Error page
├── robots.txt          # SEO
├── sitemap.xml         # SEO
├── css/
│   ├── variables.css   # Design tokens (colors, fonts, spacing)
│   ├── style.css       # All component styles
│   ├── animations.css  # Keyframes & animation classes
│   └── responsive.css  # Breakpoint overrides
├── js/
│   ├── main.js         # Data loader & section renderers
│   ├── navigation.js   # Navbar & mobile menu
│   ├── animations.js   # Scroll reveal, counters, effects
│   ├── theme.js        # Dark/light mode toggle
│   └── projects.js     # Project filter & search
├── data/
│   ├── profile.json    # Personal info, bio, stats, contact
│   ├── projects.json   # Portfolio projects
│   ├── services.json   # Service offerings
│   ├── skills.json     # Technical skills
│   ├── experience.json # Work experience
│   ├── certificates.json # Certifications
│   ├── testimonials.json # Client reviews
│   └── social.json     # Social media links
└── assets/
    ├── images/         # Profile, project images
    ├── icons/          # Custom icons
    ├── logo/           # Brand logo
    ├── resume/         # Resume PDF
    └── fonts/          # Custom fonts
```

## ✏️ How to Update Content

### Add a new project
Edit `data/projects.json` — add a new object:
```json
{
  "id": "my-project",
  "title": "Project Name",
  "description": "Description",
  "image": "assets/images/project-7.png",
  "techStack": ["HTML5", "CSS3", "JavaScript"],
  "liveDemo": "https://example.com",
  "github": "https://github.com/you/repo",
  "features": ["Feature 1", "Feature 2"],
  "category": "Web App",
  "status": "Completed",
  "completionDate": "2025-01-01"
}
```

### Add a new skill
Edit `data/skills.json` — add a new object:
```json
{
  "name": "Next.js",
  "icon": "⬛",
  "level": 70,
  "category": "Frontend"
}
```

### Add a new service
Edit `data/services.json` — add a new object with title, description, icon, features, and startingPrice.

### Update personal info
Edit `data/profile.json` — change name, bio, email, phone, location, stats, etc.

**No HTML changes required!**

## 🖥️ Local Development

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using VS Code
# Install "Live Server" extension → Right-click index.html → "Open with Live Server"
```

## 🌐 Deployment

This is a static site — deploy anywhere:

- **Netlify** — Drag and drop the folder
- **Vercel** — Connect your GitHub repo
- **GitHub Pages** — Push to a `gh-pages` branch
- **Firebase Hosting** — `firebase deploy`

## 📝 License

MIT License — Free to use and modify.
