import React from "react";
import "./inputNumber.css";

function InputNumber({ value = 0, onChange, className, disabled, name }) {
  return (
    <input
      type="number"
      aria-label={name}
      value={value}
      onChange={onChange}
      className={"inputNumber " + className}
      disabled={disabled}
    />
  );
}

export default InputNumber;
