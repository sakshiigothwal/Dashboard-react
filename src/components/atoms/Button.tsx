import React from 'react';

type ButtonProps = {
  label: string | React.ReactNode; //to use JSX element
  onClick: () => void;
  type?: 'button' | 'submit';
};
const Button = (props: ButtonProps) => {
  return (
    <button type={props.type} onClick={props.onClick}>
      {props.label}
    </button>
  );
};

export default Button;
