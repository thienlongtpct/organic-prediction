import { alpha } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { typographyClasses } from '@mui/material/Typography';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { chipClasses } from '@mui/material/Chip';
import { iconButtonClasses } from '@mui/material/IconButton';
import { GREY } from '../themePrimitives';

const dataDisplayCustomizations = {
  MuiList: {
    styleOverrides: {
      root: {
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${svgIconClasses.root}`]: {
          width: '1rem',
          height: '1rem',
          color: theme.palette.text.secondary,
        },
        [`& .${typographyClasses.root}`]: {
          fontWeight: 500,
        },
        [`& .${buttonBaseClasses.root}`]: {
          display: 'flex',
          gap: 8,
          padding: '2px 8px',
          borderRadius: theme.shape.borderRadius,
          opacity: 0.7,
          '&.Mui-selected': {
            opacity: 1,
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
            [`& .${svgIconClasses.root}`]: {
              color: theme.palette.text.primary,
            },
            '&:focus-visible': {
              backgroundColor: alpha(theme.palette.action.selected, 0.3),
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.action.selected, 0.5),
            },
          },
          '&:focus-visible': {
            backgroundColor: 'transparent',
          },
        },
      }),
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: ({ theme }) => ({
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.body2.lineHeight,
      }),
      secondary: ({ theme }) => ({
        fontSize: theme.typography.caption.fontSize,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: 'transparent',
        padding: '4px 8px',
        fontSize: theme.typography.caption.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0,
      },
    },
  },
  MuiChip: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        border: '1px solid',
        borderRadius: '999px',
        [`& .${chipClasses.label}`]: {
          fontWeight: 600,
        },
        variants: [
          {
            props: {
              color: 'default',
            },
            style: {
              borderColor: GREY[200],
              backgroundColor: GREY[100],
              [`& .${chipClasses.label}`]: {
                color: GREY[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: GREY[500],
              },
              ...theme.applyStyles('dark', {
                borderColor: GREY[700],
                backgroundColor: GREY[800],
                [`& .${chipClasses.label}`]: {
                  color: GREY[300],
                },
                [`& .${chipClasses.icon}`]: {
                  color: GREY[300],
                },
              }),
            },
          },
          {
            props: {
              color: 'success',
            },
            style: {
              borderColor: theme.palette.success.light,
              backgroundColor: theme.palette.success.lighter,
              [`& .${chipClasses.label}`]: {
                color: theme.palette.success.main,
              },
              [`& .${chipClasses.icon}`]: {
                color: theme.palette.success.main,
              },
              ...theme.applyStyles('dark', {
                borderColor: theme.palette.success.darker,
                backgroundColor: theme.palette.success.darker,
                [`& .${chipClasses.label}`]: {
                  color: theme.palette.success.light,
                },
                [`& .${chipClasses.icon}`]: {
                  color: theme.palette.success.light,
                },
              }),
            },
          },
          {
            props: {
              color: 'error',
            },
            style: {
              borderColor: theme.palette.error.lighter,
              backgroundColor: theme.palette.error.lighter,
              [`& .${chipClasses.label}`]: {
                color: theme.palette.error.main,
              },
              [`& .${chipClasses.icon}`]: {
                color: theme.palette.error.main,
              },
              ...theme.applyStyles('dark', {
                borderColor: theme.palette.error.darker,
                backgroundColor: theme.palette.error.darker,
                [`& .${chipClasses.label}`]: {
                  color: theme.palette.error.light,
                },
                [`& .${chipClasses.icon}`]: {
                  color: theme.palette.error.light,
                },
              }),
            },
          },
          {
            props: { size: 'small' },
            style: {
              maxHeight: 20,
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
              [`& .${svgIconClasses.root}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
          {
            props: { size: 'medium' },
            style: {
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
        ],
      }),
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      actions: {
        display: 'flex',
        gap: 8,
        marginRight: 6,
        [`& .${iconButtonClasses.root}`]: {
          minWidth: 0,
          width: 36,
          height: 36,
        },
      },
    },
  },
  MuiIcon: {
    defaultProps: {
      fontSize: 'small',
    },
    styleOverrides: {
      root: {
        variants: [
          {
            props: {
              fontSize: 'small',
            },
            style: {
              fontSize: '1rem',
            },
          },
        ],
      },
    },
  },
};

export default dataDisplayCustomizations;