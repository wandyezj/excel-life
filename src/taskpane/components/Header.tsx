import * as React from "react";

export interface HeaderProps {
  title: string;
  logo: string;
  message: string;
}

export default class Header extends React.Component<HeaderProps> {
  render() {
    const { title, logo, message } = this.props;

    return (
      <section>
        <img width="90" height="90" src={logo} alt={title} title={title} />
        <h1>{message}</h1>
      </section>
    );
  }
}
