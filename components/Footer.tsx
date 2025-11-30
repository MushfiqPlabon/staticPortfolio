import { html } from "htm/preact";
import { BaseComponent } from "./Base";
import type { Config, Profile } from "../schemas";
import type { JSX } from "preact";

interface FooterProps {
  profile: Profile;
  config: Config;
}

interface FooterState {
  socialLinks: Array<{ key: string; icon: string; label: string; optional?: boolean; prefix?: string }>;
}

export class Footer extends BaseComponent<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);
    this.state = {
      socialLinks: this.filterSocialLinks(props.profile.contact, props.config),
    };
  }

  filterSocialLinks(contact: typeof this.props.profile.contact, config: Config) {
    return config.components.contact.links.filter(
      (l) =>
        !l.optional ||
        (contact[l.key as keyof typeof contact] !== undefined &&
          contact[l.key as keyof typeof contact] !== null),
    );
  }

  shouldComponentUpdate(nextProps: FooterProps, nextState: FooterState): boolean {
    if (nextProps.profile !== this.props.profile) {
      const newLinks = this.filterSocialLinks(nextProps.profile.contact, nextProps.config);
      if (JSON.stringify(newLinks) !== JSON.stringify(this.state.socialLinks)) {
        this.setState({ socialLinks: newLinks });
        return true;
      }
    }
    return this.state.socialLinks !== nextState.socialLinks;
  }

  render(): JSX.Element {
    const { profile, config } = this.props;
    const { name, contact } = profile;
    const navSections = config.components.nav.sections;
    const { socialLinks } = this.state;
    const footerLabels = config.components.footer.sections;

    return html`
      <footer>
        <div class="footer-content">
          <div class="footer-section">
            <h4>${footerLabels.quickLinks}</h4>
            <ul class="footer-links">
              ${navSections.map(
                (s) => html`
                <li key=${s.id}><a href="#${s.id}"><i class="${s.icon}"></i> ${s.label}</a></li>
              `,
              )}
            </ul>
          </div>
          <div class="footer-section">
            <h4>${footerLabels.connect}</h4>
            <ul class="footer-social">
              ${socialLinks.map(
                (link) => html`
                <li key=${link.key}>
                  <a href="${(link.prefix || "") + (contact[link.key as keyof typeof contact] || "")}" target="_blank" rel="noopener noreferrer">
                    <i class="${link.icon}"></i> ${link.label}
                  </a>
                </li>
              `,
              )}
            </ul>
          </div>
        </div>
        <small>Made with <i class="${config.components.footer.heartIcon}" aria-hidden="true"></i> © ${new Date().getFullYear()} ${name}. All rights reserved.</small>
      </footer>
    `;
  }
}
