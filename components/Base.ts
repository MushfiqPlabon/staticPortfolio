import { Component, type JSX } from "preact";

export class BaseComponent<
  P = Record<string, never>,
  S = Record<string, never>,
> extends Component<P, S> {
  render(): JSX.Element | null {
    throw new Error("render() must be implemented");
  }
}
