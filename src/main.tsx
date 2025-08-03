// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import Index from "./pages/Index"; // ✅ This is the correct import path

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);
