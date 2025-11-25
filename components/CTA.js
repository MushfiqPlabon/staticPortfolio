import { html } from 'https://esm.sh/htm@3/preact';
import { BaseComponent } from './Base.js';
import { Button } from './Button.js';

export class CTA extends BaseComponent {
  render() {
    const { primary, secondary, resume } = this.props.config.components.hero.cta;

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
