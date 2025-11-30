import lozad from 'lozad';

export class LozadLazyLoader {
  constructor(markSectionAsRendered, featureDetection = null) {
    this.markSectionAsRendered = markSectionAsRendered;
    this.featureDetection = featureDetection;
    this.fallbackMode = featureDetection && !featureDetection.hasFeature('intersectionObserver');
  }

  init() {
    if (this.fallbackMode) {
      console.warn('IntersectionObserver not supported, loading all sections immediately');
      setTimeout(() => {
        this.loadAllSections();
      }, 100);
      return;
    }

    const observer = lozad('.lozad', {
        rootMargin: '200px 0px',
        threshold: 0.1,
        load: (el) => {
            const sectionId = el.getAttribute('data-section-id');
            if (sectionId) {
                this.markSectionAsRendered(sectionId);
            }
        }
    });
    observer.observe();
  }

  loadAllSections() {
    const sections = document.querySelectorAll('.lozad[data-section-id]');
    if (sections.length === 0) {
      console.warn('No sections found, retrying...');
      setTimeout(() => {
        this.loadAllSections();
      }, 100);
      return;
    }
    sections.forEach(el => {
      const sectionId = el.getAttribute('data-section-id');
      if (sectionId) {
        this.markSectionAsRendered(sectionId);
      }
    });
  }
}
