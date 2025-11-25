export class MobileDetectorService {
  constructor(config) {
    this.config = config;
    this.breakpoint = this.config.mobile.hamburgerBreakpoint;
    this.mediaQuery = window.matchMedia(`(max-width: ${this.breakpoint}em)`);
  }

  isMobile() {
    return this.mediaQuery?.matches ?? false;
  }

  onChange(callback) {
    if (!callback || typeof callback !== 'function') {
      throw new Error(this.config.errors.callbackRequired);
    }
    this.mediaQuery.addEventListener('change', callback);
  }
}