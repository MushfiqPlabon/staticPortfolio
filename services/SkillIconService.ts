import type { Config } from "../schemas";

export class SkillIconService {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  getSkillIcon(skill: string): string {
    const { skillIcons, skillIconAliases } = this.config;
    const primarySkill = skillIconAliases[skill] || skill;
    return skillIcons[primarySkill] || skillIcons.default;
  }
}
