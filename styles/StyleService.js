import { setup, glob } from 'https://esm.sh/goober@2';
import { h } from 'https://esm.sh/preact@10';

setup(h);

class StyleService {
  init(CONFIG) {
    try {
      glob`
        *, *::before, *::after { box-sizing: ${CONFIG.css.inherit}; }
        html { box-sizing: ${CONFIG.css.borderBox}; font-size: ${CONFIG.numbers.fontSize625}; scroll-behavior: ${CONFIG.css.scrollSmooth}; }
        body { font-family: ${CONFIG.css.fontFamilyPoppins}; font-size: ${CONFIG.fonts.base}; font-weight: ${CONFIG.numbers.fontWeight400}; line-height: ${CONFIG.numbers.lineHeight17}; color: ${CONFIG.colors.mainWhite}; margin: ${CONFIG.numbers.zero}; background: linear-gradient(135deg, ${CONFIG.colors.mainDarkRed} 0%, ${CONFIG.colors.mainRed} 100%); min-height: ${CONFIG.numbers.minHeight100vh}; }
        
        @media (prefers-reduced-motion: reduce) { 
          html { scroll-behavior: ${CONFIG.css.auto}; } 
          * { 
            animation-duration: ${CONFIG.numbers.animDuration001} !important; 
            animation-iteration-count: ${CONFIG.numbers.animCount1} !important; 
            transition-duration: ${CONFIG.numbers.animDuration001} !important; 
            scroll-behavior: ${CONFIG.css.auto} !important; 
          } 
        }

        h1, h2 { font-family: ${CONFIG.css.fontFamilyRaleway}; font-weight: ${CONFIG.numbers.fontWeight700}; text-align: ${CONFIG.css.textAlignCenter}; color: ${CONFIG.colors.mainWhite}; margin-bottom: ${CONFIG.spacing.lg}; transition: all ${CONFIG.transitions.fast} ${CONFIG.css.ease}; cursor: ${CONFIG.css.default}; animation: neonGlow 4s ${CONFIG.css.ease} infinite; }
        h1:hover, h2:hover { transform: scale(1.02); text-shadow: ${CONFIG.textShadows.h1}, 0 0 2rem ${CONFIG.colors.glowPrimary}; }
        h1:active, h2:active { transform: scale(0.98); }
        h1 { font-size: clamp(2.8rem, 5vw, 4rem); text-shadow: ${CONFIG.textShadows.h1}; letter-spacing: -0.02em; animation: fadeInDown ${CONFIG.animation.fadeInDuration} ${CONFIG.css.easeOut}, neonGlow 4s ${CONFIG.css.ease} infinite ${CONFIG.animation.fadeInDuration}; }
        h2 { font-size: clamp(2.8rem, 4vw, 3.2rem); text-shadow: ${CONFIG.textShadows.h2}; letter-spacing: -0.01em; }
        
        h3, h4 { transition: all ${CONFIG.transitions.fast} ${CONFIG.css.ease}; cursor: ${CONFIG.css.default}; }
        h3:hover, h4:hover { transform: translateX(0.2rem); color: ${CONFIG.colors.glowPrimary}; }
        ul { list-style: none; padding: 0; margin: 0; }
        a { text-decoration: none; color: ${CONFIG.colors.mainWhite}; transition: all ${CONFIG.transitions.fast} ${CONFIG.css.ease}; position: relative; }
        a:hover { color: ${CONFIG.colors.glowPrimary}; transform: translateX(0.2rem); }
        a:active { transform: scale(0.95); }

        img { display: block; width: 100%; height: auto; transition: all 0.2s ease; cursor: pointer; background: linear-gradient(90deg, ${CONFIG.colors.projectBgLight} 25%, ${CONFIG.colors.projectBgHover} 50%, ${CONFIG.colors.projectBgLight} 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
        img.loaded { background: none; animation: none; }
        img:hover { transform: scale(1.02); filter: brightness(1.1); }
        img:active { transform: scale(0.98); }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        main { outline: none; }
        i.fas, i.fab { margin-right: 0.7rem; transition: transform ${CONFIG.transitions.fast} ${CONFIG.css.ease}, color ${CONFIG.transitions.fast} ${CONFIG.css.ease}, text-shadow ${CONFIG.transitions.fast} ${CONFIG.css.ease}; vertical-align: middle; }
        i.fas:hover, i.fab:hover { transform: scale(1.02); color: ${CONFIG.colors.glowPrimary}; }
        p { transition: all 0.2s ease; cursor: default; }
        p:hover { color: ${CONFIG.colors.mainWhite}; transform: translateX(0.2rem); }

        .screen-reader-text { border: 0; clip: rect(0.1rem, 0.1rem, 0.1rem, 0.1rem); clip-path: inset(50%); height: 0.1rem; margin: -0.1rem; overflow: hidden; padding: 0; position: absolute; width: 0.1rem; }
        .skip-link:focus { clip: auto; clip-path: none; height: auto; width: auto; display: block; font-size: ${CONFIG.fonts.navSmall}; font-weight: bold; color: ${CONFIG.colors.glowStrong}; background-color: ${CONFIG.colors.mainDarkRed}; padding: ${CONFIG.spacing.sm} ${CONFIG.spacing.md}; left: 0; top: 0; z-index: ${CONFIG.zIndex.skip}; }
        
        @keyframes pulseGlow { 0% { box-shadow: 0 0 0.5rem ${CONFIG.colors.glowPrimary}, 0 0 1rem ${CONFIG.colors.glowPrimaryFade}; } 50% { box-shadow: 0 0 3rem ${CONFIG.colors.glowPrimary}, 0 0 6rem ${CONFIG.colors.glowPrimaryStrong}; } 100% { box-shadow: 0 0 0.5rem ${CONFIG.colors.glowPrimary}, 0 0 1rem ${CONFIG.colors.glowPrimaryFade}; } }
        @keyframes pulse { 0%, 100% { opacity: ${CONFIG.animation.pulseOpacityLow}; } 50% { opacity: ${CONFIG.animation.pulseOpacityHigh}; } }
        @keyframes fadeInDown { 0% { opacity: 0; transform: translateY(-2rem); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes neonGlow { 0%, 100% { text-shadow: 0 0 0.5rem ${CONFIG.colors.glowPrimary}, 0 0 1rem ${CONFIG.colors.glowPrimary}; } 50% { text-shadow: 0 0 1rem ${CONFIG.colors.glowPrimary}, 0 0 2rem ${CONFIG.colors.glowPrimary}, 0 0 3rem ${CONFIG.colors.glowSecondary}; } }
        @keyframes neonPulse { 0%, 100% { box-shadow: 0 0 0.5rem ${CONFIG.colors.glowPrimary}, inset 0 0 0.5rem ${CONFIG.colors.glowPrimary}; } 50% { box-shadow: 0 0 2rem ${CONFIG.colors.glowPrimary}, 0 0 3rem ${CONFIG.colors.glowSecondary}, inset 0 0 1rem ${CONFIG.colors.glowPrimary}; } }
        
        .nav { display: grid; place-items: center; position: fixed; top: 0; left: 0; width: 100%; background: ${CONFIG.colors.navbarBg}; backdrop-filter: blur(${CONFIG.blur.strong}) invert(${CONFIG.blur.invert}); border-bottom-left-radius: ${CONFIG.radius.lg}; border-bottom-right-radius: ${CONFIG.radius.lg}; box-shadow: ${CONFIG.shadows.nav}; z-index: ${CONFIG.zIndex.nav}; transition: all ${CONFIG.transitions.medium} ${CONFIG.css.ease}; padding: ${CONFIG.spacing.sm} ${CONFIG.spacing.lg}; }
        .hamburger { display: none; background: transparent; border: none; color: ${CONFIG.colors.mainWhite}; font-size: ${CONFIG.fonts.xl}; cursor: pointer; padding: ${CONFIG.spacing.sm}; }
        .nav-list { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: ${CONFIG.spacing.md}; }
        .nav-list a { display: block; font-size: ${CONFIG.fonts.navBase}; padding: ${CONFIG.spacing.navVertical} ${CONFIG.spacing.lg}; color: ${CONFIG.colors.navbarText}; transition: all ${CONFIG.transitions.medium} cubic-bezier(0.4, 0, 0.2, 1); position: relative; border-radius: ${CONFIG.radius.sm}; }
        .nav-list a::after { content: ""; position: absolute; bottom: 0.5rem; left: 50%; transform: translateX(-50%) scaleX(0); width: 70%; height: 0.2rem; background: ${CONFIG.colors.glowPrimary}; transition: transform ${CONFIG.transitions.medium} ${CONFIG.css.ease}; box-shadow: 0 0 1rem ${CONFIG.colors.glowPrimary}; }
        .nav-list a:hover, .nav-list a:focus-visible, .nav-list a.active { color: ${CONFIG.colors.glowStrong}; text-shadow: ${CONFIG.textShadows.glowPrimary}; outline: none; background: rgba(255, 94, 0, 0.1); animation: neonGlow 2s ease infinite; }
        .nav-list a:hover::after, .nav-list a:focus-visible::after, .nav-list a.active::after { transform: translateX(-50%) scaleX(1); }
        
        .welcome-section { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; width: 100%; min-height: 100vh; padding: ${CONFIG.spacing.xl} ${CONFIG.spacing.lg}; padding-top: ${CONFIG.layout.navHeight}; position: relative; isolation: isolate; }
        .welcome-section::before { content: ""; position: absolute; top: 20%; left: 50%; transform: translate(-50%, -50%); width: clamp(25rem, 40vw, 60rem); height: clamp(25rem, 40vw, 60rem); background: radial-gradient(circle, rgba(255, 94, 0, 0.2) 0%, transparent 70%); filter: blur(10rem); animation: pulse ${CONFIG.animation.pulseDuration} ease-in-out infinite; pointer-events: none; z-index: -1; }
        .welcome-section h1, .welcome-section > p { position: relative; z-index: 10; backface-visibility: hidden; transform: translateZ(0); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
        
        .project-card, .skills-category, .certification-card, .experience-card, .education-card { background: ${CONFIG.colors.projectBgLight}; backdrop-filter: blur(${CONFIG.blur.standard}) saturate(1.8); border: ${CONFIG.borders.thin} solid ${CONFIG.colors.borderLight}; border-radius: ${CONFIG.radius.md}; padding: ${CONFIG.spacing.lg}; transition: all ${CONFIG.transitions.slow} cubic-bezier(0.4, 0, 0.2, 1); box-shadow: ${CONFIG.shadows.glass}; position: relative; overflow: hidden; will-change: transform; height: fit-content; cursor: pointer; }
        .project-card:hover, .skills-category:hover, .certification-card:hover, .experience-card:hover, .education-card:hover { transform: translateY(-0.8rem) scale(1.02); backdrop-filter: blur(${CONFIG.blur.strong}) saturate(2); background: ${CONFIG.colors.projectBgHover}; border-color: ${CONFIG.colors.borderHover}; box-shadow: ${CONFIG.shadows.glassHover}, 0 0 2rem ${CONFIG.colors.glowPrimary}; animation: neonPulse 1s ease infinite; }
        .project-card:active, .skills-category:active, .certification-card:active, .experience-card:active, .education-card:active { transform: scale(0.98); }
        
        button, a[role="button"] { background: ${CONFIG.colors.projectBgLight}; backdrop-filter: blur(${CONFIG.blur.standard}) saturate(1.8); border: ${CONFIG.borders.thin} solid ${CONFIG.colors.borderLight}; box-shadow: ${CONFIG.shadows.glass}; display: inline-flex; align-items: center; justify-content: center; padding: ${CONFIG.spacing.md} ${CONFIG.spacing.xl}; font-size: ${CONFIG.fonts.base}; text-decoration: none; border-radius: ${CONFIG.radius.md}; color: ${CONFIG.colors.mainWhite}; cursor: pointer; font-family: inherit; line-height: 1.5; transition: all ${CONFIG.transitions.medium} ${CONFIG.css.ease}; position: relative; overflow: hidden; }
        button:hover, a[role="button"]:hover { backdrop-filter: blur(${CONFIG.blur.strong}) saturate(2); border-color: ${CONFIG.colors.borderHover}; transform: translateY(-0.4rem); box-shadow: ${CONFIG.shadows.buttonGlass}; animation: neonPulse 1s ease infinite; }
        button:active, a[role="button"]:active { transform: scale(0.95); box-shadow: ${CONFIG.shadows.glass}; }
        
        .container { max-width: ${CONFIG.layout.maxWidth}; margin: 0 auto; padding: ${CONFIG.spacing.xl} ${CONFIG.spacing.lg}; }
        .container-fluid { width: 100%; padding: ${CONFIG.spacing.xl} ${CONFIG.spacing.lg}; }
        .section-header { margin-bottom: ${CONFIG.spacing.xxl}; }
        
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(${CONFIG.layout.projectMinWidth}, 1fr)); gap: ${CONFIG.spacing.xl}; margin-bottom: ${CONFIG.spacing.xxl}; }
        .skills-grid { column-count: 3; column-gap: ${CONFIG.spacing.lg}; }
        .skills-category { break-inside: avoid; margin-bottom: ${CONFIG.spacing.lg}; }
        .skills-category h4 { margin-bottom: ${CONFIG.spacing.md}; color: ${CONFIG.colors.glowPrimary}; }
        .skills-category ul { display: flex; flex-wrap: wrap; gap: ${CONFIG.spacing.sm}; }
        .skills-category li { background: ${CONFIG.colors.projectBgLight}; padding: ${CONFIG.spacing.sm} ${CONFIG.spacing.md}; border-radius: ${CONFIG.radius.sm}; transition: all ${CONFIG.transitions.fast} ${CONFIG.css.ease}; cursor: pointer; }
        .skills-category li:hover { background: ${CONFIG.colors.glowPrimary}; color: ${CONFIG.colors.mainBlack}; transform: translateY(-0.4rem); box-shadow: 0 0 1rem ${CONFIG.colors.glowPrimary}; }
        .skills-category li:active { transform: scale(0.9); }
        
        .certifications-grid { column-count: 3; column-gap: ${CONFIG.spacing.lg}; }
        .certification-card { break-inside: avoid; margin-bottom: ${CONFIG.spacing.lg}; text-align: center; padding: ${CONFIG.spacing.lg}; }
        .certification-card i { font-size: ${CONFIG.fonts.xxl}; color: ${CONFIG.colors.glowPrimary}; margin-bottom: ${CONFIG.spacing.md}; display: block; }
        .certification-card h3 { margin-bottom: ${CONFIG.spacing.sm}; font-size: ${CONFIG.fonts.md}; }
        .certification-card p { font-size: ${CONFIG.fonts.sm}; color: ${CONFIG.colors.textMuted}; }
        
        .timeline-item { margin-bottom: ${CONFIG.spacing.xl}; max-width: 80rem; margin-left: auto; margin-right: auto; }
        .timeline-marker { display: inline; margin-right: ${CONFIG.spacing.md}; color: ${CONFIG.colors.glowPrimary}; }
        .timeline-content h3 { margin-bottom: ${CONFIG.spacing.sm}; }
        .timeline-content h4 { color: ${CONFIG.colors.glowPrimary}; margin-bottom: ${CONFIG.spacing.sm}; }
        .timeline-content p { margin-bottom: ${CONFIG.spacing.md}; color: ${CONFIG.colors.textMuted}; }
        .timeline-content ul { margin-top: ${CONFIG.spacing.md}; padding-left: ${CONFIG.spacing.lg}; }
        .timeline-content li { margin-bottom: ${CONFIG.spacing.sm}; }
        
        .contact-links { display: flex; flex-wrap: wrap; gap: ${CONFIG.spacing.lg}; justify-content: center; }
        
        .project-card img { border-radius: ${CONFIG.radius.sm}; margin-bottom: ${CONFIG.spacing.md}; object-fit: cover; object-position: top; max-height: 30rem; width: 100%; }
        .project-card h3 { margin-bottom: ${CONFIG.spacing.sm}; }
        .project-card p { margin-bottom: ${CONFIG.spacing.md}; color: ${CONFIG.colors.textMuted}; }
        .project-card .tech-badges { margin-bottom: ${CONFIG.spacing.md}; display: flex; flex-wrap: wrap; gap: ${CONFIG.spacing.sm}; }
        .project-card .tech-badge { background: ${CONFIG.colors.projectBgLight}; border: ${CONFIG.borders.thin} solid ${CONFIG.colors.borderLight}; padding: ${CONFIG.spacing.sm} ${CONFIG.spacing.md}; border-radius: ${CONFIG.radius.lg}; font-size: ${CONFIG.fonts.sm}; transition: all ${CONFIG.transitions.fast} ${CONFIG.css.ease}; display: inline-flex; white-space: nowrap; }
        .project-card .tech-badge:hover { background: ${CONFIG.colors.glowPrimary}; color: ${CONFIG.colors.mainBlack}; border-color: ${CONFIG.colors.glowPrimary}; transform: translateY(-0.4rem); }
        .project-card .btn-show-all { margin-top: ${CONFIG.spacing.md}; }
        
        footer { text-align: center; padding: ${CONFIG.spacing.xl}; background: ${CONFIG.colors.mainDarkRed}; box-shadow: ${CONFIG.shadows.insetFooter}; }
        .footer-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr)); gap: ${CONFIG.spacing.xl}; margin-bottom: ${CONFIG.spacing.xl}; text-align: left; max-width: ${CONFIG.layout.maxWidth}; margin-left: auto; margin-right: auto; }
        .footer-section h4 { color: ${CONFIG.colors.glowPrimary}; margin-bottom: ${CONFIG.spacing.md}; }
        .footer-links, .footer-social { list-style: none; padding: 0; }
        .footer-links li, .footer-social li { margin-bottom: ${CONFIG.spacing.sm}; }
        .footer-links a, .footer-social a { color: ${CONFIG.colors.textMuted}; transition: all ${CONFIG.transitions.fast} ${CONFIG.css.ease}; display: inline; }
        .footer-links a:hover, .footer-social a:hover { color: ${CONFIG.colors.glowPrimary}; transform: translateX(0.2rem); }
        footer small { color: ${CONFIG.colors.textMuted}; display: block; margin-top: ${CONFIG.spacing.lg}; }
        footer i { color: ${CONFIG.colors.glowPrimary}; }
        
        .back-to-top { position: fixed; bottom: ${CONFIG.spacing.lg}; right: ${CONFIG.spacing.lg}; width: 5rem; height: 5rem; background: ${CONFIG.colors.projectBgLight}; backdrop-filter: blur(${CONFIG.blur.standard}); border: ${CONFIG.borders.thin} solid ${CONFIG.colors.borderLight}; border-radius: 50%; color: ${CONFIG.colors.glowPrimary}; font-size: ${CONFIG.fonts.xl}; cursor: pointer; transition: all ${CONFIG.transitions.medium} ${CONFIG.css.ease}; z-index: ${CONFIG.zIndex.nav}; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transform: translateY(10rem); }
        .back-to-top.visible { opacity: 1; pointer-events: auto; transform: translateY(0); }
        .back-to-top:hover { background: ${CONFIG.colors.glowPrimary}; color: ${CONFIG.colors.mainBlack}; transform: translateY(-0.4rem); box-shadow: 0 0 2rem ${CONFIG.colors.glowPrimary}; animation: neonPulse 1s ease infinite; }
        .back-to-top:active { transform: scale(0.9); }
        
        body.using-mouse #smokey-fluid-canvas {
          display: block;
        }
        
        #smokey-fluid-canvas {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }

        .hero-title {
          font-size: clamp(2.4rem, 3vw, 2.8rem);
          font-weight: 300;
          color: ${CONFIG.colors.glowPrimary};
          text-shadow: ${CONFIG.textShadows.glowPrimary};
          margin-bottom: ${CONFIG.spacing.lg};
        }
        .hero-objective { 
          font-size: clamp(1.8rem, 2vw, 2rem); 
          font-weight: 300; 
          color: ${CONFIG.colors.textMuted}; 
          max-width: ${CONFIG.layout.maxWidth}; 
          line-height: 1.6; 
          margin-bottom: ${CONFIG.spacing.xxl}; 
        }
        .hero-cta { display: grid; grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); gap: ${CONFIG.spacing.md}; width: 100%; max-width: ${CONFIG.layout.maxWidth}; }
        
        @media (max-width: ${CONFIG.breakpoints.medium}) { 
          .welcome-section {
            padding-top: ${CONFIG.layout.navHeightSmall};
          }
          .hamburger { display: block; align-self: flex-end; }
          .nav { display: flex; flex-direction: column; align-items: stretch; padding: ${CONFIG.spacing.sm}; }
          .nav-list { flex-direction: column; width: 100%; padding: ${CONFIG.spacing.sm} 0; gap: ${CONFIG.spacing.sm}; max-height: 50rem; overflow: hidden; transition: max-height ${CONFIG.transitions.medium} ${CONFIG.css.ease}, opacity ${CONFIG.transitions.medium} ${CONFIG.css.ease}; opacity: 1; }
          .nav-list.hidden { max-height: 0; opacity: 0; padding: 0; }
          .nav-list a { font-size: ${CONFIG.fonts.navSmall}; padding: ${CONFIG.spacing.sm} ${CONFIG.spacing.md}; width: 100%; text-align: center; transform: translateX(0); transition: transform ${CONFIG.transitions.fast} ${CONFIG.css.ease}, opacity ${CONFIG.transitions.fast} ${CONFIG.css.ease}; }
          .nav-list.hidden a { transform: translateX(-2rem); opacity: 0; }
          .projects-grid, .skills-grid, .certifications-grid { column-count: 1; }
        }
      `;
    } catch (error) {
      console.error('Style initialization failed:', error);
      throw error;
    }
  }
}

export { StyleService };
