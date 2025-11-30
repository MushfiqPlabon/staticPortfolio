import type { Config } from "../schemas";

interface Features {
  intersectionObserver: boolean;
  serviceWorker: boolean;
  localStorage: boolean;
  sessionStorage: boolean;
  fetch: boolean;
  promises: boolean;
  asyncAwait: boolean;
  es6Modules: boolean;
  webGL: boolean;
  webGL2: boolean;
  touchEvents: boolean;
  geolocation: boolean;
  notifications: boolean;
  pushManager: boolean;
  [key: string]: boolean; // Allow for dynamic feature names
}

export class FeatureDetectionService {
  private config: Config;
  private cacheKey: string;
  private features: Features;

  constructor(config: Config) {
    this.config = config;
    this.cacheKey = this.config.featureDetection.cacheKey;
    this.features = this.detectFeatures();
  }

  detectFeatures(): Features {
    const cached = this.getCachedFeatures();
    if (cached) {
      return cached;
    }

    const features: Features = {
      intersectionObserver: "IntersectionObserver" in window,
      serviceWorker: "serviceWorker" in navigator,
      localStorage: this.testLocalStorage(),
      sessionStorage: this.testSessionStorage(),
      fetch: "fetch" in window,
      promises: "Promise" in window,
      asyncAwait: this.testAsyncAwait(),
      es6Modules: "noModule" in document.createElement("script"),
      webGL: this.testWebGL(),
      webGL2: this.testWebGL2(),
      touchEvents: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      geolocation: "geolocation" in navigator,
      notifications: "Notification" in window,
      pushManager: "PushManager" in window,
    };

    this.cacheFeatures(features);
    return features;
  }

  getCachedFeatures(): Features | null {
    try {
      if (!this.testLocalStorage()) {
        return null;
      }
      const cached = localStorage.getItem(this.cacheKey);
      if (cached) {
        return JSON.parse(cached) as Features;
      }
    } catch (_e: unknown) {
      return null;
    }
    return null;
  }

  cacheFeatures(features: Features): void {
    try {
      if (this.testLocalStorage()) {
        localStorage.setItem(this.cacheKey, JSON.stringify(features));
      }
    } catch (_e: unknown) {
      // Silently fail - caching is not critical
    }
  }

  testLocalStorage(): boolean {
    try {
      const testKey = this.config.featureDetection.testKey;
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (_e: unknown) {
      return false;
    }
  }

  testSessionStorage(): boolean {
    try {
      const testKey = this.config.featureDetection.testKey;
      sessionStorage.setItem(testKey, testKey);
      sessionStorage.removeItem(testKey);
      return true;
    } catch (_e: unknown) {
      return false;
    }
  }

  testAsyncAwait(): boolean {
    try {
      return typeof (globalThis as any).AsyncFunction === "function";
    } catch (_e: unknown) {
      return false;
    }
  }

  testWebGL(): boolean {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      );
    } catch (_e: unknown) {
      return false;
    }
  }

  testWebGL2(): boolean {
    try {
      const canvas = document.createElement("canvas");
      return !!canvas.getContext("webgl2");
    } catch (_e: unknown) {
      return false;
    }
  }

  getFeatures(): Features {
    return this.features;
  }

  hasFeature(feature: keyof Features): boolean {
    return !!this.features[feature];
  }

  getMissingFeatures(): string[] {
    return Object.keys(this.features).filter(
      (feature) => !this.features[feature],
    );
  }

  isFullySupported(): boolean {
    const requiredFeatures: (keyof Features)[] = [
      "intersectionObserver",
      "fetch",
      "promises",
      "es6Modules",
    ];
    return requiredFeatures.every((feature) => this.hasFeature(feature));
  }

  logFeatures(): void {
    // Only log in development mode - production logging handled by ErrorTrackingService
    if (this.config.errorTracking.enabled) {
      const missing = this.getMissingFeatures();
      if (missing.length > 0) {
        // Feature detection results available via getFeatures() and getMissingFeatures()
      }
    }
  }
}
