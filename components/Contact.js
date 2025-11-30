import { html } from 'htm/preact';
import { BaseComponent } from './Base.js';

export class Contact extends BaseComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.contact !== this.props.contact;
  }

  render() {
    const { contact, config } = this.props;
    const links = config.components.contact.links
      .filter(link => !link.optional || contact[link.key])
      .map(link => ({
        href: (link.prefix || '') + contact[link.key],
        icon: link.icon,
        label: link.label
      }));

    return html`
      <div class="contact-links">
        ${links.map(link => html`
          <a key=${link.label} href=${link.href} target="_blank" rel="noopener noreferrer" role="button" class="outline">
            <i class="${link.icon}"></i> ${link.label}
          </a>
        `)}
      </div>
    `;
  }
}
