import { setup, glob } from 'https://esm.sh/goober@2';
import { h } from 'https://esm.sh/preact@10';
import { CONFIG } from '../config.js';

setup(h);

class StyleService {
  init() {
    try {
      glob`
        *, *::before, *::after { box-sizing: ${CONFIG.css.inherit}; }
        html { box-sizing: ${CONFIG.css.borderBox}; font-size: ${CONFIG.numbers.fontSize625}; scroll-behavior: ${CONFIG.css.scrollSmooth}; overflow-x: ${CONFIG.css.hidden}; }
        @media (min-width: 1920px) { html { font-size: ${CONFIG.numbers.fontSize70}; } }
        @media (max-width: 1200px) { html { font-size: ${CONFIG.numbers.fontSize5625}; } }
        @media (max-width: 768px) { html { font-size: ${CONFIG.numbers.fontSize50}; } }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: ${CONFIG.css.auto}; } * { animation-duration: ${CONFIG.numbers.animDuration001} ${CONFIG.css.important}; animation-iteration-count: ${CONFIG.numbers.animCount1} ${CONFIG.css.important}; transition-duration: ${CONFIG.numbers.animDuration001} ${CONFIG.css.important}; scroll-behavior: ${CONFIG.css.auto} ${CONFIG.css.important}; } }
        body { font-family: ${CONFIG.css.fontFamilyPoppins}; font-size: ${CONFIG.fonts.base}; font-weight: ${CONFIG.numbers.fontWeight400}; line-height: ${CONFIG.numbers.lineHeight17}; color: ${CONFIG.colors.mainWhite}; margin: ${CONFIG.numbers.zero}; background: linear-gradient(135deg, ${CONFIG.colors.vampireRed} 0%, ${CONFIG.colors.bloodRed} 25%, ${CONFIG.colors.demonicRed} 50%, ${CONFIG.colors.periodRed} 75%, ${CONFIG.colors.darkestRed} 100%); min-height: ${CONFIG.numbers.minHeight100vh}; overflow-x: ${CONFIG.css.hidden}; }
        h1, h2 { font-family: ${CONFIG.css.fontFamilyRaleway}; font-weight: ${CONFIG.numbers.fontWeight700}; text-align: ${CONFIG.css.textAlignCenter}; color: ${CONFIG.colors.mainWhite}; margin-bottom: ${CONFIG.spacing.lg}; transition: all ${CONFIG.numbers.transitionFast} ${CONFIG.css.ease}; cursor: ${CONFIG.css.default}; animation: neonGlow 4s ${CONFIG.css.ease} ${CONFIG.css.infinite}; }
        h1:hover, h2:hover { transform: ${CONFIG.numbers.scale102}; text-shadow: ${CONFIG.textShadows.h1}, 0 0 2rem ${CONFIG.colors.glowPrimary}; }
        h1:active, h2:active { transform: scale(0.98); }
        h1 { font-size: ${CONFIG.fonts.h1}; text-shadow: ${CONFIG.textShadows.h1}; letter-spacing: ${CONFIG.numbers.letterSpacing002}; animation: fadeInDown ${CONFIG.animation.fadeInDuration} ${CONFIG.css.easeOut}, neonGlow 4s ${CONFIG.css.ease} ${CONFIG.css.infinite} ${CONFIG.animation.fadeInDuration}; }
        h2 { font-size: ${CONFIG.fonts.h2}; text-shadow: ${CONFIG.textShadows.h2}; letter-spacing: ${CONFIG.numbers.letterSpacing001}; }
        h3, h4 { transition: all ${CONFIG.numbers.transitionFast} ${CONFIG.css.ease}; cursor: ${CONFIG.css.default}; }
        h3:hover, h4:hover { transform: ${CONFIG.numbers.translateX2}; color: ${CONFIG.colors.glowPrimary}; }
        ul { list-style: ${CONFIG.css.listStyleNone}; padding: ${CONFIG.numbers.zero}; margin: ${CONFIG.numbers.zero}; }
        a { text-decoration: ${CONFIG.css.textDecorationNone}; color: ${CONFIG.colors.mainWhite}; transition: all ${CONFIG.numbers.transitionFast} ${CONFIG.css.ease}; position: ${CONFIG.positions.relative}; }
        a:hover { color: ${CONFIG.colors.glowPrimary}; transform: ${CONFIG.numbers.translateX2}; }
        a:active { transform: scale(0.95); }
        img { display: ${CONFIG.css.displayBlock}; width: ${CONFIG.positions.full}; height: ${CONFIG.css.auto}; transition: all ${CONFIG.numbers.transition02} ${CONFIG.css.ease}; cursor: ${CONFIG.css.pointer}; background: linear-gradient(90deg, ${CONFIG.colors.projectBgLight} 25%, ${CONFIG.colors.projectBgHover} 50%, ${CONFIG.colors.projectBgLight} 75%); background-size: 200% 100%; animation: shimmer 1.5s ${CONFIG.css.infinite}; }
        img.loaded { background: ${CONFIG.css.none}; animation: ${CONFIG.css.none}; }
        img:hover { transform: ${CONFIG.numbers.scale102}; filter: ${CONFIG.numbers.brightness11}; }
        img:active { transform: scale(0.98); }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        main { outline: ${CONFIG.css.outlineNone}; }
        i.fas, i.fab { margin-right: ${CONFIG.numbers.marginRight07}; transition: ${CONFIG.css.transform} ${CONFIG.numbers.transitionFast} ${CONFIG.css.ease}, color ${CONFIG.numbers.transitionFast} ${CONFIG.css.ease}, text-shadow ${CONFIG.numbers.transitionFast} ${CONFIG.css.ease}; vertical-align: ${CONFIG.css.verticalMiddle}; }
        i.fas:hover, i.fab:hover { transform: ${CONFIG.numbers.scale102}; color: ${CONFIG.colors.glowPrimary}; }
        p { transition: all ${CONFIG.numbers.transition02} ${CONFIG.css.ease}; cursor: ${CONFIG.css.default}; }
        p:hover { color: ${CONFIG.colors.mainWhite}; transform: ${CONFIG.numbers.translateX2}; }
        .screen-reader-text { border: ${CONFIG.numbers.zero}; clip: ${CONFIG.css.clipRect1}; clip-path: ${CONFIG.css.clipPathInset50}; height: ${CONFIG.numbers.height1px}; margin: ${CONFIG.numbers.marginNeg1}; overflow: ${CONFIG.css.overflowHidden}; padding: ${CONFIG.numbers.zero}; position: ${CONFIG.positions.absolute}; width: ${CONFIG.numbers.height1px}; }
        .skip-link:focus { clip: ${CONFIG.css.auto}; clip-path: ${CONFIG.css.none}; height: ${CONFIG.css.auto}; width: ${CONFIG.css.auto}; display: ${CONFIG.css.displayBlock}; font-size: ${CONFIG.fonts.navSmall}; font-weight: ${CONFIG.css.bold}; color: ${CONFIG.colors.glowStrong}; background-color: ${CONFIG.colors.mainDarkRed}; padding: ${CONFIG.spacing.sm} ${CONFIG.spacing.md}; left: ${CONFIG.numbers.zero}; top: ${CONFIG.numbers.zero}; z-index: ${CONFIG.zIndex.skip}; }
        
        @keyframes pulseGlow { ${CONFIG.keyframes.start} { box-shadow: 0 0 0.5rem ${CONFIG.colors.glowPrimary}, 0 0 1rem ${CONFIG.colors.glowPrimaryFade}; } ${CONFIG.keyframes.middle} { box-shadow: 0 0 3rem ${CONFIG.colors.glowPrimary}, 0 0 6rem ${CONFIG.colors.glowPrimaryStrong}; } ${CONFIG.keyframes.end} { box-shadow: 0 0 0.5rem ${CONFIG.colors.glowPrimary}, 0 0 1rem ${CONFIG.colors.glowPrimaryFade}; } }
        @keyframes pulse { ${CONFIG.keyframes.startEnd} { opacity: ${CONFIG.animation.pulseOpacityLow}; } ${CONFIG.keyframes.middle} { opacity: ${CONFIG.animation.pulseOpacityHigh}; } }
        @keyframes fadeInDown { ${CONFIG.keyframes.start} { opacity: ${CONFIG.animation.fadeOpacityStart}; transform: ${CONFIG.transforms.translateDown}; } ${CONFIG.keyframes.end} { opacity: ${CONFIG.animation.fadeOpacityEnd}; transform: ${CONFIG.transforms.translateZero}; } }
        @keyframes neonGlow { ${CONFIG.keyframes.startEnd} { text-shadow: 0 0 0.5rem ${CONFIG.colors.glowPrimary}, 0 0 1rem ${CONFIG.colors.glowPrimary}; } ${CONFIG.keyframes.middle} { text-shadow: 0 0 1rem ${CONFIG.colors.glowPrimary}, 0 0 2rem ${CONFIG.colors.glowPrimary}, 0 0 3rem ${CONFIG.colors.glowSecondary}; } }
        @keyframes neonPulse { ${CONFIG.keyframes.startEnd} { box-shadow: 0 0 0.5rem ${CONFIG.colors.glowPrimary}, inset 0 0 0.5rem ${CONFIG.colors.glowPrimary}; } ${CONFIG.keyframes.middle} { box-shadow: 0 0 2rem ${CONFIG.colors.glowPrimary}, 0 0 3rem ${CONFIG.colors.glowSecondary}, inset 0 0 1rem ${CONFIG.colors.glowPrimary}; } }
        
        .nav { display: ${CONFIG.css.grid}; place-items: ${CONFIG.css.center}; position: ${CONFIG.positions.fixed}; top: ${CONFIG.numbers.zero}; left: ${CONFIG.numbers.zero}; width: ${CONFIG.positions.full}; background: ${CONFIG.colors.navbarBg}; backdrop-filter: blur(${CONFIG.blur.strong}) invert(${CONFIG.blur.invert}); border-bottom-left-radius: ${CONFIG.radius.lg}; border-bottom-right-radius: ${CONFIG.radius.lg}; box-shadow: ${CONFIG.shadows.nav}; z-index: ${CONFIG.zIndex.nav}; transition: all ${CONFIG.transitions.medium} ${CONFIG.css.ease}; padding: ${CONFIG.spacing.sm} ${CONFIG.spacing.lg}; }
        .hamburger { display: ${CONFIG.css.none}; background: ${CONFIG.colors.transparent}; border: ${CONFIG.css.none}; color: ${CONFIG.colors.mainWhite}; font-size: ${CONFIG.fonts.xl}; cursor: ${CONFIG.css.pointer}; padding: ${CONFIG.spacing.sm}; }
        .nav-list { display: ${CONFIG.css.flex}; flex-wrap: ${CONFIG.css.wrap}; justify-content: ${CONFIG.css.center}; align-items: ${CONFIG.css.center}; gap: ${CONFIG.spacing.md}; }
        .nav-list a { display: ${CONFIG.css.displayBlock}; font-size: ${CONFIG.fonts.navBase}; padding: ${CONFIG.spacing.navVertical} ${CONFIG.spacing.lg}; color: ${CONFIG.colors.navbarText}; transition: all ${CONFIG.transitions.medium} ${CONFIG.numbers.cubicBezier}; position: ${CONFIG.positions.relative}; border-radius: ${CONFIG.radius.sm}; }
        .nav-list a::after { content: ""; position: ${CONFIG.positions.absolute}; bottom: ${CONFIG.positions.bottom05}; left: ${CONFIG.positions.half}; transform: translateX(-50%) scaleX(0); width: ${CONFIG.positions.width70}; height: ${CONFIG.positions.height2px}; background: ${CONFIG.colors.glowPrimary}; transition: transform ${CONFIG.transitions.medium} ${CONFIG.css.ease}; box-shadow: 0 0 1rem ${CONFIG.colors.glowPrimary}; }
        .nav-list a:hover, .nav-list a:focus-visible, .nav-list a.active { color: ${CONFIG.colors.glowStrong}; text-shadow: ${CONFIG.textShadows.glowPrimary}; outline: ${CONFIG.css.outlineNone}; background: ${CONFIG.numbers.navBgHover}; animation: neonGlow 2s ${CONFIG.css.ease} ${CONFIG.css.infinite}; }
        .nav-list a:hover::after, .nav-list a:focus-visible::after, .nav-list a.active::after { transform: translateX(-50%) scaleX(1); }
        
        .welcome-section { display: ${CONFIG.css.flex}; flex-direction: ${CONFIG.css.column}; justify-content: ${CONFIG.css.center}; align-items: ${CONFIG.css.center}; text-align: ${CONFIG.css.textAlignCenter}; width: ${CONFIG.positions.full}; min-height: ${CONFIG.numbers.minHeight100vh}; padding: ${CONFIG.spacing.xl} ${CONFIG.spacing.lg}; padding-top: ${CONFIG.layout.navHeight}; position: ${CONFIG.positions.relative}; isolation: ${CONFIG.css.isolate}; }
        .welcome-section::before { content: ""; position: ${CONFIG.positions.absolute}; top: ${CONFIG.positions.top20}; left: ${CONFIG.positions.half}; transform: ${CONFIG.transforms.translateCenterY}; width: ${CONFIG.positions.width600px}; height: ${CONFIG.positions.width600px}; background: radial-gradient(${CONFIG.css.circle}, ${CONFIG.colors.glowPrimary}30 ${CONFIG.keyframes.start}, ${CONFIG.colors.transparent} 70%); filter: blur(${CONFIG.numbers.blur100}); animation: pulse ${CONFIG.animation.pulseDuration} ${CONFIG.css.easeInOut} ${CONFIG.css.infinite}; pointer-events: ${CONFIG.css.pointerEventsNone}; z-index: ${CONFIG.numbers.zero}; }
        .welcome-section h1, .welcome-section > p { position: ${CONFIG.positions.relative}; z-index: ${CONFIG.numbers.zIndex10}; backface-visibility: ${CONFIG.css.backfaceHidden}; transform: ${CONFIG.numbers.translateZ0}; -webkit-font-smoothing: ${CONFIG.css.webkitAntialiased}; -moz-osx-font-smoothing: ${CONFIG.css.mozGrayscale}; text-rendering: ${CONFIG.css.optimizeLegibility}; }
        
        .project-card, .skills-category, .certification-card, .experience-card, .education-card { background: ${CONFIG.colors.projectBgLight}; backdrop-filter: blur(${CONFIG.glass.blur}px) saturate(${CONFIG.saturate.normal}); border: ${CONFIG.borders.thin} solid ${CONFIG.colors.borderLight}; border-radius: ${CONFIG.radius.md}; padding: ${CONFIG.spacing.lg}; transition: all ${CONFIG.transitions.slow} ${CONFIG.numbers.cubicBezier}; box-shadow: ${CONFIG.shadows.glass}; position: ${CONFIG.positions.relative}; overflow: ${CONFIG.css.overflowHidden}; will-change: ${CONFIG.css.willChangeTransform}; height: fit-content; cursor: ${CONFIG.css.pointer}; }
        .project-card:hover, .skills-category:hover, .certification-card:hover, .experience-card:hover, .education-card:hover { transform: ${CONFIG.transforms.cardHover}; backdrop-filter: blur(${CONFIG.glass.blurStrong}px) saturate(${CONFIG.saturate.high}); background: ${CONFIG.colors.projectBgHover}; border-color: ${CONFIG.colors.borderHover}; box-shadow: ${CONFIG.shadows.glassHover}, ${CONFIG.shadows.glow} ${CONFIG.colors.glowPrimary}; animation: neonPulse 1s ${CONFIG.css.ease} ${CONFIG.css.infinite}; }
        .project-card:active, .skills-category:active, .certification-card:active, .experience-card:active, .education-card:active { transform: scale(0.98); }
        
        button, a[role="button"] { background: ${CONFIG.colors.projectBgLight}; backdrop-filter: blur(${CONFIG.glass.blur}px) saturate(${CONFIG.saturate.normal}); border: ${CONFIG.borders.thin} solid ${CONFIG.colors.borderLight}; box-shadow: ${CONFIG.shadows.glass}; display: ${CONFIG.css.inline}; padding: ${CONFIG.spacing.md} ${CONFIG.spacing.xl}; font-size: ${CONFIG.fonts.base}; text-decoration: ${CONFIG.css.textDecorationNone}; border-radius: ${CONFIG.radius.md}; color: ${CONFIG.colors.mainWhite}; cursor: ${CONFIG.css.pointer}; font-family: ${CONFIG.css.fontFamilyInherit}; line-height: ${CONFIG.numbers.lineHeight15}; transition: all ${CONFIG.transitions.medium} ${CONFIG.css.ease}; position: ${CONFIG.positions.relative}; overflow: ${CONFIG.css.overflowHidden}; }
        button:hover, a[role="button"]:hover { backdrop-filter: blur(${CONFIG.glass.blurStrong}px) saturate(${CONFIG.saturate.high}); border-color: ${CONFIG.colors.borderHover}; transform: ${CONFIG.transforms.buttonHover}; box-shadow: ${CONFIG.shadows.buttonGlass}; animation: neonPulse 1s ${CONFIG.css.ease} ${CONFIG.css.infinite}; }
        button:active, a[role="button"]:active { transform: ${CONFIG.transforms.buttonActive}; box-shadow: ${CONFIG.shadows.glass}; }
        
        .container { max-width: ${CONFIG.layout.maxWidth}; margin: ${CONFIG.positions.margin0Auto}; padding: ${CONFIG.spacing.xl} ${CONFIG.spacing.lg}; }
        .container-fluid { width: ${CONFIG.positions.full}; padding: ${CONFIG.spacing.xl} ${CONFIG.spacing.lg}; }
        .section-header { margin-bottom: ${CONFIG.spacing.xxl}; }
        
        .projects-grid { display: ${CONFIG.css.grid}; grid-template-columns: repeat(auto-fit, minmax(${CONFIG.layout.projectMinWidth}, 1fr)); gap: ${CONFIG.spacing.xl}; margin-bottom: ${CONFIG.spacing.xxl}; }
        .skills-grid { column-count: 3; column-gap: ${CONFIG.spacing.lg}; }
        .skills-category { break-inside: avoid; margin-bottom: ${CONFIG.spacing.lg}; }
        .skills-category h4 { margin-bottom: ${CONFIG.spacing.md}; color: ${CONFIG.colors.glowPrimary}; }
        .skills-category ul { display: ${CONFIG.css.flex}; flex-wrap: ${CONFIG.css.wrap}; gap: ${CONFIG.spacing.sm}; }
        .skills-category li { background: ${CONFIG.colors.projectBgLight}; padding: ${CONFIG.spacing.sm} ${CONFIG.spacing.md}; border-radius: ${CONFIG.radius.sm}; transition: all ${CONFIG.transitions.fast} ${CONFIG.css.ease}; cursor: ${CONFIG.css.pointer}; }
        .skills-category li:hover { background: ${CONFIG.colors.glowPrimary}; color: ${CONFIG.colors.mainBlack}; transform: ${CONFIG.transforms.buttonHover}; box-shadow: 0 0 1rem ${CONFIG.colors.glowPrimary}; }
        .skills-category li:active { transform: scale(0.9); }
        
        .certifications-grid { column-count: 3; column-gap: ${CONFIG.spacing.lg}; }
        .certification-card { break-inside: avoid; margin-bottom: ${CONFIG.spacing.lg}; text-align: ${CONFIG.css.textAlignCenter}; padding: ${CONFIG.spacing.lg}; }
        .certification-card i { font-size: ${CONFIG.fonts.xxl}; color: ${CONFIG.colors.glowPrimary}; margin-bottom: ${CONFIG.spacing.md}; display: ${CONFIG.css.block}; }
        .certification-card h3 { margin-bottom: ${CONFIG.spacing.sm}; font-size: ${CONFIG.fonts.md}; }
        .certification-card p { font-size: ${CONFIG.fonts.sm}; color: ${CONFIG.colors.textMuted}; }
        
        .timeline-item { margin-bottom: ${CONFIG.spacing.xl}; max-width: 800px; margin-left: ${CONFIG.css.auto}; margin-right: ${CONFIG.css.auto}; }
        .timeline-marker { display: ${CONFIG.css.inline}; margin-right: ${CONFIG.spacing.md}; color: ${CONFIG.colors.glowPrimary}; }
        .timeline-content h3 { margin-bottom: ${CONFIG.spacing.sm}; }
        .timeline-content h4 { color: ${CONFIG.colors.glowPrimary}; margin-bottom: ${CONFIG.spacing.sm}; }
        .timeline-content p { margin-bottom: ${CONFIG.spacing.md}; color: ${CONFIG.colors.textMuted}; }
        .timeline-content ul { margin-top: ${CONFIG.spacing.md}; padding-left: ${CONFIG.spacing.lg}; }
        .timeline-content li { margin-bottom: ${CONFIG.spacing.sm}; }
        
        .contact-links { display: ${CONFIG.css.flex}; flex-wrap: ${CONFIG.css.wrap}; gap: ${CONFIG.spacing.lg}; justify-content: ${CONFIG.css.center}; }
        
        .project-card img { border-radius: ${CONFIG.radius.sm}; margin-bottom: ${CONFIG.spacing.md}; object-fit: ${CONFIG.css.cover}; object-position: ${CONFIG.css.top}; max-height: ${CONFIG.numbers.maxHeight30}; width: ${CONFIG.positions.full}; }
        .project-card h3 { margin-bottom: ${CONFIG.spacing.sm}; }
        .project-card p { margin-bottom: ${CONFIG.spacing.md}; color: ${CONFIG.colors.textMuted}; }
        .project-card .tech-badges { margin-bottom: ${CONFIG.spacing.md}; display: ${CONFIG.css.flex}; flex-wrap: ${CONFIG.css.wrap}; gap: ${CONFIG.spacing.sm}; }
        .project-card .tech-badge { background: ${CONFIG.colors.projectBgLight}; border: ${CONFIG.borders.thin} solid ${CONFIG.colors.borderLight}; padding: ${CONFIG.spacing.sm} ${CONFIG.spacing.md}; border-radius: ${CONFIG.radius.lg}; font-size: ${CONFIG.fonts.sm}; transition: all ${CONFIG.transitions.fast} ${CONFIG.css.ease}; display: ${CONFIG.css.inline}; white-space: nowrap; }
        .project-card .tech-badge:hover { background: ${CONFIG.colors.glowPrimary}; color: ${CONFIG.colors.mainBlack}; border-color: ${CONFIG.colors.glowPrimary}; transform: ${CONFIG.transforms.buttonHover}; }
        .project-card .btn-show-all { margin-top: ${CONFIG.spacing.md}; }
        
        footer { text-align: ${CONFIG.css.textAlignCenter}; padding: ${CONFIG.spacing.xl}; background: ${CONFIG.colors.mainDarkRed}; box-shadow: ${CONFIG.shadows.insetFooter}; }
        .footer-content { display: ${CONFIG.css.grid}; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: ${CONFIG.spacing.xl}; margin-bottom: ${CONFIG.spacing.xl}; text-align: ${CONFIG.css.left}; max-width: ${CONFIG.layout.maxWidth}; margin-left: ${CONFIG.css.auto}; margin-right: ${CONFIG.css.auto}; }
        .footer-section h4 { color: ${CONFIG.colors.glowPrimary}; margin-bottom: ${CONFIG.spacing.md}; }
        .footer-links, .footer-social { list-style: ${CONFIG.css.listStyleNone}; padding: ${CONFIG.numbers.zero}; }
        .footer-links li, .footer-social li { margin-bottom: ${CONFIG.spacing.sm}; }
        .footer-links a, .footer-social a { color: ${CONFIG.colors.textMuted}; transition: all ${CONFIG.transitions.fast} ${CONFIG.css.ease}; display: ${CONFIG.css.inline}; }
        .footer-links a:hover, .footer-social a:hover { color: ${CONFIG.colors.glowPrimary}; transform: ${CONFIG.numbers.translateX2}; }
        footer small { color: ${CONFIG.colors.textMuted}; display: ${CONFIG.css.block}; margin-top: ${CONFIG.spacing.lg}; }
        footer i { color: ${CONFIG.colors.glowPrimary}; }
        
        .back-to-top { position: ${CONFIG.positions.fixed}; bottom: ${CONFIG.spacing.lg}; right: ${CONFIG.spacing.lg}; width: 50px; height: 50px; background: ${CONFIG.colors.projectBgLight}; backdrop-filter: blur(${CONFIG.glass.blur}px); border: ${CONFIG.borders.thin} solid ${CONFIG.colors.borderLight}; border-radius: ${CONFIG.numbers.borderRadius50}; color: ${CONFIG.colors.glowPrimary}; font-size: ${CONFIG.fonts.xl}; cursor: ${CONFIG.css.pointer}; transition: all ${CONFIG.transitions.medium} ${CONFIG.css.ease}; z-index: ${CONFIG.zIndex.nav}; display: ${CONFIG.css.flex}; align-items: ${CONFIG.css.center}; justify-content: ${CONFIG.css.center}; opacity: 0; pointer-events: ${CONFIG.css.pointerEventsNone}; transform: translateY(100px); }
        .back-to-top.visible { opacity: 1; pointer-events: ${CONFIG.css.auto}; transform: translateY(0); }
        .back-to-top:hover { background: ${CONFIG.colors.glowPrimary}; color: ${CONFIG.colors.mainBlack}; transform: translateY(-4px); box-shadow: 0 0 2rem ${CONFIG.colors.glowPrimary}; animation: neonPulse 1s ${CONFIG.css.ease} ${CONFIG.css.infinite}; }
        .back-to-top:active { transform: scale(0.9); }
        
        .welcome-section h1 { 
          margin-bottom: ${CONFIG.spacing.sm}; 
          color: ${CONFIG.colors.mainWhite}; 
          font-size: ${CONFIG.fonts.h1};
          text-shadow: ${CONFIG.textShadows.h1};
        }
        .hero-title {
          font-size: ${CONFIG.fonts.xxl};
          font-weight: 300;
          color: ${CONFIG.colors.glowPrimary};
          text-shadow: ${CONFIG.textShadows.glowPrimary};
          margin-bottom: ${CONFIG.spacing.lg};
        }
        .hero-objective { 
          font-size: ${CONFIG.fonts.lg}; 
          font-weight: 300; 
          color: ${CONFIG.colors.textMuted}; 
          max-width: 800px; 
          line-height: ${CONFIG.numbers.lineHeight16}; 
          margin-bottom: ${CONFIG.spacing.xxl}; 
        }
        .hero-cta { display: ${CONFIG.css.grid}; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: ${CONFIG.spacing.md}; width: ${CONFIG.positions.full}; max-width: 800px; }
        
        @media (max-width: ${CONFIG.breakpoints.medium}) { 
          .hamburger { display: ${CONFIG.css.block}; align-self: ${CONFIG.css.right}; }
          .nav { display: ${CONFIG.css.flex}; flex-direction: ${CONFIG.css.column}; align-items: stretch; padding: ${CONFIG.spacing.sm}; }
          .nav-list { flex-direction: ${CONFIG.css.column}; width: ${CONFIG.positions.full}; padding: ${CONFIG.spacing.sm} ${CONFIG.numbers.zero}; gap: ${CONFIG.spacing.sm}; max-height: 500px; overflow: ${CONFIG.css.hidden}; transition: max-height ${CONFIG.transitions.medium} ${CONFIG.css.ease}, opacity ${CONFIG.transitions.medium} ${CONFIG.css.ease}; opacity: 1; }
          .nav-list.hidden { max-height: 0; opacity: 0; padding: ${CONFIG.numbers.zero}; }
          .nav-list a { font-size: ${CONFIG.fonts.navSmall}; padding: ${CONFIG.spacing.sm} ${CONFIG.spacing.md}; width: ${CONFIG.positions.full}; text-align: ${CONFIG.css.center}; transform: translateX(0); transition: transform ${CONFIG.transitions.fast} ${CONFIG.css.ease}, opacity ${CONFIG.transitions.fast} ${CONFIG.css.ease}; }
          .nav-list.hidden a { transform: translateX(-20px); opacity: 0; }
          .projects-grid, .skills-grid, .certifications-grid { column-count: 1; }
        }
      `;
    } catch (error) {
      console.error('Style initialization failed:', error);
      throw error;
    }
  }
}

export const Styles = new StyleService();
