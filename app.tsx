import { html } from "htm/preact";
import { Component, createRef, type RefObject } from "preact";
import {
  Nav,
  Hero,
  ProjectCard,
  SkillGrid,
  Timeline,
  Footer,
  Contact,
  Certifications,
  Section,
  ErrorBoundary,
} from "./components";
import { GsapScrollSpyController } from "./services/GsapScrollSpyController";
import { LozadLazyLoader } from "./services/LozadLazyLoader";
import { GsapAnimationController } from "./services/GsapAnimationController";
import type { Config, PortfolioData } from "./schemas";
import type { FeatureDetectionService } from "./services/FeatureDetectionService";

// Define interfaces for App component props and state
interface AppProps {
  config: Config;
  validatedData: PortfolioData;
  featureDetection: FeatureDetectionService;
}

interface AppState {
  hasError: boolean;
  error: Error | null;
  renderedSections: Set<string>;
  sectionRenderedByClick: string | null;
}

export class App extends Component<AppProps, AppState> {
  private config: Config;
  private validatedData: PortfolioData;
  private featureDetection: FeatureDetectionService;
  private sectionRefs: { [key: string]: RefObject<HTMLElement> };
  private navRef: RefObject<HTMLElement>;
  private animationController: GsapAnimationController;
  private lazyLoader: LozadLazyLoader;
  private scrollSpyController: GsapScrollSpyController | undefined;

  constructor(props: AppProps) {
    super(props);
    this.config = props.config;
    this.validatedData = props.validatedData;
    this.featureDetection = props.featureDetection;

    this.state = {
      hasError: false,
      error: null,
      renderedSections: new Set(["welcome-section"]),
      sectionRenderedByClick: null,
    };

    this.sectionRefs = this.config.components.nav.sections.reduce(
      (acc: { [key: string]: RefObject<HTMLElement> }, section) => {
        acc[section.id] = createRef();
        return acc;
      },
      {},
    );
    this.navRef = createRef();

    this.markSectionAsRendered = this.markSectionAsRendered.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.animationController = new GsapAnimationController();
    this.lazyLoader = new LozadLazyLoader(
      this.markSectionAsRendered,
      this.featureDetection,
      this.config,
    );
  }

