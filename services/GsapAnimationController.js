export class GsapAnimationController {
  animate(sectionElement) {
    if (sectionElement) {
      gsap.from(sectionElement.children, {
        autoAlpha: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      });
    }
  }
}
