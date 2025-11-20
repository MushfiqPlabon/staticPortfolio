import { html } from 'https://esm.sh/htm@3/preact';
import clsx from 'https://esm.sh/clsx@2';
import { BaseComponent } from './Base.js';
import { MobileDetector } from '../services/index.js';
import { CONFIG } from '../config.js';

export class Nav extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, isMobile: MobileDetector.isMobile() };
    this.toggle = this.toggle.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    MobileDetector.onChange(this.handleResize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isOpen !== this.state.isOpen || nextState.isMobile !== this.state.isMobile;
  }

  handleResize(e) {
    this.setState({ isMobile: e.matches, isOpen: false });
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
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
            <i class=${clsx('fas', this.state.isOpen ? CONFIG.css.faTimes : CONFIG.css.faBars)}></i>
          </button>
        `}
        <ul class=${clsx('nav-list', this.state.isMobile && !this.state.isOpen && CONFIG.css.hiddenClass)}>
          ${CONFIG.components.nav.sections.map(s => html`
            <li key=${s.id}>
              <a href="#${s.id}" onClick=${this.state.isMobile ? this.toggle : null}>
                <i class="${s.icon}" aria-hidden="true"></i> ${s.label}
              </a>
            </li>
          `)}
        </ul>
      </nav>
    `;
  }
}
