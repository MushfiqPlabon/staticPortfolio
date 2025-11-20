import { render } from 'https://esm.sh/preact@10';
import AOS from 'https://esm.sh/aos@2.3.4';
import { CONFIG } from '../config.js';

class RendererService {
  render(component, target) {
    try {
      if (!target) throw new Error(CONFIG.errors.renderTargetRequired);
      render(component, target);
    } catch (error) {
      console.error(CONFIG.errors.renderFailed, error);
      throw error;
    }
  }
}

class AnimatorService {
  init() {
    try {
      AOS.init({
        duration: CONFIG.animation.duration,
        once: CONFIG.animation.once,
        offset: CONFIG.animation.offset,
      });
    } catch (error) {
      console.error(CONFIG.errors.animatorInitFailed, error);
    }
  }

  refresh() {
    try {
      AOS.refresh();
    } catch (error) {
      console.error(CONFIG.errors.animatorRefreshFailed, error);
    }
  }
}

class MobileDetectorService {
  constructor() {
    this.breakpoint = CONFIG.mobile.hamburgerBreakpoint;
    this.mediaQuery = window.matchMedia(`(max-width: ${this.breakpoint}em)`);
  }

  isMobile() {
    return this.mediaQuery?.matches ?? false;
  }

  onChange(callback) {
    if (!callback || typeof callback !== 'function') {
      throw new Error(CONFIG.errors.callbackRequired);
    }
    this.mediaQuery.addEventListener('change', callback);
  }
}

export const Renderer = new RendererService();
export const Animator = new AnimatorService();
export const MobileDetector = new MobileDetectorService();
