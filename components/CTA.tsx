import { html } from "htm/preact";
import { BaseComponent } from "./Base";
import { Button } from "./Button";
import type { Config } from "../schemas";
import type { JSX } from "preact";

interface CTAProps {
  config: Config;
}

export class CTA extends BaseComponent<CTAProps> {
  shouldComponentUpdate(nextProps: CTAProps): boolean {
    const currentCta = this.props.config.components.hero.cta;
    const nextCta = nextProps.config.components.hero.cta;

    return (
      currentCta.primary.href !== nextCta.primary.href ||
      currentCta.primary.label !== nextCta.primary.label ||
      currentCta.secondary.href !== nextCta.secondary.href ||
      currentCta.secondary.label !== nextCta.secondary.label ||
      currentCta.resume.href !== nextCta.resume.href ||
      currentCta.resume.label !== nextCta.resume.label
    );
  }

  render(): JSX.Element {
    const { primary, secondary, resume } =
      this.props.config.components.hero.cta;

    return html`
      <div class="hero-cta">
        <${Button} 
          href="${primary.href}" 
          className="cta-primary" 
          icon="${primary.icon}" 
          label="${primary.label}" 
          external=${primary.external} 
        />
        <${Button} 
          href="${resume.href}" 
          className="cta-resume" 
          icon="${resume.icon}" 
          label="${resume.label}" 
          external=${resume.external} 
        />
        <${Button} 
          href="${secondary.href}" 
          className="cta-secondary outline" 
          icon="${secondary.icon}" 
          label="${secondary.label}" 
        />
      </div>
    `;
  }
}
