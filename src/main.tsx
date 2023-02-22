import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { CrudContextProv } from "./contexts/CrudContext";
import "./assets/stylos/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CrudContextProv>
      <App></App>
    </CrudContextProv>
  </React.StrictMode>
);
