import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  // axe(React, ReactDOM, 1000);
}

// @ts-ignore

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById("root")
);
