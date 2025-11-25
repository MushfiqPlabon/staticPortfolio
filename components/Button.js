import { html } from 'https://esm.sh/htm@3/preact';
import { BaseComponent } from './Base.js';

export class Button extends BaseComponent {
  render() {
    const { href, className, icon, label, external } = this.props;

    return html`
      <a
        href="${href}"
        class="${className}"
        role="button"
        ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}
      >
        <i class="${icon}"></i> ${label}
      </a>
    `;
  }
}
