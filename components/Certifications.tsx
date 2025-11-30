import { html } from "htm/preact";
import { BaseComponent } from "./Base";
import type { Config, Certification } from "../schemas";
import type { JSX } from "preact";

interface CertificationsProps {
  certifications: Certification[];
  config: Config;
}

export class Certifications extends BaseComponent<CertificationsProps> {
  shouldComponentUpdate(nextProps: CertificationsProps): boolean {
    return nextProps.certifications !== this.props.certifications;
  }

  render(): JSX.Element {
    const { certifications, config } = this.props;
    return html`
      <div class="certifications-grid">
        ${certifications.map(
          (cert) => html`
          <article key=${cert.name} class="certification-card">
            <i class="${config.components.certifications.icon}" aria-hidden="true"></i>
            <h3>${cert.name}</h3>
            <p>${cert.issuer}${cert.date ? ` - ${cert.date}` : ""}</p>
          </article>
        `,
        )}
      </div>
    `;
  }
}
