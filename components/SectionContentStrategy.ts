import { html } from "htm/preact";
import type { VNode } from "preact";
import type { Config, PortfolioData } from "../schemas";
import { Hero } from "./Hero";
import { SkillGrid } from "./SkillGrid";
import { ProjectCard } from "./ProjectCard";
import { Timeline } from "./Timeline";
import { Certifications } from "./Certifications";
import { Contact } from "./Contact";

/**
 * SectionContentStrategy - Strategy pattern for section content rendering
 * Eliminates switch statement complexity and improves maintainability
 */
interface SectionRenderer {
  render(data: PortfolioData, config: Config): VNode | null;
}

class WelcomeSectionRenderer implements SectionRenderer {
  render(data: PortfolioData, config: Config): VNode {
    return html`<${Hero} profile=${data.profile} config=${config} />`;
  }
}

class SkillsSectionRenderer implements SectionRenderer {
  render(data: PortfolioData, config: Config): VNode {
    return html`<${SkillGrid} skills=${data.skills} config=${config} />`;
  }
}

class ProjectsSectionRenderer implements SectionRenderer {
  render(data: PortfolioData, config: Config): VNode {
    return html`
      <div class="projects-grid">
        ${data.projects.map(
          (project) => html`<${ProjectCard} key=${project.id} project=${project} config=${config} />`,
        )}
      </div>
    `;
  }
}

class ExperienceSectionRenderer implements SectionRenderer {
  render(data: PortfolioData, config: Config): VNode {
    return html`<${Timeline} items=${data.experience} type="experience" config=${config} />`;
  }
}

class LearningSectionRenderer implements SectionRenderer {
  render(data: PortfolioData, config: Config): VNode {
    return html`<${Timeline} items=${data.learning} type="learning" config=${config} />`;
  }
}

class CertificationsSectionRenderer implements SectionRenderer {
  render(data: PortfolioData, config: Config): VNode {
    return html`<${Certifications} certifications=${data.certifications} config=${config} />`;
  }
}

class ContactSectionRenderer implements SectionRenderer {
  render(data: PortfolioData, config: Config): VNode {
    return html`<${Contact} contact=${data.profile.contact} config=${config} />`;
  }
}

export class SectionContentStrategy {
  private static strategies: Map<string, SectionRenderer> = new Map([
    ["welcome-section", new WelcomeSectionRenderer()],
    ["skills-section", new SkillsSectionRenderer()],
    ["projects-section", new ProjectsSectionRenderer()],
    ["experience-section", new ExperienceSectionRenderer()],
    ["learning-section", new LearningSectionRenderer()],
    ["certifications-section", new CertificationsSectionRenderer()],
    ["contact-section", new ContactSectionRenderer()],
  ]);

  static getSectionContent(
    sectionId: string,
    validatedData: PortfolioData,
    config: Config,
  ): VNode | null {
    const strategy = this.strategies.get(sectionId);
    return strategy ? strategy.render(validatedData, config) : null;
  }

  static registerStrategy(sectionId: string, renderer: SectionRenderer): void {
    this.strategies.set(sectionId, renderer);
  }

  static hasStrategy(sectionId: string): boolean {
    return this.strategies.has(sectionId);
  }
}
