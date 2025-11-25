import { html } from 'https://esm.sh/htm@3/preact';
import { BaseComponent } from './Base.js';

export class Timeline extends BaseComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items || nextProps.type !== this.props.type;
  }

  render() {
    const { items, type, config } = this.props;
    if (!items || !Array.isArray(items)) return null;
    
    const timelineConfig = config.components.timeline[type] || config.components.timeline.education;

    return html`
      ${items.map((item, idx) => {
        if (!item) return null;
        return html`
          <article key=${idx} class="${type}-card timeline-item">
            <div class="timeline-marker">
              <i class="${timelineConfig.icon}" aria-hidden="true"></i>
            </div>
            <div class="timeline-content">
              <h3>${item[timelineConfig.titleKey] || ''}</h3>
              ${timelineConfig.subtitleKey && item[timelineConfig.subtitleKey] && html`<h4 class="company">${item[timelineConfig.subtitleKey]}</h4>`}
              <p class="${type}-${timelineConfig.subtitleKey ? 'duration' : 'institution'}">
                ${item.duration || ''}${timelineConfig.locationKey && item[timelineConfig.locationKey] ? ` • ${item[timelineConfig.locationKey]}` : ''}
              </p>
              ${item[timelineConfig.detailsKey]?.slice(0, timelineConfig.maxDetails).length > 0 && html`
                <ul>
                  ${item[timelineConfig.detailsKey].slice(0, timelineConfig.maxDetails).map(d => html`<li key=${d}>${d}</li>`)}
                </ul>
              `}
            </div>
          </article>
        `;
      })}
    `;
  }
}
