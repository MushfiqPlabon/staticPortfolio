import { html } from 'htm/preact';
import { BaseComponent } from './Base.js';
import { SkillIconService } from '../services/SkillIconService.js'; // Import SkillIconService

export class ProjectCard extends BaseComponent {
  constructor(props) {
    super(props);
    this.skillIconService = new SkillIconService(props.config); // Instantiate SkillIconService
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.project !== this.props.project;
  }

  handleImageLoad(e) {
    e.target.classList.add('loaded');
  }

  render() {
    const { project, config } = this.props;
    const { title, stack, description, imageUrl, imageAlt, links } = project;
    const techBadges = stack.split(',').map(t => t.trim());
    const cfg = config.components.projectCard;

    return html`
      <article class="project-card">
        <header>
          <img src=${imageUrl} alt=${imageAlt} loading="lazy" decoding="async" class="project-image" onLoad=${(e) => this.handleImageLoad(e)} />
        </header>
        <div class="card-content">
          <h3>${title}</h3>
          <div class="tech-badges">
            ${techBadges.map(tech => html`
              <span key=${tech} class="tech-badge">
                <i class="${this.skillIconService.getSkillIcon(tech)}" aria-hidden="true"></i> ${tech}
              </span>
            `)}
          </div>
          <p>${description}</p>
          <div class="project-links">
            ${links.live && html`<a href=${links.live} target="_blank" rel="noopener noreferrer" role="button" class="secondary">${cfg.labels.liveSite} <i class="${cfg.externalIcon}"></i></a>`}
            ${links.githubFrontend && html`<a href=${links.githubFrontend} target="_blank" rel="noopener noreferrer" role="button">${cfg.labels.frontend} <i class="${cfg.githubIcon}"></i></a>`}
            ${links.githubBackend && html`<a href=${links.githubBackend} target="_blank" rel="noopener noreferrer" role="button">${cfg.labels.backend} <i class="${cfg.githubIcon}"></i></a>`}
            ${links.github && !links.githubFrontend && !links.githubBackend && html`<a href=${links.github} target="_blank" rel="noopener noreferrer" role="button">${cfg.labels.github} <i class="${cfg.githubIcon}"></i></a>`}
          </div>
        </div>
      </article>
    `;
  }
}
