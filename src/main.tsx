import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// @ts-ignore
const rootElement = ReactDOM.createRoot(document.getElementById("root"));

rootElement.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
