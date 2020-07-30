import * as React from "react";

export interface ListItem {
  //icon: string;
  text: string;
}

export interface ListProps {
  items: ListItem[];
}

export default class List extends React.Component<ListProps> {
  render() {
    const { items } = this.props;

    const listItems = items.map((item, index) => (
      <li key={index}>
        {/* <i></i> */}
        <span>{item.text}</span>
      </li>
    ));
    return (
      <main>
        <ul>{listItems}</ul>
      </main>
    );
  }
}
