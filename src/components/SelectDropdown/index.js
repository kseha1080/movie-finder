import React from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";

const SelectDropdown = props => {
  const { onChange, defaultValue, children, customClass } = props;
  const defaultOption = defaultValue ? (
    <option disabled={true}>{defaultValue}</option>
  ) : null;
  return (
    <Input
      className={customClass}
      type="select"
      name="select"
      onChange={onChange}
      defaultValue={defaultValue ? defaultValue : null}
    >
      {defaultOption}
      {children}
    </Input>
  );
};

SelectDropdown.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  customClass: PropTypes.string
};

SelectDropdown.defaultProps = {
  defaultValue: 'defaultValue',
  customClass: ''
}

export default SelectDropdown;
