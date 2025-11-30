import lozad from "lozad";
import type { Config } from "../schemas";
import type { FeatureDetectionService } from "./FeatureDetectionService";

export class LozadLazyLoader {
  private markSectionAsRendered: (sectionId: string) => void;
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
      console.warn(
        "IntersectionObserver not supported, loading all sections immediately",
      );
      setTimeout(() => {
        this.loadAllSections();
      }, 100);
      return;
    }

    const observer = lozad(".lozad", {
      rootMargin: this.config.scroll.lazyLoadRootMargin,
      threshold: 0.1,
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
      console.warn("No sections found, retrying...");
      setTimeout(() => {
        this.loadAllSections();
      }, 100);
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
