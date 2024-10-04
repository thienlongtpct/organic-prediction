import * as React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';

import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

function ToggleMode({ mode, toggleMode, ...props }) {
  return (
    <IconButton
      onClick={toggleMode}
      size="small"
      color="primary"
      aria-label="Theme toggle button"
      {...props}
    >
      {mode === 'dark' ? (
        <WbSunnyRoundedIcon fontSize="small" />
      ) : (
        <ModeNightRoundedIcon fontSize="small" />
      )}
    </IconButton>
  );
}

ToggleMode.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleMode: PropTypes.func.isRequired,
};

export default ToggleMode;