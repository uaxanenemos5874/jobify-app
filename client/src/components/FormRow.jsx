import React from "react";
//Dynamic/Reusable input-component

function FormRow({
  type,
  name,
  labelTxt,
  defaultValue,
  placeholderTxt,
  onChange,
}) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelTxt || name}
      </label>
      <input
        type={type}
        id={name}
        className="form-input"
        name={name}
        defaultValue={defaultValue || ""}
        onChange={onChange}
        placeholder={placeholderTxt || ""}
        required
      />
    </div>
  );
}

export default FormRow;
