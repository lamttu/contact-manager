import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextInput = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        className={classnames("form-control", { "is-invalid": props.error })}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChangeHandler}
      />
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
};

TextInput.defaultProps = {
  type: "text"
};
TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string
};
export default TextInput;
