import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormGroup } from 'reactstrap';

const SelectDropdown = ({ onChange, defaultValue, children, customClass }) => {
  const defaultOption = defaultValue ? (
    <option disabled={true}>{defaultValue}</option>
  ) : null;
  return (
    <FormGroup>
      <Input
        className={customClass}
        type='select'
        name='select'
        onChange={onChange}
        defaultValue={defaultValue ? defaultValue : null}
      >
        {defaultOption}
        {children}
      </Input>
    </FormGroup>
  );
};

SelectDropdown.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  customClass: PropTypes.string,
  children: PropTypes.node,
};

SelectDropdown.defaultProps = {
  defaultValue: 'defaultValue',
  customClass: '',
};

export default SelectDropdown;
