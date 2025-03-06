import * as React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { translate } from "../../utils/dictionary";

function Footer({language}) {
  return (
    <Box margin={4} display="flex" flexDirection="column" alignItems="center">
      <Typography
        variant="subtitle2"
        component="span"
        align="center"
        sx={(theme) => ({ margin: theme.spacing(2) })}
      >
        {translate("Vo Minh Thien Long | InICT | Le Quy Don Technical University", language)}
        <br />
        ©2025 thienlongtpct.github.io
      </Typography>
      <Box display="flex" alignItems="center">
        <img src={process.env.PUBLIC_URL + "/logo.png"} width={40} alt="InICT logo" loading="lazy" />
        <div>
          <div style={{ fontWeight: 700, fontSize: "18px", marginLeft: "16px", lineHeight: "22px", color: "#242056" }}>
              {translate("Institue of Information Technology", language)}
              <br />
              {translate("and Communication", language)}
          </div>
        </div>
      </Box>
    </Box>
  );
}

Footer.propTypes = {
  language: PropTypes.oneOf(['vi', 'en']),
};

export default Footer;
