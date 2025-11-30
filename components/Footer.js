import { html } from 'htm/preact';
import { BaseComponent } from './Base.js';

export class Footer extends BaseComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.profile !== this.props.profile;
  }

  render() {
    const { profile, config } = this.props;
    const { name, contact } = profile;
    const navSections = config.components.nav.sections;
    const socialLinks = config.components.contact.links.filter(l => !l.optional || contact[l.key]);
    const footerLabels = config.components.footer.sections;
    
    return html`
      <footer>
        <div class="footer-content">
          <div class="footer-section">
            <h4>${footerLabels.quickLinks}</h4>
            <ul class="footer-links">
              ${navSections.map(s => html`
                <li key=${s.id}><a href="#${s.id}"><i class="${s.icon}"></i> ${s.label}</a></li>
              `)}
            </ul>
          </div>
          <div class="footer-section">
            <h4>${footerLabels.connect}</h4>
            <ul class="footer-social">
              ${socialLinks.map(link => html`
                <li key=${link.key}>
                  <a href="${(link.prefix || '') + contact[link.key]}" target="_blank" rel="noopener noreferrer">
                    <i class="${link.icon}"></i> ${link.label}
                  </a>
                </li>
              `)}
            </ul>
          </div>
        </div>
        <small>Made with <i class="${config.components.footer.heartIcon}" aria-hidden="true"></i> © ${new Date().getFullYear()} ${name}. All rights reserved.</small>
      </footer>
    `;
  }
}
