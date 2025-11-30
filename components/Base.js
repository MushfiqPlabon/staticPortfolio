import { Component } from 'preact';

export class BaseComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    throw new Error('render() must be implemented');
  }
}

