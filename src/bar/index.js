import * as React from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ToggleMode from "./ToggleMode";
import ToggleLanguage from "./ToggleLanguage";
import SelectTheme from "./SelectTheme";
import getPredictionTheme from "../theme/getPredictionTheme";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  backgroundImage: "none",
  zIndex: theme.zIndex.drawer + 1,
  flex: "0 0 auto",
}));

function MainBar({
  theme,
  selectTheme,
  language,
  toggleLanguage,
  mode,
  toggleMode,
  children,
}) {
  const materialTheme = createTheme({ palette: { mode } });
  const customTheme = createTheme(getPredictionTheme(mode));

  return (
    <ThemeProvider theme={theme === "custom" ? customTheme : materialTheme}>
      <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
        <StyledAppBar>
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: "8px 12px",
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <SelectTheme theme={theme} selectTheme={selectTheme} sx={{ minWidth: 160 }} />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <ToggleLanguage
                data-screenshot="toggle-language"
                language={language}
                toggleLanguage={toggleLanguage}
              />
              <ToggleMode
                data-screenshot="toggle-mode"
                mode={mode}
                toggleMode={toggleMode}
              />
            </Box>
          </Toolbar>
        </StyledAppBar>
        <Box sx={{ flex: "1 1", overflow: "auto" }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
}

MainBar.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.oneOf(["custom", "material"]).isRequired,
  selectTheme: PropTypes.func.isRequired,
  language: PropTypes.oneOf(["vi", "en"]).isRequired,
  toggleLanguage: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleMode: PropTypes.func.isRequired,
};

export default MainBar;
