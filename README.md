# Modern Static Portfolio

Welcome to the repository for my personal static portfolio. This project, which started as a simple course assignment, has evolved into a sophisticated, high-performance showcase of modern web development techniques, featuring **zero-latency first load** through aggressive optimization.

## About This Project

This portfolio demonstrates a modern, component-based architecture using Preact and a service-oriented design. The application is fully data-driven, with all content, from project details to UI configuration, managed in centralized data and config files. Built with **Bun** and **Vite** for blazing-fast builds and optimal production bundles.

It serves as both a personal showcase and a sandbox for experimenting with performance optimization, clean code, and advanced front-end patterns.

**Please Note:** This project prioritizes architectural purity and performance experimentation. For my latest professional work, please refer to the links within the portfolio itself.

---

## Key Features

- **⚡ Zero-Latency First Load:** Optimized bundle splitting, compression (Brotli + Gzip), and aggressive caching for instant page loads.
- **🏗️ Modern Build System:** Powered by Bun and Vite for lightning-fast builds and optimal production bundles.
- **🎯 Component-Based Architecture:** Built with Preact and HTM for a modern, reusable UI structure.
- **🔧 Service-Oriented Design:** Logic is decoupled into dedicated services for concerns like asset loading, data fetching, and animations.
- **📊 Data-Driven Content:** All text, project data, and configurations are externalized into `*.json` and `*.js` files.
- **🎬 High-Performance Animations:** Uses GSAP (GreenSock Animation Platform) and ScrollTrigger for smooth, efficient animations.
- **🚀 Lazy Loading:** Page sections and images are lazy-loaded using `lozad.js` to ensure a fast initial page load.
- **🎨 Styling with CSS-in-JS:** All styles are generated programmatically using `goober` for a dynamic and maintainable styling system.
- **✅ Schema-Validated Data:** Uses `zod` to validate all incoming data from JSON, ensuring data integrity and preventing runtime errors.
- **📱 Responsive & Accessible:** Designed to work across all device sizes with accessibility features like ARIA attributes and reduced motion preferences.
- **🗜️ Advanced Compression:** Automatic Brotli and Gzip compression for all assets, reducing transfer sizes by up to 70%.
- **📦 Code Splitting:** Smart chunking strategy separating vendor libraries from application code for optimal caching.

---

## Technologies Used

