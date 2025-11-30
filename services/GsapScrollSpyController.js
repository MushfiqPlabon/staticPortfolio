import { ScrollTrigger } from 'gsap/ScrollTrigger';

export class GsapScrollSpyController {
  constructor(navRef, config) {
    this.navRef = navRef;
    this.config = config;
    this.navLinks = this.navRef.querySelectorAll('a');
  }

  init() {
    // The init method can be used for any one-time setup if needed in the future.
    // For now, it will be empty as trigger creation is handled dynamically.
  }

  createTriggerFor(sectionId) {
    const sectionConfig = this.config.components.nav.sections.find(s => s.id === sectionId);
    if (!sectionConfig) return;

    ScrollTrigger.create({
      trigger: `#${sectionId}`,
      start: "top center",
      end: "bottom center",
      onToggle: self => {
        if (self.isActive) {
          this.navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = this.navRef.querySelector(`a[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      },
    });
  }
}
