import { html } from "htm/preact";
import { BaseComponent } from "./Base";
import type { Config, Experience, Learning } from "../schemas";
import type { JSX } from "preact";

type TimelineItem = Experience | Learning;

interface TimelineProps {
  items: TimelineItem[];
  type: "experience" | "learning";
  config: Config;
}

export class Timeline extends BaseComponent<TimelineProps> {
  shouldComponentUpdate(nextProps: TimelineProps): boolean {
    return (
      nextProps.items !== this.props.items || nextProps.type !== this.props.type
    );
  }

  render(): JSX.Element | null {
    const { items, type, config } = this.props;
    if (!items || !Array.isArray(items)) return html``;

    // Ensure `type` maps to a valid key in `config.components.timeline`
    const timelineConfig =
      config.components.timeline[type] || config.components.timeline.learning;

    return html`
      ${items.map((item, idx) => {
        if (!item) return null;
        return html`
          <article key=${idx} class="${type}-card timeline-item">
            <div class="timeline-marker">
              <i class="${timelineConfig.icon}" aria-hidden="true"></i>
            </div>
            <div class="timeline-content">
              <h3>${item[timelineConfig.titleKey as keyof TimelineItem] || ""}</h3>
              ${timelineConfig.subtitleKey && item[timelineConfig.subtitleKey as keyof TimelineItem] && html`<h4 class="company">${item[timelineConfig.subtitleKey as keyof TimelineItem]}</h4>`}
              <p class="${type}-${timelineConfig.subtitleKey ? "duration" : "institution"}">
                ${item.duration || ""}${timelineConfig.locationKey && item[timelineConfig.locationKey as keyof TimelineItem] ? ` • ${item[timelineConfig.locationKey as keyof TimelineItem]}` : ""}
              </p>
              ${
                item[timelineConfig.detailsKey as keyof TimelineItem]?.slice(
                  0,
                  timelineConfig.maxDetails,
                ).length > 0 &&
                html`
                <ul>
                  ${(item[timelineConfig.detailsKey as keyof TimelineItem] as unknown as string[]).slice(0, timelineConfig.maxDetails).map((d) => html`<li key=${d}>${d}</li>`)}
                </ul>
              `
              }
            </div>
          </article>
        `;
      })}
    `;
  }
}
