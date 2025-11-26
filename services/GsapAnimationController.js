export class GsapAnimationController {
  constructor() {
    this.maxAnimatedElements = 20;
  }

  animate(sectionElement) {
    if (!sectionElement || !sectionElement.children) {
      return;
    }

    const children = Array.from(sectionElement.children);
    const elementsToAnimate = children.slice(0, this.maxAnimatedElements);

    if (elementsToAnimate.length === 0) {
      return;
    }

    gsap.from(elementsToAnimate, {
      autoAlpha: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
    });
  }
}
