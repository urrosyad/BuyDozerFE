import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
// import "./index.css"

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60000, gcTime: 10 * (60 * 1000)}}
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
      <ReactQueryDevtools/>
  </QueryClientProvider>
);
