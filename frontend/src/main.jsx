import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import createTables from "../../backend/db.js";
import App from "./App.jsx";
// createTables();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
