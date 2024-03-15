import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ProSidebarProvider } from "react-pro-sidebar";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.js";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
