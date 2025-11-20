import { html } from 'https://esm.sh/htm@3/preact';
import { Component } from 'https://esm.sh/preact@10';
import { PortfolioDataSchema } from './schemas.js';
import { portfolioData } from './data.js';
import { Nav } from './components/Nav.js';
import { Hero } from './components/Hero.js';
import { ProjectCard } from './components/ProjectCard.js';
import { SkillGrid, Timeline, Footer, Contact, Certifications } from './components/index.js';
import { Renderer, Animator } from './services/index.js';
import { Styles } from './styles/StyleService.js';
import { InteractiveEffects } from './services/InteractiveEffects.js';
import { CONFIG } from './config.js';

class Section extends Component {
  render() {
    const { id, title, children } = this.props;
    return html`
      <section id=${id} class="container" data-aos="fade-up">
        <h2 class="section-header">${title}</h2>
        ${children}
      </section>
    `;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.validatedData = PortfolioDataSchema.parse(portfolioData);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true, error });
    console.error('App component error:', error);
  }

  render() {
    if (this.state.hasError) {
      return html`<div style="color: red; padding: 2rem; text-align: center;"><h1>${CONFIG.errors.componentError}</h1><p>${this.state.error?.message}</p></div>`;
    }

    return html`
      <${Nav} />
      <main class="container-fluid">
        <${Hero} profile=${this.validatedData.profile} />
        <${Section} id="projects-section" title="${CONFIG.components.sectionTitles.projects}">
          <div class="projects-grid">
            ${this.validatedData.projects.map(p => html`<${ProjectCard} key=${p.id} project=${p} />`)}
          </div>
        </${Section}>
        <${Section} id="skills-section" title="${CONFIG.components.sectionTitles.skills}">
          <${SkillGrid} skills=${this.validatedData.skills} />
        </${Section}>
        <${Section} id="experience-section" title="${CONFIG.components.sectionTitles.experience}">
          <${Timeline} items=${this.validatedData.experience} type="experience" />
        </${Section}>
        <${Section} id="education-section" title="${CONFIG.components.sectionTitles.education}">
          <${Timeline} items=${this.validatedData.education} type="education" />
        </${Section}>
        <${Section} id="certifications-section" title="${CONFIG.components.sectionTitles.certifications}">
          <${Certifications} certifications=${this.validatedData.certifications} />
        </${Section}>
        <${Section} id="contact-section" title="${CONFIG.components.sectionTitles.contact}">
          <${Contact} contact=${this.validatedData.profile.contact} />
        </${Section}>
      </main>
      <${Footer} profile=${this.validatedData.profile} />
    `;
  }
}

class Application {
  constructor() {
    this.root = document.getElementById('root');
  }

  init() {
    try {
      if (!this.root) {
        throw new Error(CONFIG.errors.rootNotFound);
      }
      Styles.init();
      Renderer.render(html`<${App} />`, this.root);
      Animator.init();
      InteractiveEffects.init();
    } catch (error) {
      console.error('Application initialization failed:', error);
      this.renderError(error);
    }
  }

  renderError(error) {
    if (this.root) {
      const safeMessage = String(error?.message || CONFIG.errors.unknownError).replace(/</g, '&lt;').replace(/>/g, '&gt;');
      this.root.innerHTML = `<div style="color: red; padding: 2rem; text-align: center;"><h1>${CONFIG.errors.appError}</h1><p>${safeMessage}</p></div>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new Application();
  app.init();
});
