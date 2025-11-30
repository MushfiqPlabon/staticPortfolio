import { html } from "htm/preact";
import { BaseComponent } from "./Base";
import { ServiceRegistry } from "../services/ServiceRegistry";
import type { Config, Project } from "../schemas";
import type { JSX } from "preact";

interface ProjectCardProps {
  project: Project;
  config: Config;
}

export class ProjectCard extends BaseComponent<ProjectCardProps> {

  shouldComponentUpdate(nextProps: ProjectCardProps): boolean {
    return nextProps.project !== this.props.project;
  }

  handleImageLoad(e: Event): void {
    const target = e.target as HTMLImageElement;
    target.classList.add("loaded");
  }

  render(): JSX.Element {
    const { project, config } = this.props;
    const { title, stack, description, imageUrl, imageAlt, links } = project;
    const techBadges = stack.split(",").map((t) => t.trim());
    const cfg = config.components.projectCard;

    return html`
      <article class="project-card">
        <header>
          <img src=${imageUrl} alt=${imageAlt} loading="lazy" decoding="async" class="project-image" onLoad=${(e: Event) => this.handleImageLoad(e)} />
        </header>
        <div class="card-content">
          <h3>${title}</h3>
          <div class="tech-badges">
            ${techBadges.map(
              (tech) => html`
              <span key=${tech} class="tech-badge">
                <i class=\"${ServiceRegistry.getInstance().getSkillIconService().getSkillIcon(tech)}\" aria-hidden=\"true\"></i> ${tech}
              </span>
            `,
            )}
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
