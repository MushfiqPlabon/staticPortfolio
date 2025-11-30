import { html } from "htm/preact";
import { BaseComponent } from "./Base";
import type { JSX } from "preact";

interface ButtonProps {
  href: string;
  className?: string;
  icon: string;
  label: string;
  external?: boolean;
}

export class Button extends BaseComponent<ButtonProps> {
  shouldComponentUpdate(nextProps: ButtonProps): boolean {
    return (
      nextProps.href !== this.props.href ||
      nextProps.className !== this.props.className ||
      nextProps.icon !== this.props.icon ||
      nextProps.label !== this.props.label ||
      nextProps.external !== this.props.external
    );
  }

  render(): JSX.Element {
    const { href, className, icon, label, external } = this.props;

    return html`
      <a
        href="${href}"
        class="${className}"
        role="button"
        ${external ? 'target="_blank" rel="noopener noreferrer"' : ""}
      >
        <i class="${icon}"></i> ${label}
      </a>
    `;
  }
}
