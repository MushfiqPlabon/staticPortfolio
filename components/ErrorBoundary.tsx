import { html } from "htm/preact";
import { BaseComponent } from "./Base";
import type { Config } from "../schemas";
import type { JSX } from "preact";

interface ErrorBoundaryProps {
  title: string;
  message: string;
  config: Config;
  showRetry?: boolean;
}

type ErrorBoundaryState = Record<string, never>;

export class ErrorBoundary extends BaseComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.handleRetry = this.handleRetry.bind(this);
  }

  handleRetry(): void {
    window.location.reload();
  }

  render(): JSX.Element {
    const { title, message, config, showRetry = true } = this.props;
    const { colors, components, radius } = config;
    const errorConfig = components.errorBoundary;

    const styles: Record<string, preact.JSX.CSSProperties> = {
      container: {
        color: colors.error,
        backgroundColor: colors.errorBg,
        padding: errorConfig.containerPadding,
        textAlign: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      title: {
        margin: `0 0 ${errorConfig.titleMarginBottom} 0`,
        fontSize: errorConfig.titleFontSize,
      },
      message: {
        margin: `0 0 ${errorConfig.messageMarginBottom} 0`,
        fontSize: errorConfig.messageFontSize,
        color: colors.textMuted,
      },
      button: {
        padding: errorConfig.buttonPadding,
        backgroundColor: colors.glowPrimary,
        color: colors.white,
        border: "none",
        borderRadius: radius.small,
        cursor: "pointer",
        fontSize: config.fonts.base,
        fontWeight: "bold",
        transition: "all 0.3s ease",
      },
    };

    return html`
      <div style=${styles.container}>
        <h1 style=${styles.title}>${title}</h1>
        <p style=${styles.message}>${message}</p>
        ${
          showRetry &&
          html`
          <button style=${styles.button} onClick=${this.handleRetry}>
            🔄 Retry
          </button>
        `
        }
      </div>
    `;
  }
}
