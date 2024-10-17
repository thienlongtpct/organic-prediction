import * as React from "react";
import PropTypes from "prop-types";

import IconButton from "@mui/material/IconButton";

import { US, VN } from "country-flag-icons/react/3x2";

function ToggleLanguage({ language, toggleLanguage, ...props }) {
  return (
    <IconButton
      onClick={toggleLanguage}
      size="small"
      color="primary"
      aria-label="Theme toggle button"
      {...props}
    >
      {language === "en" ? <VN title="Vietnam" width={40}/> : <US title="United States" width={40}/>}
    </IconButton>
  );
}

ToggleLanguage.propTypes = {
  language: PropTypes.oneOf(["vi", "en"]).isRequired,
  toggleLanguage: PropTypes.func.isRequired,
};

export default ToggleLanguage;
