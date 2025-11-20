import { z } from 'https://esm.sh/zod@3';

export const ContactSchema = z.object({
  location: z.string(),

  email: z.string().email(),
  linkedin: z.string().url(),
  github: z.string().url(),
  facebook: z.string().url().optional(),
});

export const ProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  objective: z.string(),
  contact: ContactSchema,
});

export const ProjectSchema = z.object({
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

export const ExperienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  duration: z.string(),
  description: z.array(z.string()),
});

export const EducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  duration: z.string(),
  details: z.array(z.string()),
});

export const SkillsSchema = z.object({
  languages: z.array(z.string()),
  frameworks: z.array(z.string()),
  databasesAndTools: z.array(z.string()),
  aiAndWorkflow: z.array(z.string()),
  productivitySuites: z.array(z.string()),
  businessAndManagement: z.array(z.string()),
  technicalSupport: z.array(z.string()),
});

export const CertificationSchema = z.object({
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
