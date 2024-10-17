import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { GREY } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const inputsCustomizations = {
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
      disableRipple: true
    },
    styleOverrides: {
      root: ({ theme }) => ({
        boxSizing: 'border-box',
        transition: 'all 100ms ease-in',
        '&:focus-visible': {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
        },
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        borderRadius: theme.shape.borderRadius,
        textTransform: 'none',
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.25rem',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '2.5rem', // 40px
            },
          },
          {
            props: {
              color: 'primary',
              variant: 'contained',
            },
            style: {
              color: 'white',
              backgroundColor: theme.palette.primary.dark,
              '&:hover': {
                backgroundImage: 'none',
                backgroundColor: theme.palette.primary.darker,
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: theme.palette.primary.darker,
              },
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'contained',
            },
            style: {
              color: 'white',
              backgroundColor: theme.palette.primary.light,
              backgroundImage: `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.8)}, ${theme.palette.primary.main})`,
              boxShadow: `inset 0 2px 0 ${alpha(theme.palette.primary.light, 0.2)}, inset 0 -2px 0 ${alpha(theme.palette.primary.dark, 0.4)}`,
              border: `1px solid ${theme.palette.primary.main}`,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: theme.palette.primary.dark,
                backgroundImage: 'none',
              },
            },
          },
          {
            props: {
              variant: 'outlined',
            },
            style: {
              color: theme.palette.text.primary,
              border: '1px solid',
              borderColor: GREY[200],
              backgroundColor: alpha(GREY[50], 0.3),
              '&:hover': {
                backgroundColor: GREY[100],
                borderColor: GREY[300],
              },
              '&:active': {
                backgroundColor: GREY[200],
              }
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'outlined',
            },
            style: {
              color: theme.palette.primary.dark,
              border: '1px solid',
              borderColor: theme.palette.primary.light,
              backgroundColor: theme.palette.primary.lighter,
              '&:hover': {
                backgroundColor: theme.palette.primary.lighter,
                borderColor: theme.palette.primary.main,
              },
              '&:active': {
                backgroundColor: alpha(theme.palette.primary.light, 0.7),
              }
            },
          },
          {
            props: {
              variant: 'text',
            },
            style: {
              color: GREY[600],
              '&:hover': {
                backgroundColor: GREY[100],
              },
              '&:active': {
                backgroundColor: GREY[200],
              }
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'text',
            },
            style: {
              color: theme.palette.primary.dark,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.lighter, 0.5),
              },
              '&:active': {
                backgroundColor: alpha(theme.palette.primary.light, 0.7),
              }
            },
          },
        ],
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        borderRadius: theme.shape.borderRadius,
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: 0,
        color: theme.palette.text.primary,
        border: '1px solid ',
        borderColor: GREY[400],
        backgroundColor:  GREY[100],
        '&:hover': {
          backgroundColor: theme.palette.primary.lighter,
          borderColor: theme.palette.primary.main
        },
        '&:active': {
          backgroundColor: theme.palette.primary.light,
        },
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              width: '2.25rem',
              height: '2.25rem',
              // padding: '0.25rem',
              [`& .${svgIconClasses.root}`]: { fontSize: '1rem' },
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              width: '2.5rem',
              height: '2.5rem',
            },
          },
        ],
      }),
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: '10px',
        boxShadow: `0 4px 16px ${alpha(GREY[400], 0.2)}`,
        [`& .${toggleButtonGroupClasses.selected}`]: {
          color: theme.palette.primary.main,
        },
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        // padding: theme.spacing(1),
        textTransform: 'none',
        borderRadius: '10px',
        fontWeight: 500,
      }),
    },
  },
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
      icon: (
        <CheckBoxOutlineBlankRoundedIcon sx={{ color: 'hsla(210, 0%, 0%, 0.0)' }} />
      ),
      checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
      indeterminateIcon: <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        margin: 10,
        height: 16,
        width: 16,
        borderRadius: 5,
        border: '1px solid ',
        borderColor: alpha(GREY[300], 0.8),
        boxShadow: '0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset',
        backgroundColor: alpha(GREY[100], 0.4),
        transition: 'border-color, background-color, 120ms ease-in',
        '&:hover': {
          borderColor: theme.palette.primary.light,
        },
        '&.Mui-focusVisible': {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
          borderColor: theme.palette.primary.main,
        },
        '&.Mui-checked': {
          color: 'white',
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          boxShadow: `none`,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: ({theme}) => ({
      root: {
        border: 'none',
        fontFamily: "Sans Serif",
      },
      input: {
        '&::placeholder': {
          opacity: 0.7,
          color: GREY[500],
        },
      },
    }),
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: 0,
      },
      root: ({ theme }) => ({
        padding: theme.spacing(1),
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default,
        transition: 'border 120ms ease-in',
        '&:hover': {
          borderColor: GREY[400],
        },
        [`&.${outlinedInputClasses.focused}`]: {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          borderColor: theme.palette.primary.main,
        },
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.5rem',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '3.5rem',
            },
          },
        ],
      }),
      notchedOutline: {
        border: 'none',
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.grey[500]
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        typography: theme.typography.caption,
        marginBottom: 8,
      }),
    },
  },
};