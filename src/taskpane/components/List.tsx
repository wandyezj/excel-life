import * as React from "react";

export interface ListItem {
  icon: string;
  primaryText: string;
}

export interface ListProps {
  message: string;
  items: ListItem[];
}

export default class List extends React.Component<ListProps> {
  render() {
    const { children, items, message } = this.props;

    const listItems = items.map((item, index) => (
      <li key={index}>
        <i></i>
        <span>{item.primaryText}</span>
      </li>
    ));
    return (
      <main>
        <h2>{message}</h2>
        <ul>{listItems}</ul>
        {children}
      </main>
    );
  }
}