### Core Stack
- **Build Tools:** [Bun](https://bun.sh/) (ultra-fast JavaScript runtime) & [Vite](https://vitejs.dev/) (next-generation frontend tooling)
- **UI Rendering:** [Preact](https://preactjs.com/) (a fast 3kB alternative to React) with [HTM](https://github.com/developit/htm)
- **Styling:** [goober](https://github.com/cristianbote/goober) (lightweight CSS-in-JS library)
- **Animation:** [GSAP](https://gsap.com/) with [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) plugin
- **Data Validation:** [Zod](https://zod.dev/) for schema validation
- **Lazy Loading:** [lozad.js](https://github.com/ApoorvSaxena/lozad.js) for performant lazy-loading
- **Icons:** [Font Awesome](https://fontawesome.com/) and [Simple Icons](https://simpleicons.org/)
- **Utilities:** [clsx](https://github.com/lukeed/clsx) for constructing class names

### Build Optimizations
- **Legacy Support:** Modern and legacy bundles for broad browser compatibility
- **Compression:** Vite plugin for automatic Brotli and Gzip compression
- **Minification:** Advanced Terser configuration with aggressive optimizations
- **Bundle Analysis:** Rollup visualizer for bundle size monitoring

---

## Performance Metrics

- **First Load Bundle:** < 150KB (gzipped)
- **Preact Vendor Chunk:** ~5KB (gzipped)
- **Animation Vendor (GSAP):** ~27KB (gzipped)
- **Main Application:** ~42KB (gzipped)
- **Compression Ratio:** Up to 70% size reduction with Brotli

---

## How to View

You can view the live demo of this portfolio directly in your browser:

[Live Demo](https://mushfiqplabon.github.io/staticPortfolio/)

---

## Getting Started (for Developers)

### Prerequisites

- [Bun](https://bun.sh/) (latest version recommended)

### Installation & Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MushfiqPlabon/StaticPortfolio.git
    ```
    
2.  **Navigate to the project directory:**
    ```bash
    cd StaticPortfolio
    ```
    
3.  **Install dependencies:**
    ```bash
    bun install
    ```
    
4.  **Start development server:**
    ```bash
    bun run dev
    ```
    This will start the Vite dev server with hot module replacement (HMR) at `http://localhost:3000`

### Production Build

```bash
bun run build
```

This creates an optimized production bundle in the `dist/` directory with:
- Minified and tree-shaken code
- Code splitting for optimal caching
- Both modern and legacy browser bundles
- Brotli and Gzip compressed assets
- Bundle size analysis report

### Preview Production Build

```bash
bun run preview
```

This serves the production build locally at `http://localhost:4173` for testing.

---

## Project Structure

```
├── components/          # Preact UI components
├── services/           # Service layer (data, animations, lazy loading)
├── styles/             # CSS-in-JS styling service
├── public/             # Static assets (images, data, service worker)
│   ├── data/          # Portfolio data JSON
│   ├── images/        # Project images
│   └── service-worker.js
├── config.js          # Application configuration
├── schemas.js         # Zod validation schemas
├── main.js           # Application entry point
├── app.js            # Main App component
├── index.html        # HTML entry point
├── vite.config.js    # Vite build configuration
└── package.json      # Dependencies and scripts
```

---

## CI/CD

This project uses GitHub Actions for automated builds and deployment to GitHub Pages. On every push to the `main` branch:

1. Dependencies are installed using Bun
2. Production build is created with Vite
3. Optimized bundle is deployed to GitHub Pages

See `.github/workflows/static.yml` for the complete workflow.

---

---

## Architecture Overview

### Design Patterns

This project implements enterprise-grade architectural patterns:

1. **Singleton Pattern** - `ServiceRegistry` provides centralized service management
2. **Strategy Pattern** - `SectionContentStrategy` eliminates switch statement complexity
3. **Dependency Injection** - All services accept `Config` via constructor
4. **Memoization** - Performance-critical operations cached in component state

### Services Layer

All services follow SOLID principles with zero hardcoded values:

#### ServiceRegistry (Singleton)
Centralized service management eliminating duplicate instances:
```typescript
import { ServiceRegistry } from "./services/ServiceRegistry";

// Initialize once
ServiceRegistry.getInstance(config);

// Access services anywhere
const skillIconService = ServiceRegistry.getInstance().getSkillIconService();
const logger = ServiceRegistry.getInstance().getLoggerService();
```

#### LoggerService
Environment-aware centralized logging controlled by `config.errorTracking.enabled`:
```typescript
const logger = ServiceRegistry.getInstance().getLoggerService();
logger.log("Info message");
logger.error("Error message");
```

#### Core Services
- **AssetService** - Dynamic CSS/JS loading with fallback support
- **DataService** - Fetch with configurable retry logic and Zod validation
- **ErrorTrackingService** - Error monitoring with automatic cleanup
- **FeatureDetectionService** - Browser capability detection with caching
- **GsapAnimationController** - GSAP animations with config-driven parameters
- **GsapScrollSpyController** - Navigation scroll spy with ScrollTrigger
- **LozadLazyLoader** - Lazy loading with IntersectionObserver
- **SkillIconService** - Skill icon mapping with aliases
- **MobileDetectorService** - Responsive behavior with configurable breakpoint

All service behavior is controlled via `config.ts` with 60+ configuration properties.

### Components

#### SectionContentStrategy (Strategy Pattern)
Eliminates switch statement complexity for section rendering:
```typescript
// Before: 27-line switch statement
switch (sectionId) {
  case "welcome-section": return html`<${Hero} ... />`;
  // ... 7 more cases
}

// After: Single line
return SectionContentStrategy.getSectionContent(sectionId, data, config);
```

Adding new sections:
```typescript
class NewSectionRenderer implements SectionRenderer {
  render(data: PortfolioData, config: Config): VNode {
    return html`<${MyComponent} data=${data} config=${config} />`;
  }
}

SectionContentStrategy.registerStrategy("new-section", new NewSectionRenderer());
```

#### Component Architecture
- **BaseComponent** - Abstract base for all components
- **Performance Optimization** - `shouldComponentUpdate` prevents unnecessary renders
- **Memoization** - Footer component caches expensive filter operations

#### Component List
**Presentational:** Hero, ProjectCard, SkillGrid, Timeline, Certifications, Contact, CTA, Section  
**Container:** App, Nav, Footer  
**Utility:** ErrorBoundary, Base

### Configuration-Driven Design

**Zero hardcoded values** - Everything configurable via `config.ts`:

```typescript
// Paths
config.paths = {
  serviceWorker: "/service-worker.js",
  dataFile: "./data/portfolioData.json",
  mainJs: "/main.ts",
}

// Timeouts
config.timeouts = {
  scrollDelay: 0,
  sectionRenderDelay: 100,
  retryDelay: 1000,
}

// GSAP Animations
config.gsap = {
  scrollTriggerStart: "top center",
  animationDuration: 1,
  animationEase: "power3.out",
}

// Error Tracking
config.errorTracking = {
  enabled: true,
  maxErrors: 100,
  cleanupIntervalMs: 3600000,
}
```

### Best Practices

1. **Use ServiceRegistry** for shared services (no duplicate instances)
2. **Use LoggerService** instead of console statements
3. **Implement shouldComponentUpdate** for performance
4. **All configuration in config.ts** - zero hardcoding
5. **Dependency injection** - pass Config to all services

### Code Quality

- **TypeScript**: 100% type coverage, 0 compilation errors
- **No Hardcoding**: All values configurable
- **No Console Statements**: Centralized logging via LoggerService
- **Zero Duplication**: Singleton pattern eliminates redundancy
- **Low Complexity**: Strategy pattern reduces cyclomatic complexity
- **SOLID Principles**: Single responsibility, dependency injection

### Performance Optimizations

- **Singleton Services**: Reduced memory footprint
- **Memoization**: Cached expensive operations (Footer filter)
- **Strategy Pattern**: Reduced conditional branching
- **Lazy Loading**: Deferred section rendering
- **Code Splitting**: Vendor/app separation for optimal caching

---

## License

This project is open-source and available under the [MIT License](LICENSE).