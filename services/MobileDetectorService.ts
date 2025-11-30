import type { Config } from "../schemas";

export class MobileDetectorService {
  private config: Config;
  private breakpoint: number;
  private mediaQuery: MediaQueryList;

  constructor(config: Config) {
    this.config = config;
    this.breakpoint = this.config.mobile.hamburgerBreakpoint;
    this.mediaQuery = window.matchMedia(`(max-width: ${this.breakpoint}em)`);
  }

  isMobile(): boolean {
    return this.mediaQuery?.matches ?? false;
  }

  onChange(callback: (e: MediaQueryListEvent) => void): void {
    if (!callback || typeof callback !== "function") {
      throw new Error(this.config.errors.callbackRequired);
    }
    this.mediaQuery.addEventListener("change", callback);
  }
}
