import type { Config } from "../schemas";

/**
 * StyleModules - Modular style generation
 * Breaks down monolithic style template into maintainable modules
 */
export class StyleModules {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  getKeyframes(): string {
    const { keyframes } = this.config;
    return `
      @keyframes neonGlow {
        ${keyframes.neonGlow}
      }
      @keyframes fadeInDown {
        ${keyframes.fadeInDown}
      }
      @keyframes shimmer {
        ${keyframes.shimmer}
      }
      @keyframes slideInFromLeft {
        ${keyframes.slideInFromLeft}
      }
      @keyframes slideInFromRight {
        ${keyframes.slideInFromRight}
      }
      @keyframes pulse {
        ${keyframes.pulse}
      }
    `;
  }

  getBaseStyles(): string {
    const { colors, fonts, spacing } = this.config;
    return `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
        font-size: 16px;
      }

      body {
        font-family: ${fonts.body};
        background: ${colors.bgPrimary};
        color: ${colors.textPrimary};
        line-height: 1.6;
        overflow-x: hidden;
        min-height: 100vh;
      }

      ::selection {
        background: ${colors.accentPrimary};
        color: ${colors.bgPrimary};
      }

      ::-webkit-scrollbar {
        width: ${spacing.xs};
      }

      ::-webkit-scrollbar-track {
        background: ${colors.bgSecondary};
      }

      ::-webkit-scrollbar-thumb {
        background: ${colors.accentPrimary};
        border-radius: ${this.config.radius.full};
      }

      ::-webkit-scrollbar-thumb:hover {
        background: ${colors.accentSecondary};
      }
    `;
  }

  getTypography(): string {
    const { fonts, colors, spacing, textShadows } = this.config;
    return `
      h1, h2, h3, h4, h5, h6 {
        font-family: ${fonts.heading};
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: ${spacing.md};
        color: ${colors.textPrimary};
      }

      h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        text-shadow: ${textShadows.glow};
      }

      h2 {
        font-size: clamp(1.75rem, 4vw, 2.5rem);
      }

      h3 {
        font-size: clamp(1.5rem, 3vw, 2rem);
      }

      p {
        margin-bottom: ${spacing.md};
        color: ${colors.textSecondary};
      }

      a {
        color: ${colors.accentPrimary};
        text-decoration: none;
        transition: ${this.config.transitions.fast};
      }

      a:hover {
        color: ${colors.accentSecondary};
      }
    `;
  }

  getLayoutStyles(): string {
    const { layout, spacing } = this.config;
    return `
      .container {
        max-width: ${layout.maxWidth};
        margin: 0 auto;
        padding: 0 ${spacing.lg};
      }

      .section {
        min-height: 100vh;
        padding: ${spacing.section} 0;
        position: relative;
      }

      .grid {
        display: grid;
        gap: ${spacing.lg};
      }

      .flex {
        display: flex;
        gap: ${spacing.md};
      }

      .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
  }

  getButtonStyles(): string {
    const { colors, spacing, radius, transitions, shadows, transforms } = this.config;
    return `
      .btn {
        display: inline-block;
        padding: ${spacing.sm} ${spacing.lg};
        border-radius: ${radius.md};
        font-weight: 600;
        text-align: center;
        cursor: pointer;
        transition: ${transitions.normal};
        border: none;
        font-family: inherit;
      }

      .btn-primary {
        background: ${colors.accentPrimary};
        color: ${colors.bgPrimary};
        box-shadow: ${shadows.md};
      }

      .btn-primary:hover {
        background: ${colors.accentSecondary};
        transform: ${transforms.scaleUpSlight};
        box-shadow: ${shadows.lg};
      }

      .btn-outline {
        background: transparent;
        color: ${colors.accentPrimary};
        border: 2px solid ${colors.accentPrimary};
      }

      .btn-outline:hover {
        background: ${colors.accentPrimary};
        color: ${colors.bgPrimary};
      }
    `;
  }

  getCardStyles(): string {
    const { colors, spacing, radius, shadows, blur, glass, transitions } = this.config;
    return `
      .card {
        background: ${colors.bgSecondary};
        border-radius: ${radius.lg};
        padding: ${spacing.lg};
        box-shadow: ${shadows.md};
        transition: ${transitions.normal};
      }

      .card:hover {
        transform: translateY(-0.5rem);
        box-shadow: ${shadows.xl};
      }

      .glass-card {
        background: rgba(255, 255, 255, ${glass.opacity});
        backdrop-filter: blur(${blur.md});
        -webkit-backdrop-filter: blur(${blur.md});
        border: 1px solid rgba(255, 255, 255, ${glass.border});
        border-radius: ${radius.lg};
        padding: ${spacing.lg};
      }
    `;
  }

  getNavigationStyles(): string {
    const { colors, spacing, radius, blur, glass, zIndex, transitions } = this.config;
    return `
      nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: ${zIndex.nav};
        background: rgba(0, 0, 0, ${glass.opacity});
        backdrop-filter: blur(${blur.lg});
        -webkit-backdrop-filter: blur(${blur.lg});
        padding: ${spacing.md} 0;
        transition: ${transitions.normal};
      }

