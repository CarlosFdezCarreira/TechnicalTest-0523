import React from "react";
import "./inputNumber.css";

function InputNumber({ value, onChange, className, disabled }) {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      className={"inputNumber " + className}
      disabled={disabled}
    />
  );
}

export default InputNumber;
