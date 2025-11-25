import { html } from 'https://esm.sh/htm@3/preact';
import { BaseComponent } from './Base.js';
import { CTA } from './index.js';

export class Hero extends BaseComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.profile !== this.props.profile;
  }

  render() {
    const { profile, config } = this.props;
    const { name, title, objective } = profile;

    return html`
      <section id=${config.components.heroSectionId} class="welcome-section container-fluid">
        <h1>${name}</h1>
        <p class="hero-title">${title}</p>
        <p class="hero-objective">${objective}</p>
        <${CTA} config=${config} />
      </section>
    `;
  }
}
