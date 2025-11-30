import { render } from 'preact';
import { html } from 'htm/preact';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AssetService } from './services/AssetService.js';
import { StyleService } from './styles/StyleService.js';
import { RAW_CONFIG } from './config.js';
import { App } from './app.js';
import { ErrorBoundary } from './components/ErrorBoundary.js';
import { DataService } from './services/DataService.js';
import { FeatureDetectionService } from './services/FeatureDetectionService.js';
import { ErrorTrackingService } from './services/ErrorTrackingService.js';

class Application {
  constructor() {
    this.root = document.getElementById('root');
    this.config = RAW_CONFIG;
    this.assetService = new AssetService();
    this.dataService = new DataService('./data/portfolioData.json', this.config);
    this.styleService = new StyleService();
    this.featureDetection = new FeatureDetectionService(this.config);
    this.errorTracking = new ErrorTrackingService(this.config);
  }

  async registerServiceWorker() {
    if (this.featureDetection.hasFeature('serviceWorker')) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.warn('Service Worker registration failed:', error);
      }
    }
  }


  async init() {
    try {
      if (!this.root) {
        throw new Error('Root element not found');
      }

      this.featureDetection.logFeatures();

      if (!this.featureDetection.isFullySupported()) {
        console.warn('Browser missing required features, some functionality may not work');
      }

      if (this.config.errorTracking.enabled) {
        this.errorTracking.init();
      }

      await this.registerServiceWorker();

      // Initialize services and libraries
      this.styleService.init(this.config);
      gsap.registerPlugin(ScrollTrigger);

      // Load external assets with fallbacks (parallel loading for efficiency)
      await Promise.all([
        this.assetService.loadScript(
          this.config.assets.fontAwesomeKit.primary, 
          true, 
          false, 
          this.config.assets.fontAwesomeKit.fallback
        ),
        this.assetService.loadCss(
          this.config.assets.simpleIconsCSS.primary, 
          this.config.assets.simpleIconsCSS.fallback
        )
      ]);

      // Fetch and validate portfolio data
      const validatedPortfolioData = await this.dataService.getPortfolioData();

      // Render the main Preact component
      render(html`<${App} config=${this.config} validatedData=${validatedPortfolioData} featureDetection=${this.featureDetection} />`, this.root);

    } catch (error) {
      console.error('Application initialization failed:', error);
      if (this.root) {
        const safeMessage = String(error?.message || this.config.errors.unknownError).replace(/</g, '&lt;').replace(/>/g, '&gt;');
        render(html`<${ErrorBoundary} title=${this.config.errors.appError} message=${safeMessage} config=${this.config} />`, this.root);
      }
    }
  }
}

// Main entry point
document.addEventListener('DOMContentLoaded', () => {
  const app = new Application();
  app.init();
});