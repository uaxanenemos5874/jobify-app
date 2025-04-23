function FormRowSelect({ name, labelTxt, list, defaultValue = "", onChange }) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelTxt || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}>
        {list.map((status) => {
          return (
            <option key={status} value={status}>
              {status}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormRowSelect;
