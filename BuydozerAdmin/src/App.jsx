import react from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import theme from "./theme";
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


