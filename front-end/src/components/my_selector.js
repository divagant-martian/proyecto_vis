import React from 'react';
import { Select } from "semantic-ui-react";

const MySelector = ({options, defaultValue, handleChange, placeholder}) => {
  return (
    <Select
      placeholder={placeholder}
      defaultValue={defaultValue}
      options={options}
      onChange={(_, { value }) => handleChange(value)}/>
  );
}

export default MySelector;
