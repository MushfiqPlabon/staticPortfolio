import { html } from 'htm/preact';
import { BaseComponent } from './Base.js';
import { SkillIconService } from '../services/SkillIconService.js'; // Import SkillIconService

export class SkillGrid extends BaseComponent {
  constructor(props) {
    super(props);
    this.skillIconService = new SkillIconService(props.config); // Instantiate SkillIconService
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.skills !== this.props.skills;
  }

  render() {
    const { skills, config } = this.props;
    const categoryMap = {
      'Languages': skills.languages,
      'Frameworks & Libraries': skills.frameworks,
      'Database & Tools': skills.databasesAndTools,
      'AI & Workflow': skills.aiAndWorkflow,
      'Productivity Suites': skills.productivitySuites,
      'Business & Management': skills.businessAndManagement,
      'Technical Support': skills.technicalSupport
    };
    
    const categories = config.components.skillCategories.map(title => ({
      title,
      items: categoryMap[title] || []
    }));

    return html`
      <div class="skills-grid">
        ${categories.filter(c => c.items.length).map(cat => html`
          <div key=${cat.title} class="skills-category">
            <h4>${cat.title}</h4>
            <ul>
              ${cat.items.map(skill => html`
                <li key=${skill}>
                  <i class="${this.skillIconService.getSkillIcon(skill)}" aria-hidden="true"></i>
                  ${skill}
                </li>
              `)}
            </ul>
          </div>
        `)}
      </div>
    `;
  }
}
