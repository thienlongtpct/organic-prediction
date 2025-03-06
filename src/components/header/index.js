import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ToggleLanguage from "./ToggleLanguage";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  background: theme.palette.primary.main,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
  backgroundImage: "none",
  zIndex: theme.zIndex.drawer + 1,
  flex: "0 0 auto",
}));

function Header({ language, toggleLanguage }) {
  return (
    <StyledAppBar>
      <Toolbar
        variant="dense"
        disableGutters
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          p: theme.spacing(1),
          flexDirection: "row-reverse",
        })}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <ToggleLanguage
            data-screenshot="toggle-language"
            language={language}
            toggleLanguage={toggleLanguage}
          />
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}

Header.propTypes = {
  children: PropTypes.node,
  language: PropTypes.oneOf(["vi", "en"]).isRequired,
  toggleLanguage: PropTypes.func.isRequired,
};

export default Header;
