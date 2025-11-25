export class SkillIconService {
    constructor(config) {
      this.config = config;
    }
  
    getSkillIcon(skill) {
      const { skillIcons, skillIconAliases } = this.config;
      const primarySkill = skillIconAliases[skill] || skill;
      return skillIcons[primarySkill] || skillIcons.default;
    }
  }