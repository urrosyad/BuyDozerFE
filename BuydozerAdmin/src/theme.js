import { createTheme } from "@mui/material/styles";

// Palet warna
const theme = createTheme({
  palette: {
    primary: {
      main: "#6787B7", 
      light: "#8BB9FF",
      dark: "#345796", 
      text: "#FFFFFF", 
      background: "#F6FAFC",
    },
    secondary: {
      main: "#FFD600",  
      light: "#FFFF6B", 
      dark: "#C69400",  
    },
    error: {
      main: "#FF3D00",  
      light: "#FF8A65", 
      dark: "#D84315",  
    },
    warning: {
      main: "#FF9800",  
      light: "#FFC947", 
      dark: "#F57C00",  
    },
  },
  typography: {
    fontFamily: "'Rubik', sans-serif",
    fontWeight: {
      thin: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
});


export default theme;
