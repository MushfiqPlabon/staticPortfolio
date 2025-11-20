const generateRedGradient = (startRGB, endRGB, steps) => {
  const colors = [];
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    const r = Math.round(startRGB[0] + (endRGB[0] - startRGB[0]) * ratio);
    const g = Math.round(startRGB[1] + (endRGB[1] - startRGB[1]) * ratio);
    const b = Math.round(startRGB[2] + (endRGB[2] - startRGB[2]) * ratio);
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }
  return colors;
};

const redShades = generateRedGradient([40, 0, 0], [15, 0, 0], 5);

export const CONFIG = Object.freeze({
  colors: { mainRed: 'rgb(121, 9, 9)', mainDarkRed: 'rgb(36, 0, 0)', mainBlack: 'black', mainWhite: 'white', glowPrimary: '#ff5e00', glowSecondary: '#00eeff', glowStrong: '#fff', projectBgLight: 'rgba(0, 0, 0, 0.6)', projectBgHover: 'rgba(255, 94, 0, 0.2)', projectShadow: '#000000e0', codeColor: 'rgba(255, 255, 255, 0.7)', codeHover: '#ff7f50', navbarBg: 'rgba(0, 0, 0, 0.3)', navbarText: 'rgba(255, 255, 255, 0.85)', borderLight: 'rgba(255, 94, 0, 0.3)', borderHover: 'rgba(255, 94, 0, 0.8)', textMuted: 'rgba(255, 255, 255, 0.7)', bgDark: 'rgba(10, 0, 0, 0.95)', bgSection: 'rgba(0, 0, 0, 0.8)', glassShine: 'rgba(255, 94, 0, 0.15)', glassShineHover: 'rgba(255, 94, 0, 0.3)', glassShineButton: 'rgba(255, 94, 0, 0.3)', glassOrange: 'rgba(255, 94, 0, 0.4)', glowPrimaryFade: 'rgba(255, 94, 0, 0.2)', glowPrimaryMedium: 'rgba(255, 94, 0, 0.5)', glowPrimaryStrong: 'rgba(255, 94, 0, 0.6)', glassBorder: 'rgba(255, 255, 255, 0.18)', transparent: 'transparent', vampireRed: redShades[0], bloodRed: redShades[1], demonicRed: redShades[2], periodRed: redShades[3], darkestRed: redShades[4] },
  spacing: { xs: '0.5rem', sm: '1rem', md: '2rem', lg: '3rem', xl: '4rem', xxl: '6rem', navVertical: '2rem' },
  fonts: { base: '1.6rem', sm: '1.4rem', md: '1.8rem', lg: '2rem', xl: '2.4rem', xxl: '2.8rem', h2: '3.2rem', h2Small: '2.8rem', h1: '4rem', h1Small: '3.2rem', navBase: '1.6rem', navSmall: '1.4rem' },
  layout: { navHeight: '7rem', navHeightSmall: '5rem', maxWidth: '120rem', projectMinWidth: '28rem' },
  radius: { sm: '0.4rem', md: '1rem', lg: '2rem' },
  transitions: { fast: '0.3s', medium: '0.5s', slow: '0.8s' },
  shadows: { nav: '0 0.5rem 3rem rgba(0, 0, 0, 0.7)', project: '0 0.5rem 1.5rem rgba(0, 0, 0, 0.8)', projectHover: '0 2rem 4rem rgba(0, 0, 0, 0.9)', button: '0 0.2rem 1rem rgba(0, 0, 0, 0.5)', inset: 'inset 0 1rem 2rem rgba(0, 0, 0, 0.5), inset 0 -1rem 2rem rgba(0, 0, 0, 0.5)', insetStrong: 'inset 0 1rem 2rem rgba(0, 0, 0, 0.6), inset 0 -1rem 2rem rgba(0, 0, 0, 0.6)', insetFooter: 'inset 0 0.5rem 1.5rem rgba(0, 0, 0, 0.7)', glow: '0 0 2rem', glowStrong: '0 0 3rem', glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', glassHover: '0 16px 48px 0 rgba(0, 0, 0, 0.5)', buttonGlass: '0 12px 32px 0 rgba(0, 0, 0, 0.4)' },
  textShadows: { h1: '0 0 1rem rgba(255, 255, 255, 0.5), 0 0 2rem rgba(255, 255, 255, 0.3)', h2: '0 0 0.8rem rgba(255, 255, 255, 0.4)', glow: '0.2rem 0.2rem 0.5rem black', glowPrimary: '0 0 0.8rem #ff5e00, 0 0 1.5rem rgba(255, 94, 0, 0.5)', glowSecondary: '0 0 1rem #00eeff', glowStrong: '0 0 0.5rem #fff, 0 0 1rem #00eeff', glowFull: '0 0 0.5rem #fff, 0 0 1rem #ff5e00, 0 0 2rem #ff5e00, 0 0 4rem #00eeff, 0 0 6rem #00eeff, 0 0 8rem #fff', code: '0 0 0.5rem #ff7f50, 0 0 1rem rgba(255, 127, 80, 0.5)', contact: '0 0 1rem #fff, 0 0 2rem #ff5e00, 0 0 4rem #00eeff' },
  borders: { thin: '0.1rem', medium: '0.2rem', thick: '0.4rem' },
  blur: { standard: '12px', strong: '30px', invert: '15%' },
  glass: { blur: 16, blurStrong: 24, opacity: 0.05, opacityMedium: 0.08, borderOpacity: 0.18, saturation: 180, brightness: 120, shineOpacity: 0.1, shineOpacityHover: 0.2, shineOpacityButton: 0.3 },
  opacity: { image: 0.8, full: 1 },
  zIndex: { nav: 999, skip: 1000, cursorGlow: 9999 },
  cursor: { glowSize: '400px', glowOpacity: 0.15, glowTransition: '0.15s' },
  animation: { duration: 800, offset: 100, once: true, glowDuration: '2s', bounceDuration: '0.5s', breatheDuration: '3s', fadeInDuration: '0.8s', fadeInDelay: '0.2s', pulseDuration: '8s', pulseOpacityLow: 0.9, pulseOpacityHigh: 1, fadeOpacityStart: 0, fadeOpacityEnd: 1 },
  breakpoints: { small: '38rem', medium: '46rem', large: '49rem', xlarge: '60rem' },
  mobile: { hamburgerBreakpoint: 48 },
  fontAwesomeKit: 'https://kit.fontawesome.com/bb367858c4.js',
  aosCSS: 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css',
  skillIcons: Object.freeze({ 
    Python: 'si si-python', 
    JavaScript: 'si si-javascript', 
    HTML5: 'si si-html5', 
    CSS3: 'si si-css3', 
    'React.js': 'si si-react',
    React: 'si si-react',
    'Redux Toolkit': 'si si-redux', 
    Redux: 'si si-redux', 
    Django: 'si si-django',
    'Django DRF': 'si si-django',
    'Django MVT': 'si si-django',
    'Django REST Framework': 'si si-django', 
    DRF: 'si si-django', 
    TailwindCSS: 'si si-tailwindcss', 
    Tailwind: 'si si-tailwindcss', 
    Bootstrap: 'si si-bootstrap', 
    PostgreSQL: 'si si-postgresql', 
    Supabase: 'si si-supabase',
    HTMX: 'fas fa-bolt',
    Cloudinary: 'si si-cloudinary',
    SSLCommerz: 'fas fa-lock',
    Git: 'si si-git', 
    GitHub: 'si si-github', 
    Vercel: 'si si-vercel', 
    Render: 'si si-render', 
    'AI-Augmented': 'fas fa-brain', 
    'Prompt Engineering': 'fas fa-magic', 
    'Gemini-CLI': 'si si-googlegemini', 
    'Qwen3-Coder': 'fas fa-robot', 
    'Amazon Q': 'fab fa-aws',
    'Microsoft Office': 'fab fa-microsoft',
    'Google Workspace': 'si si-google',
    'Atlassian Rovo Dev': 'si si-atlassian', 
    'AI-Assisted': 'fas fa-bug', 
    ChatGPT: 'si si-openai', 
    'GitHub Copilot': 'si si-githubcopilot', 
    Copilot: 'si si-githubcopilot', 
    Microsoft: 'si si-microsoft', 
    Office: 'si si-microsoft', 
    Google: 'si si-google', 
    Workspace: 'si si-google', 
    Business: 'fas fa-chart-line', 
    management: 'fas fa-tasks', 
    Client: 'fas fa-handshake', 
    coordination: 'fas fa-users', 
    Administrative: 'fas fa-clipboard', 
    Communication: 'fas fa-comments', 
    Adaptability: 'fas fa-sync-alt', 
    PC: 'fas fa-desktop',
    OS: 'fas fa-cogs',
    Device: 'fas fa-mobile-alt',
    setup: 'fas fa-tools',
    installation: 'fas fa-download',
    optimization: 'fas fa-tachometer-alt',
    configuration: 'fas fa-sliders-h',
    default: 'fas fa-code' 
  }),
  transforms: { cardHover: 'translateY(-0.8rem) scale(1.02)', buttonHover: 'translateY(-4px)', buttonActive: 'scale(0.95)', slideLeft: '-100%', slideRight: '100%', translateZero: 'translateY(0)', translateDown: 'translateY(-2rem)', translateLeft: 'translateX(-2rem)', translateUp: 'translateY(2rem)', subtleBounce: 'translateY(-0.5rem)', scaleZero: 'scaleX(0)', scaleOne: 'scaleX(1)', translateCenter: 'translateX(-50%)', translateCenterY: 'translate(-50%, -50%)', scale102: 'scale(1.02)', scale105: 'scale(1.05)', scale115: 'scale(1.15)', scale12: 'scale(1.2)', translateY4: 'translateY(-4px)', translateX2: 'translateX(2px)', translateX4: 'translateX(4px)', translateX8: 'translateX(8px)', translateZ0: 'translateZ(0)', rotate5: 'rotate(5deg)', rotate10: 'rotate(10deg)', scaleRotate: 'scale(1.2) rotate(10deg)', imagePopout: 'translateX(-50%) translateY(-50%)', imagePopoutHover: 'translateX(-50%) translateY(-55%) scale(1.02)' },
  positions: { absolute: 'absolute', relative: 'relative', fixed: 'fixed', zero: 0, full: '100%', half: '50%', top20: '20%', bottom3: '-3px', width100px: '100px', width150px: '150px', width600px: '600px', height2px: '2px', height3px: '3px', height4px: '4px', bottom05: '0.5rem', width70: '70%', width85: '85vh', width90: '90vw', width100vh: '100vh', margin0Auto: '0 auto', calc100: 'calc(100% - 6.8rem)' },
  saturate: { normal: '180%', high: '200%' },
  keyframes: { start: '0%', middle: '50%', end: '100%', startEnd: '0%, 100%' },
  gradients: { heroGradient: 'linear-gradient(6deg, {mainDarkRed} 0%, {mainRed} 100%)', radialGlow: 'radial-gradient(circle, {glowPrimary}30 0%, transparent 70%)', linearGradient90: 'linear-gradient(90deg, {from}, {to})' },
  numbers: { zero: 0, one: 1, two: 2, three: 3, fontWeight400: 400, fontWeight700: 700, fontWeight300: 300, fontWeight900: 900, lineHeight17: 1.7, lineHeight16: 1.6, lineHeight15: 1.5, fontSize625: '62.5%', fontSize70: '70%', fontSize5625: '56.25%', fontSize50: '50%', fontSize5rem: '5rem', fontSize8rem: '8rem', blur100: '100px', deg6: '6deg', deg90: '90deg', deg135: '135deg', deg45: '45deg', animDuration001: '0.01ms', animCount1: '1', transitionFast: '0.15s', transition02: '0.2s', cubicBezier: 'cubic-bezier(0.4, 0, 0.2, 1)', brightness09: 'brightness(0.9)', brightness11: 'brightness(1.1)', minHeight85: '85vh', minHeight100vh: '100vh', fontSize24: '2.4rem', translateY15: 'translateY(-1.5rem)', translateY8: 'translateY(-8px)', translateY10: 'translateY(10px)', translateY20: 'translateY(20px)', translateY30: 'translateY(30px)', navBgHover: 'rgba(255, 94, 0, 0.1)', contactBg: 'rgba(255, 94, 0, 0.05)', contactBgHover: 'rgba(255, 94, 0, 0.15)', glowPrimary30: '{glowPrimary}30', glowPrimary40: '{glowPrimary}40', glowPrimary60: '{glowPrimary}60', border2px: '2px', marginRight07: '0.7rem', height1px: '1px', marginNeg1: '-1px', neg2px: '-2px', zIndex10: 10, zIndexNeg1: -1, letterSpacing002: '-0.02em', letterSpacing001: '-0.01em', letterSpacing005: '-0.05em', letterSpacing03: '0.3em', scale08: 'scale(0.8)', scale15: 'scale(1.5)', borderRadius50: '50%', columnCount3: 3, columnCount1: 1, boxShadowHeroCta: '0 20px 40px rgba(255, 94, 0, 0.4)', maxHeight30: '30rem', opacity03: '0.3', opacity08: '0.8', maxDetailsExperience: 3, maxDetailsEducation: 2, calcMultiplier2: 2, vw3: '3vw', percent0: '0%', percent50: '50%', percent70: '70%', percent100: '100%', percent200: '200%', percent300: '300%', percentNeg50: '-50%', width100px: '100px', height100px: '100px', duration06s: '0.6s', duration3s: '3s', duration8s: '8s', duration15s: '15s', duration18s: '18s', duration20s: '20s', duration25s: '25s', duration1s: '1s', boxShadow001rem: '0 0 1rem', boxShadow0020px: '0 0 20px', translateY0: 'translateY(0)', translateNeg50Neg50: 'translate(-50%, -50%)' },
  css: { auto: 'auto', none: 'none', hidden: 'hidden', block: 'block', flex: 'flex', grid: 'grid', inline: 'inline-block', center: 'center', pointer: 'pointer', default: 'default', ease: 'ease', easeOut: 'ease-out', easeInOut: 'ease-in-out', infinite: 'infinite', alternate: 'alternate', backwards: 'backwards', cover: 'cover', contain: 'contain', wrap: 'wrap', column: 'column', row: 'row', left: 'left', right: 'right', top: 'top', bottom: 'bottom', circle: 'circle', important: '!important', inherit: 'inherit', isolate: 'isolate', antialiased: 'antialiased', grayscale: 'grayscale', optimizeLegibility: 'optimizeLegibility', transform: 'transform', pointerEventsNone: 'none', willChangeTransform: 'transform', mixBlendScreen: 'screen', textAlignCenter: 'center', fontFamilyPoppins: '"Poppins", sans-serif', fontFamilyRaleway: '"Raleway", sans-serif', fontFamilyInherit: 'inherit', objectFitCover: 'cover', overflowHidden: 'hidden', borderBox: 'border-box', scrollSmooth: 'smooth', displayBlock: 'block', verticalMiddle: 'middle', bold: 'bold', italic: 'italic', underline: 'underline', repeatAutoFit: 'repeat(auto-fit, minmax({min}, 1fr))', listStyleNone: 'none', textDecorationNone: 'none', outlineNone: 'none', clipRect1: 'rect(1px, 1px, 1px, 1px)', clipPathInset50: 'inset(50%)', backfaceHidden: 'hidden', webkitAntialiased: 'antialiased', mozGrayscale: 'grayscale', faTimes: 'fa-times', faBars: 'fa-bars', hiddenClass: 'hidden' },
  components: Object.freeze({
    sectionTitles: Object.freeze({
      projects: '💻 Featured Projects',
      skills: '⚡ Technical Skills',
      experience: '👔 Experience',
      education: '🎓 Education',
      certifications: '🏆 Certifications & Learning',
      contact: '📧 Let\'s Connect and Build Something Amazing!'
    }),
    nav: Object.freeze({
      sections: [
        { id: 'welcome-section', icon: 'fas fa-user', label: 'About' },
        { id: 'projects-section', icon: 'fas fa-laptop-code', label: 'Projects' },
        { id: 'skills-section', icon: 'fas fa-lightbulb', label: 'Skills' },
        { id: 'experience-section', icon: 'fas fa-briefcase', label: 'Experience' },
        { id: 'education-section', icon: 'fas fa-graduation-cap', label: 'Education' },
        { id: 'certifications-section', icon: 'fas fa-certificate', label: 'Certifications' },
        { id: 'contact-section', icon: 'fas fa-envelope', label: 'Contact' }
      ]
    }),
    skillCategories: ['Languages', 'Frameworks & Libraries', 'Database & Tools', 'AI & Workflow', 'Productivity Suites', 'Business & Management', 'Technical Support'],
    timeline: Object.freeze({
      experience: Object.freeze({ icon: 'fas fa-briefcase', titleKey: 'title', subtitleKey: 'company', detailsKey: 'description', maxDetails: 3, locationKey: 'location' }),
      education: Object.freeze({ icon: 'fas fa-graduation-cap', titleKey: 'degree', subtitleKey: null, detailsKey: 'details', maxDetails: 2, locationKey: 'institution' })
    }),
    contact: Object.freeze({
      links: [
        { key: 'linkedin', icon: 'si si-linkedin', label: 'LinkedIn' },
        { key: 'github', icon: 'si si-github', label: 'GitHub' },
        { key: 'email', icon: 'fas fa-envelope', label: 'Send a mail', prefix: 'mailto:' },

        { key: 'facebook', icon: 'si si-facebook', label: 'Facebook', optional: true }
      ]
    }),
    certifications: Object.freeze({ icon: 'fas fa-award' }),
    footer: Object.freeze({ 
      heartIcon: 'fas fa-heart',
      sections: Object.freeze({
        quickLinks: 'Quick Links',
        connect: 'Connect'
      })
    }),
    projectCard: Object.freeze({
      externalIcon: 'fas fa-external-link-alt',
      githubIcon: 'si si-github',
      labels: Object.freeze({
        liveSite: 'Live Site',
        frontend: 'Frontend',
        backend: 'Backend',
        github: 'GitHub'
      })
    }),
    hero: Object.freeze({
      cta: Object.freeze({
        primary: Object.freeze({ href: 'https://github.com/MushfiqPlabon', icon: 'si si-github', label: 'View My Work', external: true }),
        secondary: Object.freeze({ href: '#contact-section', icon: 'fas fa-envelope', label: 'Get In Touch' }),
        resume: Object.freeze({ href: 'https://docs.google.com/document/d/1QuHbedpuQ3LvRiTPm-nr7FEKeT8ahu9LG0uJEYhEkPs/edit?usp=sharing', icon: 'si si-googledocs', label: 'View Resume', external: true })
      })
    })
  }),
  errors: Object.freeze({
    rootNotFound: 'Root element not found',
    unknownError: 'Unknown error',
    appError: 'Application Error',
    componentError: 'Something went wrong',
    renderTargetRequired: 'Render target is required',
    renderFailed: 'Render failed:',
    animatorInitFailed: 'Animator initialization failed:',
    animatorRefreshFailed: 'Animator refresh failed:',
    callbackRequired: 'Callback must be a function',
    interactiveEffectsInitFailed: 'InteractiveEffects initialization failed:'
  })
});
