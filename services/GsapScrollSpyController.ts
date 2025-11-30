import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Config, NavSection } from "../schemas";

export class GsapScrollSpyController {
  private navRef: HTMLElement;
  private config: Config;
  private navLinks: NodeListOf<HTMLAnchorElement>;

  constructor(navRef: HTMLElement, config: Config) {
    this.navRef = navRef;
    this.config = config;
    this.navLinks = this.navRef.querySelectorAll("a");
  }

  init(): void {
    // The init method can be used for any one-time setup if needed in the future.
    // For now, it will be empty as trigger creation is handled dynamically.
  }

  createTriggerFor(sectionId: string): void {
    const sectionConfig = this.config.components.nav.sections.find(
      (s: NavSection) => s.id === sectionId,
    );
    if (!sectionConfig) return;

    ScrollTrigger.create({
      trigger: `#${sectionId}`,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        if (self.isActive) {
          this.navLinks.forEach((link) => {
            link.classList.remove("active");
          });
          const activeLink = this.navRef.querySelector(
            `a[href="#${sectionId}"]`,
          );
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      },
    });
  }
}
