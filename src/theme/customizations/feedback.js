import { alpha } from '@mui/material/styles';
import { GREY } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const feedbackCustomizations = {
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 10,
        backgroundColor: theme.palette.warning.lighter,
        color: theme.palette.text.primary,
        border: `1px solid ${alpha(theme.palette.warning.light, 0.5)}`,
        '& .MuiAlert-icon': {
          color: theme.palette.warning.main,
        },
        ...theme.applyStyles('dark', {
          backgroundColor: `${alpha(theme.palette.warning.darker, 0.5)}`,
          border: `1px solid ${alpha(theme.palette.warning.darker, 0.5)}`,
        }),
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          border: '1px solid',
          borderColor: theme.palette.divider,
        },
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 8,
        backgroundColor: GREY[200],
        ...theme.applyStyles('dark', {
          backgroundColor: GREY[800],
        }),
      }),
    },
  },
};