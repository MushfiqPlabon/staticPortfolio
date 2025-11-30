import { html } from "htm/preact";
import { BaseComponent } from "./Base"; // Should extend BaseComponent
import type { Config } from "../schemas";
import type { JSX } from "preact";

interface SectionProps {
  title: string;
  config: Config;
  children?: preact.ComponentChildren;
}

export class Section extends BaseComponent<SectionProps> {
  shouldComponentUpdate(nextProps: SectionProps): boolean {
    return (
      nextProps.title !== this.props.title ||
      nextProps.children !== this.props.children
    );
  }

  render(): JSX.Element {
    const { title, children } = this.props;
    return html`
      <section class="container">
        <h2 class="section-header">${title}</h2>
        ${children}
      </section>
    `;
  }
}
