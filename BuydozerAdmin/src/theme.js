import { createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2A6DD0",
      light: "#8BB9FF",
      dark: "#193D71",
      contrastText: "#EEF2FF",
    },
    secondary: {
      main: "#F3F304",
      light: "#FFFF6A",
      dark: "#D9D630",
      background: "#FEFFBB",
    },
    success: {
      main: "#28D156",
    },
    warning: {
      main: "#F5E94C",
    },
    error: {
      main: "#EC3535",
    },
    info: {
      main: "#35ECAC",
    },
  },
  typography: {
    fontFamily: "Rubik, sans-serif",
    fontWeight: {
      thin: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  components:{
    MuiTooltip:{
      styleOverrides:{
        arrow:{
          color: "#193D71",
        },
        tooltip:{
          backgroundColor: "#193D71",
          color: "#FFFFFF"
          
        }
      }
    },
    MuiTypography:{
      styleOverrides:{
        root:{
          fontFamily: "Rubik, sans-serif",
          fontWeight: {
            thin: 300,
            regular: 400,
            medium: 500,
            bold: 700,
          }
        }
      }
    },
    MuiCard:{
      styleOverrides:{
        root:{
          boxShadow: "none"
        }
      }
    },
  MuiButton:{
    styleOverrides:{
      root:{
        textTransform: "capitalize",
        ":active": {
          transform: "scale(0.95)",
        },
      },
    }
  },
  MuiTextField:{
    styleOverrides:{
      root:{
        width: "100%",
        height: "auto",
        backgroundColor: "#EEF2FF",
        borderRadius: "5px",
      }
    }
  },
  MuiTextareaAutosize: {
    styleOverrides: {
      root: {
        width: '100%',
        height: '50px',
        padding: '8px',
        border: '1px solid #EEF2FF',
        borderRadius: '5px',
        boxSizing: 'border-box',
        '&:hover': {
          border: '1px solid black',
        },
        '&:focus': {
          border: '1px solid #2A6DD0',
          outline: 'none',
        },
        resize: 'vertical',
        fontSize: '16px',
      },
    },
  },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
});

export default theme;

