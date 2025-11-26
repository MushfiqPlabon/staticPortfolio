export class FeatureDetectionService {
  constructor(config) {
    this.config = config;
    this.cacheKey = 'portfolio_features_v1';
    this.features = this.detectFeatures();
  }

  detectFeatures() {
    const cached = this.getCachedFeatures();
    if (cached) {
      return cached;
    }

    const features = {
      intersectionObserver: 'IntersectionObserver' in window,
      serviceWorker: 'serviceWorker' in navigator,
      localStorage: this.testLocalStorage(),
      sessionStorage: this.testSessionStorage(),
      fetch: 'fetch' in window,
      promises: 'Promise' in window,
      asyncAwait: this.testAsyncAwait(),
      es6Modules: 'noModule' in document.createElement('script'),
      webGL: this.testWebGL(),
      webGL2: this.testWebGL2(),
      touchEvents: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      geolocation: 'geolocation' in navigator,
      notifications: 'Notification' in window,
      pushManager: 'PushManager' in window
    };

    this.cacheFeatures(features);
    return features;
  }

  getCachedFeatures() {
    try {
      if (!this.testLocalStorage()) {
        return null;
      }
      const cached = localStorage.getItem(this.cacheKey);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  cacheFeatures(features) {
    try {
      if (this.testLocalStorage()) {
        localStorage.setItem(this.cacheKey, JSON.stringify(features));
      }
    } catch (e) {
      console.warn('Failed to cache feature detection results');
    }
  }

  testLocalStorage() {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  testSessionStorage() {
    try {
      const testKey = '__test__';
      sessionStorage.setItem(testKey, testKey);
      sessionStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  testAsyncAwait() {
    try {
      eval('(async () => {})');
      return true;
    } catch (e) {
      return false;
    }
  }

  testWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  }

  testWebGL2() {
    try {
      const canvas = document.createElement('canvas');
      return !!canvas.getContext('webgl2');
    } catch (e) {
      return false;
    }
  }

  getFeatures() {
    return this.features;
  }

  hasFeature(feature) {
    return !!this.features[feature];
  }

  getMissingFeatures() {
    return Object.keys(this.features).filter(feature => !this.features[feature]);
  }

  isFullySupported() {
    const requiredFeatures = ['intersectionObserver', 'fetch', 'promises', 'es6Modules'];
    return requiredFeatures.every(feature => this.hasFeature(feature));
  }

  logFeatures() {
    console.log('Feature Detection Results:', this.features);
    const missing = this.getMissingFeatures();
    if (missing.length > 0) {
      console.warn('Missing features:', missing);
    }
  }
}
