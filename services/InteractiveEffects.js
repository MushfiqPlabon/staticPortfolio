import { CONFIG } from '../config.js';

class InteractiveEffectsService {
  constructor() {
    this.glow = null;
    this.sections = [];
    this.navLinks = [];
    this.backToTop = null;
  }

  init() {
    try {
      if (!document?.body) throw new Error('Document body not available');
      this.createCursorGlow();
      this.createBackToTop();
      this.attachListeners();
      this.initScrollSpy();
    } catch (error) {
      console.error(CONFIG.errors.interactiveEffectsInitFailed, error);
    }
  }

  createCursorGlow() {
    this.glow = document.createElement('div');
    Object.assign(this.glow.style, {
      position: CONFIG.positions.fixed,
      width: CONFIG.cursor.glowSize,
      height: CONFIG.cursor.glowSize,
      borderRadius: CONFIG.numbers.borderRadius50,
      background: `radial-gradient(${CONFIG.css.circle}, rgba(139, 0, 0, ${CONFIG.cursor.glowOpacity}) ${CONFIG.keyframes.start}, ${CONFIG.colors.transparent} 70%)`,
      pointerEvents: CONFIG.css.pointerEventsNone,
      zIndex: CONFIG.zIndex.cursorGlow,
      mixBlendMode: CONFIG.css.mixBlendScreen,
      transition: `${CONFIG.css.transform} ${CONFIG.cursor.glowTransition} ${CONFIG.css.ease}`
    });
    document.body.appendChild(this.glow);
  }

  createBackToTop() {
    this.backToTop = document.createElement('button');
    this.backToTop.className = 'back-to-top';
    this.backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    this.backToTop.setAttribute('aria-label', 'Back to top');
    this.backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(this.backToTop);
  }

  attachListeners() {
    document.addEventListener('mousemove', (e) => this.updateGlowPosition(e));
    window.addEventListener('scroll', () => {
      this.updateActiveNav();
      this.updateBackToTop();
    }, { passive: true });
  }

  updateGlowPosition(e) {
    if (!this.glow) return;
    const offset = parseInt(CONFIG.cursor.glowSize) / 2;
    this.glow.style.left = `${e.clientX - offset}px`;
    this.glow.style.top = `${e.clientY - offset}px`;
  }

  updateBackToTop() {
    if (!this.backToTop) return;
    if (window.scrollY > 300) {
      this.backToTop.classList.add('visible');
    } else {
      this.backToTop.classList.remove('visible');
    }
  }

  initScrollSpy() {
    this.sections = Array.from(document.querySelectorAll('section[id]'));
    this.navLinks = Array.from(document.querySelectorAll('.nav-list a'));
    this.updateActiveNav();
  }

  updateActiveNav() {
    const scrollPos = window.scrollY + 200;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Check if at bottom of page
    if (windowHeight + window.scrollY >= documentHeight - 50) {
      const lastSection = this.sections[this.sections.length - 1];
      const lastId = lastSection?.getAttribute('id');
      this.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${lastId}`) {
          link.classList.add('active');
        }
      });
      return;
    }
    
    this.sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        this.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

export const InteractiveEffects = new InteractiveEffectsService();
