import React from 'react';

import Input from '../atoms/Input';
import Label from '../atoms/Label';

type FormProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  error ?: string
};
function Form(props: FormProps) {
  return (
    <div className="form">
      {/* conects to the input */}
      <Label htmlFor={props.name} text={props.label} /> 
      {/* Render input elements */}
      <Input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
      />
      {/* Conditional rendering for error message */}
    {props.error && <p className="error">{props.error}</p>} 
    </div>
  );
}

export default Form;
