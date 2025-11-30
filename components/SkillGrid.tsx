import { html } from "htm/preact";
import { BaseComponent } from "./Base";
import { SkillIconService } from "../services/SkillIconService";
import type { Config, Skills } from "../schemas";
import type { JSX } from "preact";

interface SkillGridProps {
  skills: Skills;
  config: Config;
}

export class SkillGrid extends BaseComponent<SkillGridProps> {
  private skillIconService: SkillIconService;

  constructor(props: SkillGridProps) {
    super(props);
    this.skillIconService = new SkillIconService(props.config); // Instantiate SkillIconService
  }

  shouldComponentUpdate(nextProps: SkillGridProps): boolean {
    return nextProps.skills !== this.props.skills;
  }

  render(): JSX.Element {
    const { skills, config } = this.props;
    const categoryMap: { [key: string]: string[] } = {
      Languages: skills.languages,
      "Frameworks & Libraries": skills.frameworks,
      "Database & Tools": skills.databasesAndTools,
      "AI & Workflow": skills.aiAndWorkflow,
      "Productivity Suites": skills.productivitySuites,
      "Business & Management": skills.businessAndManagement,
      "Technical Support": skills.technicalSupport,
    };

    const categories = config.components.skillCategories.map((title) => ({
      title,
      items: categoryMap[title] || [],
    }));

    return html`
      <div class="skills-grid">
        ${categories
          .filter((c) => c.items.length)
          .map(
            (cat) => html`
          <div key=${cat.title} class="skills-category">
            <h4>${cat.title}</h4>
            <ul>
              ${cat.items.map(
                (skill) => html`
                <li key=${skill}>
                  <i class="${this.skillIconService.getSkillIcon(skill)}" aria-hidden="true"></i>
                  ${skill}
                </li>
              `,
              )}
            </ul>
          </div>
        `,
          )}
      </div>
    `;
  }
}
