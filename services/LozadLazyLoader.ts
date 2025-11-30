import lozad from "lozad";
import type { Config } from "../schemas";
import type { FeatureDetectionService } from "./FeatureDetectionService";

export class LozadLazyLoader {
  private markSectionAsRendered: (sectionId: string) => void;
  private featureDetection: FeatureDetectionService | null;
  private config: Config;
  private fallbackMode: boolean;

  constructor(
    markSectionAsRendered: (sectionId: string) => void,
    featureDetection: FeatureDetectionService | null = null,
    config: Config,
  ) {
    this.markSectionAsRendered = markSectionAsRendered;
    this.featureDetection = featureDetection;
    this.config = config;
    this.fallbackMode = !!(
      featureDetection && !featureDetection.hasFeature("intersectionObserver")
    );
  }

  init(): void {
    if (this.fallbackMode) {
      setTimeout(() => {
        this.loadAllSections();
      }, this.config.timeouts.sectionRenderDelay);
      return;
    }

    const observer = lozad(".lozad", {
      rootMargin: this.config.scroll.lazyLoadRootMargin,
      threshold: this.config.lozad.threshold,
      load: (el: HTMLElement) => {
        const sectionId = el.getAttribute("data-section-id");
        if (sectionId) {
          this.markSectionAsRendered(sectionId);
        }
      },
    });
    observer.observe();
  }

  loadAllSections(): void {
    const sections = document.querySelectorAll(".lozad[data-section-id]");
    if (sections.length === 0) {
      setTimeout(() => {
        this.loadAllSections();
      }, this.config.timeouts.sectionRenderDelay);
      return;
    }
    sections.forEach((el) => {
      const sectionId = el.getAttribute("data-section-id");
      if (sectionId) {
        this.markSectionAsRendered(sectionId);
      }
    });
  }
}
