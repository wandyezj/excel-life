import * as React from "react";

interface SelectProps {
  id: string; // should this be an autogenerated GUID?
  options: string[];
  onChange: (index: number) => void;
}

export default class Select extends React.Component<SelectProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, options, onChange } = this.props;

    const selectOptions = options.map((option, index) => <option value={index}>{option}</option>);

    return (
      <select
        id={id}
        onChange={() => {
          const element = document.getElementById(id) as HTMLSelectElement;
          const value = element.value;
          const index = parseInt(value);
          onChange(index);
        }}
      >
        {selectOptions}
      </select>
    );
  }
}
