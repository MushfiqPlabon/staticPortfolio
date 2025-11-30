import { html } from 'htm/preact';
import { Component } from 'preact';

export class Section extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.title !== this.props.title ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    const { title, children, config, ...rest } = this.props;
    return html`
      <section class="container">
        <h2 class="section-header">${title}</h2>
        ${children}
      </section>
    `;
  }
}
