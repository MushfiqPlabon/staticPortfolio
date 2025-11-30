import { html } from "htm/preact";
import { BaseComponent } from "./Base";
import { CTA } from "./CTA";
import type { Config, Profile } from "../schemas";
import type { JSX } from "preact";

interface HeroProps {
  profile: Profile;
  config: Config;
}

export class Hero extends BaseComponent<HeroProps> {
  shouldComponentUpdate(nextProps: HeroProps): boolean {
    return nextProps.profile !== this.props.profile;
  }

  render(): JSX.Element {
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
