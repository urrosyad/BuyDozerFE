import react from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import theme from "./theme";
import { Routes } from "./Routers";


export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
        <CssBaseline/>
          <Routes />
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
}


