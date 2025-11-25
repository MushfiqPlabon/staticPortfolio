import { html } from 'https://esm.sh/htm@3/preact';
import { Component } from 'https://esm.sh/preact@10';

export class Section extends Component {
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
