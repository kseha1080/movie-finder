import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";

class SelectDropdown extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    customClass: PropTypes.string
  };

  static defaultProps = {
    customClass: ""
  };

  render() {
    const { onChange, defaultValue, children, customClass } = this.props;
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
  }
}

export default SelectDropdown;
