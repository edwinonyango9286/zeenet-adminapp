import React from "react";

const CustomInput = (props) => {
  const {
    type,
    label,
    id,
    className,
    name,
    val,
    onChng,
    onBlr,
    max,
    min,
    step,
  } = props;
  return (
    <>
      <div className="form-floating mt-4">
        <input
          type={type}
          className={`form-control border shadow-none ${className}`}
          id={id}
          max={max}
          min={min}
          step={step}
          placeholder={label}
          name={name}
          value={val}
          onChange={onChng}
          onBlur={onBlr}
        />
        <label htmlFor={label}>{label}</label>
      </div>
    </>
  );
};
export default CustomInput;
