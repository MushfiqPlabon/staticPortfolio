import { html } from 'htm/preact';
import clsx from 'clsx';
import { BaseComponent } from './Base.js';
import { MobileDetectorService } from '../services/MobileDetectorService.js';

export class Nav extends BaseComponent {
  constructor(props) {
    super(props);
    this.config = props.config;
    this.mobileDetector = new MobileDetectorService(this.config);
    this.state = { isOpen: false, isMobile: this.mobileDetector.isMobile() };
    this.toggle = this.toggle.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  componentDidMount() {
    this.mobileDetector.onChange(this.handleResize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isOpen !== this.state.isOpen || 
           nextState.isMobile !== this.state.isMobile;
  }

  handleResize(e) {
    this.setState({ isMobile: e.matches, isOpen: false });
  }

  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  handleNavClick(e) {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('href').substring(1);
    this.props.onNavClick(id);

    if (this.state.isMobile) {
      this.toggle();
    }
  }

  render() {
    return html`
      <nav class="nav" aria-label="Main navigation">
        ${this.state.isMobile && html`
          <button 
            class="hamburger" 
            aria-label="Toggle navigation"
            aria-expanded=${this.state.isOpen}
            onClick=${this.toggle}
          >
            <i class=${clsx('fas', this.state.isOpen ? this.config.css.faTimes : this.config.css.faBars)}></i>
          </button>
        `}
        <ul class=${clsx('nav-list', this.state.isMobile && !this.state.isOpen && 'hidden')}>
          ${this.config.components.nav.sections.map(s => html`
            <li key=${s.id}>
              <a href="#${s.id}" onClick=${this.handleNavClick}>
                <i class="${s.icon}" aria-hidden="true"></i> ${s.label}
              </a>
            </li>
          `)}
        </ul>
      </nav>
    `;
  }
}