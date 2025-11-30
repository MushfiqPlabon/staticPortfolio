import { z } from 'zod';

const ContactSchema = z.object({
  location: z.string(),
  email: z.string().email(),
  linkedin: z.string().url(),
  github: z.string().url(),
  facebook: z.string().url().optional(),
});

const ProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  objective: z.string(),
  contact: ContactSchema,
});

const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  stack: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  imageAlt: z.string(),
  links: z.object({
    live: z.string().url().optional(),
    github: z.string().url().optional(),
    githubFrontend: z.string().url().optional(),
    githubBackend: z.string().url().optional(),
  }),
});

const ExperienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  duration: z.string(),
  description: z.array(z.string()),
});

const EducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  duration: z.string(),
  details: z.array(z.string()),
});

const SkillsSchema = z.object({
  languages: z.array(z.string()),
  frameworks: z.array(z.string()),
  databasesAndTools: z.array(z.string()),
  aiAndWorkflow: z.array(z.string()),
  productivitySuites: z.array(z.string()),
  businessAndManagement: z.array(z.string()),
  technicalSupport: z.array(z.string()),
});

const CertificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  date: z.string().optional(),
});

export const PortfolioDataSchema = z.object({
  profile: ProfileSchema,
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  projects: z.array(ProjectSchema),
  skills: SkillsSchema,
  certifications: z.array(CertificationSchema),
});

// Schemas for RAW_CONFIG
const LayoutSchema = z.object({
  navHeight: z.string(),
  navHeightSmall: z.string(),
  maxWidth: z.string(),
  projectMinWidth: z.string(),
});

const CursorSchema = z.object({
  glowSize: z.string(),
  glowOpacity: z.number(),
  glowTransition: z.string(),
});

const AnimationSchema = z.object({
  duration: z.number(),
  offset: z.number(),
  once: z.boolean(),
  glowDuration: z.string(),
  bounceDuration: z.string(),
  breatheDuration: z.string(),
  fadeInDuration: z.string(),
  fadeInDelay: z.string(),
  pulseDuration: z.string(),
  pulseOpacityLow: z.number(),
  pulseOpacityHigh: z.number(),
  fadeOpacityStart: z.number(),
  fadeOpacityEnd: z.number(),
});

const ScrollSchema = z.object({
  throttleLimit: z.number(),
  lazyLoadMargin: z.number(),
  scrollSpyOffset: z.number(),
  backToTopThreshold: z.number(),
  rootMargin: z.string(),
  threshold: z.array(z.number()),
});

const StringOrNumber = z.union([z.string(), z.number()]);

// Component-specific schemas for ConfigSchema
const NavSectionSchema = z.object({
  id: z.string(),
  icon: z.string(),
  label: z.string(),
});

const NavSchema = z.object({
  sections: z.array(NavSectionSchema),
});

const SectionTitlesSchema = z.object({
  projects: z.string(),
  skills: z.string(),
  experience: z.string(),
  education: z.string(),
  certifications: z.string(),
  contact: z.string(),
});

const CtaButtonSchema = z.object({
  href: z.string(),
  icon: z.string(),
  label: z.string(),
  external: z.boolean().optional(),
});

const HeroCtaSchema = z.object({
  primary: CtaButtonSchema,
  secondary: CtaButtonSchema,
  resume: CtaButtonSchema,
});

const HeroSchema = z.object({
  cta: HeroCtaSchema,
});

const TimelineConfigItemSchema = z.object({
  icon: z.string(),
  titleKey: z.string(),
  subtitleKey: z.string().nullable(),
  detailsKey: z.string(),
  maxDetails: z.number(),
  locationKey: z.string(),
});

const TimelineConfigSchema = z.object({
  experience: TimelineConfigItemSchema,
  education: TimelineConfigItemSchema,
});

const ContactLinkSchema = z.object({
  key: z.string(),
  icon: z.string(),
  label: z.string(),
  prefix: z.string().optional(),
  optional: z.boolean().optional(),
});

const ContactConfigSchema = z.object({
  links: z.array(ContactLinkSchema),
});

const CertificationsConfigSchema = z.object({
  icon: z.string(),
});

const FooterSectionsSchema = z.object({
  quickLinks: z.string(),
  connect: z.string(),
});

const FooterConfigSchema = z.object({
  heartIcon: z.string(),
  sections: FooterSectionsSchema,
});

const ProjectCardLabelsSchema = z.object({
  liveSite: z.string(),
  frontend: z.string(),
  backend: z.string(),
  github: z.string(),
});

const ProjectCardConfigSchema = z.object({
  externalIcon: z.string(),
  githubIcon: z.string(),
  labels: ProjectCardLabelsSchema,
});

const ComponentsSchema = z.object({
  heroSectionId: z.string(),
  sectionDefaultAOS: z.string(),
  sectionTitles: SectionTitlesSchema,
  nav: NavSchema,
  skillCategories: z.array(z.string()),
  timeline: TimelineConfigSchema,
  contact: ContactConfigSchema,
  certifications: CertificationsConfigSchema,
  footer: FooterConfigSchema,
  projectCard: ProjectCardConfigSchema,
  hero: HeroSchema,
});


export const ConfigSchema = z.object({
    assets: z.object({
        fontAwesomeKit: z.string().url(),
        simpleIconsCSS: z.string().url(),
    }),
    colors: z.record(z.string()),
    spacing: z.record(z.string()),
    fonts: z.record(z.string()),
    layout: LayoutSchema,
    radius: z.record(z.string()),
    transitions: z.record(z.string()),
    shadows: z.record(z.string()),
    textShadows: z.record(z.string()),
    borders: z.record(z.string()),
    blur: z.record(z.string()),
    glass: z.record(z.number()),
    opacity: z.record(z.number()),
    zIndex: z.record(z.number()),
    cursor: CursorSchema,
    animation: AnimationSchema,
    breakpoints: z.record(z.string()),
    mobile: z.record(z.number()),
    skillIcons: z.record(z.string()),
    skillIconAliases: z.record(z.string()),
    transforms: z.record(z.string()),
    positions: z.record(StringOrNumber),
    saturate: z.record(z.string()),
    keyframes: z.record(z.string()),
    gradients: z.record(z.string()),
    numbers: z.record(StringOrNumber),
    css: z.record(z.string()),
    components: ComponentsSchema,
    errors: z.record(z.string()),
    scroll: ScrollSchema,
});