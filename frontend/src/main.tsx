import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./contexts/AuthContextProvider";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  </AuthContextProvider>
);

// web vitals
reportWebVitals();