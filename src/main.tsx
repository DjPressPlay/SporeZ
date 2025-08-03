import React from "react";
import ReactDOM from "react-dom/client";
import Index from "./pages/Index"; // ✅ correct path

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);
