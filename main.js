import { render } from 'https://esm.sh/preact@10';
import { AssetService } from './services/AssetService.js';
import { Styles } from './styles/StyleService.js';
import { RAW_CONFIG } from './config.js';
import { App } from './app.js';
import { ErrorBoundary } from './components/ErrorBoundary.js';
import { html } from 'https://esm.sh/htm@3/preact';
import { DataService } from './services/DataService.js';
import { initFluid } from "https://cdn.jsdelivr.net/npm/smokey-fluid-cursor@latest/dist/index.mjs";
import { InputModeController } from './services/InputModeController.js';

class Application {
  constructor() {
    this.root = document.getElementById('root');
    this.config = RAW_CONFIG;
    this.assetService = new AssetService();
    this.dataService = new DataService('./data/portfolioData.json', this.config);
  }

  async init() {
    try {
      if (!this.root) {
        throw new Error('Root element not found');
      }

      // Initialize services and libraries
      Styles.init(this.config);
      gsap.registerPlugin(ScrollTrigger);
      
      const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      if (!isTouchDevice) {
        initFluid();
      }
      
      new InputModeController().init();

      // Load external assets
      this.assetService.loadScript(this.config.assets.fontAwesomeKit, true, false);
      this.assetService.loadCss(this.config.assets.simpleIconsCSS);

      // Fetch and validate portfolio data
      const validatedPortfolioData = await this.dataService.getPortfolioData();

      // Render the main Preact component
      render(html`<${App} config=${this.config} validatedData=${validatedPortfolioData} />`, this.root);

    } catch (error) {
      console.error('Application initialization failed:', error);
      if (this.root) {
        const safeMessage = String(error?.message || this.config.errors.unknownError).replace(/</g, '&lt;').replace(/>/g, '&gt;');
        render(html`<${ErrorBoundary} title=${this.config.errors.appError} message=${safeMessage} />`, this.root);
      }
    }
  }
}

// Main entry point
document.addEventListener('DOMContentLoaded', () => {
  const app = new Application();
  app.init();
});