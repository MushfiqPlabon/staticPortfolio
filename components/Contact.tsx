import { html } from "htm/preact";
import { BaseComponent } from "./Base";
import type { Config, Contact as ContactType } from "../schemas";
import type { JSX } from "preact";

interface ContactProps {
  contact: ContactType;
  config: Config;
}

export class Contact extends BaseComponent<ContactProps> {
  shouldComponentUpdate(nextProps: ContactProps): boolean {
    return nextProps.contact !== this.props.contact;
  }

  render(): JSX.Element {
    const { contact, config } = this.props;
    const links = config.components.contact.links
      .filter(
        (link) => !link.optional || contact[link.key as keyof ContactType],
      )
      .map((link) => ({
        href: (link.prefix || "") + contact[link.key as keyof ContactType],
        icon: link.icon,
        label: link.label,
      }));

    return html`
      <div class="contact-links">
        ${links.map(
          (link) => html`
          <a key=${link.label} href=${link.href} target="_blank" rel="noopener noreferrer" role="button" class="outline">
            <i class="${link.icon}"></i> ${link.label}
          </a>
        `,
        )}
      </div>
    `;
  }
}
