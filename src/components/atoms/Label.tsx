import React, { Component } from 'react';
type LabelProps = {
  htmlFor: string;
  text: string;
};
export class Label extends Component<LabelProps> {
  render() {
    const { htmlFor, text } = this.props;
    return (
      <label htmlFor={htmlFor} className="label">
        {text}
      </label>
    );
  }
}

export default Label;