  handleNavClick(sectionId: string): void {
    const allSectionIds = this.config.components.nav.sections.map((s) => s.id);
    const targetIndex = allSectionIds.indexOf(sectionId);
    if (targetIndex === -1) return; // Section not found in config

    // Create a set of all sections that need to be rendered, up to the target index.
    const sectionsToRenderUpToTarget = new Set(
      allSectionIds.slice(0, targetIndex + 1),
    );

    this.setState(
      (prevState) => ({
        renderedSections: new Set([
          ...prevState.renderedSections,
          ...sectionsToRenderUpToTarget,
        ]),
        sectionRenderedByClick: sectionId,
      }),
      () => {
        // Use a minimal timeout to ensure the DOM has been updated with all intermediate sections
        // before we attempt to scroll.
        setTimeout(() => {
          const sectionElement = document.getElementById(sectionId);
          if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: "auto" });
          } else {
            console.warn(
              `handleNavClick: Could not find element with id ${sectionId} after render.`,
            );
          }
        }, 0);
      },
    );
  }

  markSectionAsRendered(sectionId: string): void {
    if (!this.state.renderedSections.has(sectionId)) {
      this.setState((prevState) => ({
        renderedSections: new Set(prevState.renderedSections).add(sectionId),
      }));
    }
  }

  componentDidMount(): void {
    // 1. Initialize Scroll Spy for Nav
    if (this.navRef.current) {
      this.scrollSpyController = new GsapScrollSpyController(
        this.navRef.current,
        this.config,
      );
      this.scrollSpyController.init();
      // Create triggers for sections that are already rendered on load
      this.state.renderedSections.forEach((id) => {
        this.scrollSpyController?.createTriggerFor(id);
      });
    } else {
      console.warn(
        "navRef.current is null. GsapScrollSpyController not initialized.",
      );
    }

    // 2. Initialize Lazy Loading for Sections
    this.lazyLoader.init();
  }

  componentDidUpdate(_prevProps: AppProps, prevState: AppState): void {
    const newSections = [...this.state.renderedSections].filter(
      (id) => !prevState.renderedSections.has(id),
    );

    if (newSections.length > 0) {
      newSections.forEach((id) => {
        // Create a scroll trigger for the new section
        if (this.scrollSpyController) {
          this.scrollSpyController.createTriggerFor(id);
        }

        if (id !== this.state.sectionRenderedByClick) {
          const sectionElement = this.sectionRefs[id].current;
          if (sectionElement) {
            this.animationController.animate(sectionElement);
          } else {
            console.warn(
              `Section element with id ${id} not found for animation.`,
            );
          }
        }
      });

      if (this.state.sectionRenderedByClick) {
        this.setState({ sectionRenderedByClick: null });
      }
    }
  }

  componentDidCatch(error: Error, info: { componentStack?: string }): void {
    this.setState({ hasError: true, error });
    console.error("App component error:", error, info);
  }

  getSectionContent(
    sectionId: string,
    validatedData: PortfolioData,
    config: Config,
  ): preact.JSX.Element | null {
    const sectionTitleKey = sectionId.split("-")[0]; // e.g., "projects-section" -> "projects"
    const _title =
      config.components.sectionTitles[
        sectionTitleKey as keyof Config["components"]["sectionTitles"]
      ] || ""; // Fallback for safety

    switch (sectionId) {
      case "welcome-section":
        return html`<${Hero} profile=${validatedData.profile} config=${config} />`;
      case "projects-section":
        return html`<div class="projects-grid">${validatedData.projects.map((p) => html`<${ProjectCard} key=${p.id} project=${p} config=${config} />`)}</div>`;
      case "skills-section":
        return html`<${SkillGrid} skills=${validatedData.skills} config=${config} />`;
      case "experience-section":
        return html`<${Timeline} items=${validatedData.experience} type="experience" config=${config} />`;
      case "learning-section":
        return html`<${Timeline} items=${validatedData.learning} type="learning" config=${config} />`;
      case "certifications-section":
        return html`<${Certifications} certifications=${validatedData.certifications} config=${config} />`;
      case "contact-section":
        return html`<${Contact} contact=${validatedData.profile.contact} config=${config} />`;
      default:
        console.warn(`No content defined for section: ${sectionId}`);
        return null;
    }
  }

  render(): preact.JSX.Element {
    if (this.state.hasError) {
      const safeMessage = String(
        this.state.error?.message || this.props.config.errors.unknownError,
      );
      return html`<${ErrorBoundary} title=${this.props.config.errors.componentError} message=${safeMessage} config=${this.props.config} />`;
    }

    const { validatedData, config } = this.props;

    return html`
      <div ref=${this.navRef}>
        <${Nav} config=${config} onNavClick=${this.handleNavClick} />
      </div>
      <main>
        ${config.components.nav.sections.map((section) => {
          const isRendered = this.state.renderedSections.has(section.id);
          const sectionTitle =
            section.id === "welcome-section"
              ? ""
              : config.components.sectionTitles[
                  section.id.split(
                    "-",
                  )[0] as keyof Config["components"]["sectionTitles"]
                ] || "";

          return html`
            <div id=${section.id} ref=${this.sectionRefs[section.id]} class=${isRendered ? "" : "lozad"} data-section-id=${section.id}>
              ${
                isRendered
                  ? html`
                    <${Section} title=${sectionTitle} config=${config}>
                      ${this.getSectionContent(section.id, validatedData, config)}
                    </${Section}>
                  `
                  : html`<div style=${{ minHeight: "75vh" }} />`
              }
            </div>
          `;
        })}
      </main>
      <${Footer} profile=${validatedData.profile} config=${config} />
    `;
  }
}
