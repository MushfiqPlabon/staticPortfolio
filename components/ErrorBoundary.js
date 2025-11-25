import { html } from 'https://esm.sh/htm@3/preact';
import { BaseComponent } from './Base.js';

export class ErrorBoundary extends BaseComponent {
  render() {
    const { title, message } = this.props;

    const styles = {
      container: {
        color: 'red',
        backgroundColor: '#100',
        padding: '2rem',
        textAlign: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        margin: '0 0 1rem 0',
      },
      message: {
        margin: '0',
      }
    };

    return html`
      <div style=${styles.container}>
        <h1 style=${styles.title}>${title}</h1>
        <p style=${styles.message}>${message}</p>
      </div>
    `;
  }
}
