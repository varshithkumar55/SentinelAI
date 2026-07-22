import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./styles/globals.css";

import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />

          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 2500,
              style: {
                borderRadius: "12px",
                background: "#1e293b",
                color: "#fff",
              },
              success: {
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);