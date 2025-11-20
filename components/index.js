import { html } from 'https://esm.sh/htm@3/preact';
import { BaseComponent } from './Base.js';
import { CONFIG } from '../config.js';

// SkillGrid Component
export class SkillGrid extends BaseComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.skills !== this.props.skills;
  }

  render() {
    const { skills } = this.props;
    const categoryMap = {
      'Languages': skills.languages,
      'Frameworks & Libraries': skills.frameworks,
      'Database & Tools': skills.databasesAndTools,
      'AI & Workflow': skills.aiAndWorkflow,
      'Productivity Suites': skills.productivitySuites,
      'Business & Management': skills.businessAndManagement,
      'Technical Support': skills.technicalSupport
    };
    
    const categories = CONFIG.components.skillCategories.map(title => ({
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
                  <i class="${this.getSkillIcon(skill)}" aria-hidden="true"></i>
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

// Timeline Component
export class Timeline extends BaseComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items || nextProps.type !== this.props.type;
  }

  render() {
    const { items, type } = this.props;
    if (!items || !Array.isArray(items)) return null;
    
    const config = CONFIG.components.timeline[type] || CONFIG.components.timeline.education;

    return html`
      ${items.map((item, idx) => {
        if (!item) return null;
        return html`
          <article key=${idx} class="${type}-card timeline-item">
            <div class="timeline-marker">
              <i class="${config.icon}" aria-hidden="true"></i>
            </div>
            <div class="timeline-content">
              <h3>${item[config.titleKey] || ''}</h3>
              ${config.subtitleKey && item[config.subtitleKey] && html`<h4 class="company">${item[config.subtitleKey]}</h4>`}
              <p class="${type}-${config.subtitleKey ? 'duration' : 'institution'}">
                ${item.duration || ''}${config.locationKey && item[config.locationKey] ? ` • ${item[config.locationKey]}` : ''}
              </p>
              ${item[config.detailsKey]?.slice(0, config.maxDetails).length > 0 && html`
                <ul>
                  ${item[config.detailsKey].slice(0, config.maxDetails).map(d => html`<li key=${d}>${d}</li>`)}
                </ul>
              `}
            </div>
          </article>
        `;
      })}
    `;
  }
}

// Footer Component
export class Footer extends BaseComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.profile !== this.props.profile;
  }

  render() {
    const { name, contact } = this.props.profile;
    const navSections = CONFIG.components.nav.sections;
    const socialLinks = CONFIG.components.contact.links.filter(l => !l.optional || contact[l.key]);
    const footerLabels = CONFIG.components.footer.sections;
    
    return html`
      <footer>
        <div class="footer-content">
          <div class="footer-section">
            <h4>${footerLabels.quickLinks}</h4>
            <ul class="footer-links">
              ${navSections.map(s => html`
                <li key=${s.id}><a href="#${s.id}"><i class="${s.icon}"></i> ${s.label}</a></li>
              `)}
            </ul>
          </div>
          <div class="footer-section">
            <h4>${footerLabels.connect}</h4>
            <ul class="footer-social">
              ${socialLinks.map(link => html`
                <li key=${link.key}>
                  <a href="${(link.prefix || '') + contact[link.key]}" target="_blank" rel="noopener noreferrer">
                    <i class="${link.icon}"></i> ${link.label}
                  </a>
                </li>
              `)}
            </ul>
          </div>
        </div>
        <small>Made with <i class="${CONFIG.components.footer.heartIcon}" aria-hidden="true"></i> © ${new Date().getFullYear()} ${name}. All rights reserved.</small>
      </footer>
    `;
  }
}

// Contact Component
export class Contact extends BaseComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.contact !== this.props.contact;
  }

  render() {
    const { contact } = this.props;
    const links = CONFIG.components.contact.links
      .filter(link => !link.optional || contact[link.key])
      .map(link => ({
        href: (link.prefix || '') + contact[link.key],
        icon: link.icon,
        label: link.label
      }));

    return html`
      <div class="contact-links">
        ${links.map(link => html`
          <a key=${link.label} href=${link.href} target="_blank" rel="noopener noreferrer" role="button" class="outline">
            <i class="${link.icon}"></i> ${link.label}
          </a>
        `)}
      </div>
    `;
  }
}

// Certifications Component
export class Certifications extends BaseComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.certifications !== this.props.certifications;
  }

  render() {
    const { certifications } = this.props;
    return html`
      <div class="certifications-grid">
        ${certifications.map(cert => html`
          <article key=${cert.name} class="certification-card">
            <i class="${CONFIG.components.certifications.icon}" aria-hidden="true"></i>
            <h3>${cert.name}</h3>
            <p>${cert.issuer}${cert.date ? ` - ${cert.date}` : ''}</p>
          </article>
        `)}
      </div>
    `;
  }
}
