import { html } from "htm/preact";
import clsx from "clsx";
import { BaseComponent } from "./Base";
import { ServiceRegistry } from "../services/ServiceRegistry";
import type { Config } from "../schemas";
import type { JSX } from "preact";

interface NavProps {
  config: Config;
  onNavClick: (sectionId: string) => void;
}

interface NavState {
  isOpen: boolean;
  isMobile: boolean;
}

export class Nav extends BaseComponent<NavProps, NavState> {
  private config: Config;

  constructor(props: NavProps) {
    super(props);
    this.config = props.config;
    const mobileDetector = ServiceRegistry.getInstance().getMobileDetectorService();
    this.state = { isOpen: false, isMobile: mobileDetector.isMobile() };
    this.toggle = this.toggle.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  componentDidMount(): void {
    ServiceRegistry.getInstance().getMobileDetectorService().onChange(this.handleResize);
  }

  shouldComponentUpdate(_nextProps: NavProps, nextState: NavState): boolean {
    return (
      nextState.isOpen !== this.state.isOpen ||
      nextState.isMobile !== this.state.isMobile
    );
  }

  handleResize(e: MediaQueryListEvent): void {
    this.setState({ isMobile: e.matches, isOpen: false });
  }

  toggle(): void {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  handleNavClick(e: Event): void {
    e.preventDefault();
    const target = e.currentTarget as HTMLAnchorElement;
    const id = target.getAttribute("href")?.substring(1) || "";
    this.props.onNavClick(id);

    if (this.state.isMobile) {
      this.toggle();
    }
  }

  render(): JSX.Element {
    return html`
      <nav class="nav" aria-label="Main navigation">
        ${
          this.state.isMobile &&
          html`
          <button 
            class="hamburger" 
            aria-label="Toggle navigation"
            aria-expanded=${this.state.isOpen}
            onClick=${this.toggle}
          >
            <i class=${clsx("fas", this.state.isOpen ? this.config.css.faTimes : this.config.css.faBars)}></i>
          </button>
        `
        }
        <ul class=${clsx("nav-list", this.state.isMobile && !this.state.isOpen && "hidden")}>
          ${this.config.components.nav.sections.map(
            (s) => html`
            <li key=${s.id}>
              <a href="#${s.id}" onClick=${this.handleNavClick}>
                <i class="${s.icon}" aria-hidden="true"></i> ${s.label}
              </a>
            </li>
          `,
          )}
        </ul>
      </nav>
    `;
  }
}
