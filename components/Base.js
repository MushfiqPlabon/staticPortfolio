import { Component } from 'https://esm.sh/preact@10';
import { CONFIG } from '../config.js';

const SORTED_SKILL_KEYS = Object.keys(CONFIG.skillIcons).sort((a, b) => b.length - a.length);

export class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.config = CONFIG;
  }

  getSkillIcon(skill) {
    // Try exact match first - O(1)
    if (this.config.skillIcons[skill]) return this.config.skillIcons[skill];
    
    // Try partial match with pre-sorted keys - O(n)
    for (const key of SORTED_SKILL_KEYS) {
      if (skill.includes(key)) return this.config.skillIcons[key];
    }
    
    return this.config.skillIcons.default;
  }

  render() {
    throw new Error('render() must be implemented');
  }
}
