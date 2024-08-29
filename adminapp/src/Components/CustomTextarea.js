import React from "react";

const CustomTextarea = React.memo((props) => {
  const {
    type,
    label,
    id,
    className,
    name,
    value,
    onChange,
    onBlur,
    maxLength,
    minLength,
    step,
  } = props;
  return (
    <>
      <div className="form-floating  mt-2">
        <textarea
          type={type}
          className={`form-control border rounded-md shadow-none ${className}`}
          id={id}
          max={maxLength}
          min={minLength}
          step={step}
          placeholder={label}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{ height: "80px" }}
        />
        <label htmlFor={label}>{label}</label>
      </div>
    </>
  );
});

export default CustomTextarea;
