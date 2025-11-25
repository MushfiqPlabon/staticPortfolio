export class LozadLazyLoader {
  constructor(markSectionAsRendered) {
    this.markSectionAsRendered = markSectionAsRendered;
  }

  init() {
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
}
