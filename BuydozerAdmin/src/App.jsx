import react from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { Routes } from "./Routers";

import "./index.css"


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
  );
}


