import { html } from 'https://esm.sh/htm@3/preact';
import { BaseComponent } from './Base.js';

export class ErrorBoundary extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleRetry = this.handleRetry.bind(this);
  }

  handleRetry() {
    window.location.reload();
  }

  render() {
    const { title, message, config, showRetry = true } = this.props;
    const { colors, components, radius } = config;
    const errorConfig = components.errorBoundary;

    const styles = {
      container: {
        color: colors.error,
        backgroundColor: colors.errorBg,
        padding: errorConfig.containerPadding,
        textAlign: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        margin: `0 0 ${errorConfig.titleMarginBottom} 0`,
        fontSize: errorConfig.titleFontSize
      },
      message: {
        margin: `0 0 ${errorConfig.messageMarginBottom} 0`,
        fontSize: errorConfig.messageFontSize,
        color: colors.textMuted
      },
      button: {
        padding: errorConfig.buttonPadding,
        backgroundColor: colors.glowPrimary,
        color: colors.white,
        border: 'none',
        borderRadius: radius.small,
        cursor: 'pointer',
        fontSize: '1.6rem',
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
      }
    };

    return html`
      <div style=${styles.container}>
        <h1 style=${styles.title}>${title}</h1>
        <p style=${styles.message}>${message}</p>
        ${showRetry && html`
          <button style=${styles.button} onClick=${this.handleRetry}>
            🔄 Retry
          </button>
        `}
      </div>
    `;
  }
}