      .nav-list {
        display: flex;
        list-style: none;
        gap: ${spacing.lg};
        align-items: center;
      }

      .nav-link {
        color: ${colors.textPrimary};
        font-weight: 500;
        padding: ${spacing.xs} ${spacing.md};
        border-radius: ${radius.md};
        transition: ${transitions.fast};
      }

      .nav-link:hover,
      .nav-link.active {
        color: ${colors.accentPrimary};
        background: rgba(255, 255, 255, ${glass.hover});
      }

      .nav-toggle {
        display: none;
        background: none;
        border: none;
        color: ${colors.textPrimary};
        font-size: 1.5rem;
        cursor: pointer;
      }
    `;
  }

  getProjectStyles(): string {
    const { colors, spacing, radius, shadows, transitions } = this.config;
    return `
      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: ${spacing.xl};
      }

      .project-card {
        background: ${colors.bgSecondary};
        border-radius: ${radius.lg};
        overflow: hidden;
        box-shadow: ${shadows.md};
        transition: ${transitions.normal};
      }

      .project-card:hover {
        transform: translateY(-0.5rem);
        box-shadow: ${shadows.xl};
      }

      .project-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .project-content {
        padding: ${spacing.lg};
      }

      .tech-badges {
        display: flex;
        flex-wrap: wrap;
        gap: ${spacing.xs};
        margin-top: ${spacing.md};
      }

      .tech-badge {
        background: ${colors.accentPrimary};
        color: ${colors.bgPrimary};
        padding: ${spacing.xs} ${spacing.sm};
        border-radius: ${radius.full};
        font-size: 0.875rem;
      }
    `;
  }

  getSkillStyles(): string {
    const { colors, spacing, radius, shadows } = this.config;
    return `
      .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: ${spacing.lg};
      }

      .skill-category {
        background: ${colors.bgSecondary};
        padding: ${spacing.lg};
        border-radius: ${radius.lg};
        box-shadow: ${shadows.sm};
      }

      .skill-category h3 {
        color: ${colors.accentPrimary};
        margin-bottom: ${spacing.md};
      }

      .skill-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: ${spacing.sm};
      }

      .skill-list li {
        display: flex;
        align-items: center;
        gap: ${spacing.sm};
        color: ${colors.textSecondary};
      }

      .skill-list i {
        color: ${colors.accentPrimary};
        font-size: 1.25rem;
      }
    `;
  }

  getTimelineStyles(): string {
    const { colors, spacing, radius, shadows } = this.config;
    return `
      .timeline {
        position: relative;
        padding: ${spacing.xl} 0;
      }

      .timeline::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 100%;
        background: ${colors.accentPrimary};
      }

      .timeline-item {
        position: relative;
        margin-bottom: ${spacing.xl};
        display: flex;
        justify-content: flex-start;
        padding-left: calc(50% + ${spacing.xl});
      }

      .timeline-item:nth-child(even) {
        justify-content: flex-end;
        padding-left: 0;
        padding-right: calc(50% + ${spacing.xl});
      }

      .timeline-content {
        background: ${colors.bgSecondary};
        padding: ${spacing.lg};
        border-radius: ${radius.lg};
        box-shadow: ${shadows.md};
        max-width: 400px;
      }

      .timeline-marker {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 1rem;
        height: 1rem;
        background: ${colors.accentPrimary};
        border-radius: ${radius.full};
        box-shadow: ${shadows.glow};
      }
    `;
  }

  getContactStyles(): string {
    const { colors, spacing, radius, shadows, transitions } = this.config;
    return `
      .contact-links {
        display: flex;
        gap: ${spacing.lg};
        justify-content: center;
        flex-wrap: wrap;
      }

      .contact-link {
        display: flex;
        align-items: center;
        gap: ${spacing.sm};
        padding: ${spacing.md} ${spacing.lg};
        background: ${colors.bgSecondary};
        border-radius: ${radius.md};
        box-shadow: ${shadows.sm};
        transition: ${transitions.normal};
      }

      .contact-link:hover {
        background: ${colors.accentPrimary};
        color: ${colors.bgPrimary};
        transform: translateY(-0.25rem);
        box-shadow: ${shadows.md};
      }

      .contact-link i {
        font-size: 1.5rem;
      }
    `;
  }

  getFooterStyles(): string {
    const { colors, spacing } = this.config;
    return `
      footer {
        background: ${colors.bgSecondary};
        padding: ${spacing.xl} 0;
        text-align: center;
        margin-top: ${spacing.section};
      }

      .footer-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${spacing.md};
      }

      .footer-links {
        display: flex;
        gap: ${spacing.lg};
        list-style: none;
      }
    `;
  }

  getResponsiveStyles(): string {
    const { breakpoints, spacing } = this.config;
    return `
      @media (max-width: ${breakpoints.lg}) {
        .timeline::before {
          left: ${spacing.lg};
        }

        .timeline-item,
        .timeline-item:nth-child(even) {
          padding-left: calc(${spacing.lg} * 2 + ${spacing.xl});
          padding-right: 0;
          justify-content: flex-start;
        }

        .timeline-marker {
          left: ${spacing.lg};
        }
      }

      @media (max-width: ${breakpoints.md}) {
        .nav-toggle {
          display: block;
        }

        .nav-list {
          position: fixed;
          top: 4rem;
          left: 0;
          right: 0;
          flex-direction: column;
          background: ${this.config.colors.bgSecondary};
          padding: ${spacing.lg};
          transform: translateX(0);
          transition: ${this.config.transitions.normal};
        }

        .nav-list.hidden {
          transform: translateX(-100%);
        }

        .projects-grid,
        .skills-grid {
          grid-template-columns: 1fr;
        }

        h1 {
          font-size: 2rem;
        }
      }

      @media (max-width: ${breakpoints.sm}) {
        .container {
          padding: 0 ${spacing.md};
        }

        .section {
          padding: ${spacing.xl} 0;
        }

        .nav-list.hidden a {
          transform: translateX(-2rem);
          opacity: 0;
        }

        .projects-grid, 
        .skills-grid, 
        .certifications-grid {
          column-count: 1;
        }
      }
    `;
  }

  getUtilityStyles(): string {
    const { spacing } = this.config;
    return `
      .text-center { text-align: center; }
      .text-left { text-align: left; }
      .text-right { text-align: right; }
      .mt-sm { margin-top: ${spacing.sm}; }
      .mt-md { margin-top: ${spacing.md}; }
      .mt-lg { margin-top: ${spacing.lg}; }
      .mt-xl { margin-top: ${spacing.xl}; }
      .mb-sm { margin-bottom: ${spacing.sm}; }
      .mb-md { margin-bottom: ${spacing.md}; }
      .mb-lg { margin-bottom: ${spacing.lg}; }
      .mb-xl { margin-bottom: ${spacing.xl}; }
      .hidden { display: none; }
      .visible { display: block; }
    `;
  }
}
