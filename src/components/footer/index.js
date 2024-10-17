import * as React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box margin={4} display="flex" flexDirection="column" alignItems="center">
      <Typography
        variant="subtitle2"
        component="span"
        align="center"
        sx={(theme) => ({ margin: theme.spacing(2) })}
      >
        Hoàng Vĩnh Khang | Lớp 10A1 | THPT Xuân Đỉnh
      </Typography>
      <Box display="flex" alignItems="center">
        <img src="logo.png" width={100} alt="ChePred logo" loading="lazy" />
        <Typography
          variant="subtitle2"
          component="a"
          align="center"
          sx={(theme) => ({ margin: theme.spacing(2) })}
        >
          ©2024 chepred.com
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
