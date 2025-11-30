import { render } from "preact";
import { html } from "htm/preact";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AssetService } from "./services/AssetService";
import { StyleService } from "./styles/StyleService";
import { RAW_CONFIG } from "./config";
import { App } from "./app";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { DataService } from "./services/DataService";
import { FeatureDetectionService } from "./services/FeatureDetectionService";
import { ErrorTrackingService } from "./services/ErrorTrackingService";
import type { Config, PortfolioData } from "./schemas";

class Application {
  private root: HTMLElement | null;
  private config: Config;
  private assetService: AssetService;
  private dataService: DataService;
  private styleService: StyleService;
  private featureDetection: FeatureDetectionService;
  private errorTracking: ErrorTrackingService;

  constructor() {
    this.root = document.getElementById("root");
    this.config = RAW_CONFIG;
    this.assetService = new AssetService();
    this.dataService = new DataService(
      "./data/portfolioData.json",
      this.config,
    );
    this.styleService = new StyleService();
    this.featureDetection = new FeatureDetectionService(this.config);
    this.errorTracking = new ErrorTrackingService(this.config);
  }

  async registerServiceWorker(): Promise<void> {
    if (this.featureDetection.hasFeature("serviceWorker")) {
      try {
        const registration = await navigator.serviceWorker.register(
          "/service-worker.js",
          { scope: "/" },
        );
        console.log("Service Worker registered:", registration);
      } catch (error: unknown) {
        console.warn("Service Worker registration failed:", error);
      }
    }
  }

  async init(): Promise<void> {
    try {
      if (!this.root) {
        throw new Error("Root element not found");
      }

      this.featureDetection.logFeatures();

      if (!this.featureDetection.isFullySupported()) {
        console.warn(
          "Browser missing required features, some functionality may not work",
        );
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
          this.config.assets.fontAwesomeKit.fallback,
        ),
        this.assetService.loadCss(
          this.config.assets.simpleIconsCSS.primary,
          this.config.assets.simpleIconsCSS.fallback,
        ),
      ]);

      // Fetch and validate portfolio data
      const validatedPortfolioData: PortfolioData =
        await this.dataService.getPortfolioData();

      // Render the main Preact component
      render(
        html`<${App} config=${this.config} validatedData=${validatedPortfolioData} featureDetection=${this.featureDetection} />`,
        this.root,
      );
    } catch (error: unknown) {
      console.error("Application initialization failed:", error);
      if (this.root) {
        const safeMessage = String(
          (error as Error)?.message || this.config.errors.unknownError,
        )
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        render(
          html`<${ErrorBoundary} title=${this.config.errors.appError} message=${safeMessage} config=${this.config} />`,
          this.root,
        );
      }
    }
  }
}

// Main entry point
document.addEventListener("DOMContentLoaded", () => {
  const app = new Application();
  app.init();
});
