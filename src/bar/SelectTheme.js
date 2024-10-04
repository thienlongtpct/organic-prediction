import * as React from "react";
import PropTypes from "prop-types";
import { FormControl, Select, MenuItem } from "@mui/material";

function SelectTheme({ theme, selectTheme, ...props }) {
  return (
    <FormControl variant="outlined" {...props}>
      <Select
        size="small"
        labelId="theme-select-label"
        id="theme-select"
        value={theme}
        onChange={selectTheme}
        label="Design Language"
      >
        <MenuItem value="custom">Custom Theme</MenuItem>
        <MenuItem value="material">Material Design 2</MenuItem>
      </Select>
    </FormControl>
  );
}

SelectTheme.propTypes = {
  theme: PropTypes.oneOf(["custom", "material"]).isRequired,
  selectTheme: PropTypes.func.isRequired,
};

export default SelectTheme;
