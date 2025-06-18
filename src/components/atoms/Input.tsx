import React from 'react';

type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; //runs when input value changes
  onFocus?: () => void;
};

const Input = (props: InputProps) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onFocus={props.onFocus}
    />
  );
};

export default Input;
