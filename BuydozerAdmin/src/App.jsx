import react from "react";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import theme from '@themes/theme'
import Routers from "./Routers/Routes/Routers";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
        <CssBaseline/>
          <Routers />
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
}


