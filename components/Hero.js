import { html } from 'https://esm.sh/htm@3/preact';
import { BaseComponent } from './Base.js';
import { CONFIG } from '../config.js';

export class Hero extends BaseComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.profile !== this.props.profile;
  }

  render() {
    const { name, title, objective } = this.props.profile;
    const { primary, secondary, resume } = CONFIG.components.hero.cta;

    return html`
      <section id="welcome-section" class="welcome-section container-fluid">
        <h1>${name}</h1>
        <p class="hero-title">${title}</p>
        <p class="hero-objective">${objective}</p>
        <div class="hero-cta">
          <a href="${primary.href}" ${primary.external ? 'target="_blank" rel="noopener noreferrer"' : ''} role="button" class="cta-primary">
            <i class="${primary.icon}"></i> ${primary.label}
          </a>
          <a href="${resume.href}" ${resume.external ? 'target="_blank" rel="noopener noreferrer"' : ''} role="button" class="cta-resume">
            <i class="${resume.icon}"></i> ${resume.label}
          </a>
          <a href="${secondary.href}" role="button" class="cta-secondary outline">
            <i class="${secondary.icon}"></i> ${secondary.label}
          </a>
        </div>
      </section>
    `;
  }
}
