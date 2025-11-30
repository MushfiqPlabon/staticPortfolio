import { gsap } from "gsap";
import type { Config } from "../schemas";

export class GsapAnimationController {
  private config: Config;
  private maxAnimatedElements: number;

  constructor(config: Config) {
    this.config = config;
    this.maxAnimatedElements = this.config.animationController.maxAnimatedElements;
  }

  animate(sectionElement: HTMLElement): void {
    if (!sectionElement || !sectionElement.children) {
      return;
    }

    const children = Array.from(sectionElement.children) as HTMLElement[];
    const elementsToAnimate = children.slice(0, this.maxAnimatedElements);

    if (elementsToAnimate.length === 0) {
      return;
    }

    gsap.from(elementsToAnimate, {
      autoAlpha: this.config.gsap.animationAutoAlpha,
      y: this.config.gsap.animationY,
      duration: this.config.gsap.animationDuration,
      ease: this.config.gsap.animationEase,
      stagger: this.config.gsap.animationStagger,
    });
  }
}
