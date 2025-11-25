import { Component } from 'https://esm.sh/preact@10';

export class BaseComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    throw new Error('render() must be implemented');
  }
}

