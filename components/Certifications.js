import { html } from 'htm/preact';
import { BaseComponent } from './Base.js';

export class Certifications extends BaseComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.certifications !== this.props.certifications;
  }

  render() {
    const { certifications, config } = this.props;
    return html`
      <div class="certifications-grid">
        ${certifications.map(cert => html`
          <article key=${cert.name} class="certification-card">
            <i class="${config.components.certifications.icon}" aria-hidden="true"></i>
            <h3>${cert.name}</h3>
            <p>${cert.issuer}${cert.date ? ` - ${cert.date}` : ''}</p>
          </article>
        `)}
      </div>
    `;
  }
}
