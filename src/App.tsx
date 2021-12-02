import React from "react";
import AppRoutes from "./app-routes";
import "./App.css";
import { SidebarHome } from "./demo/sidebar/sidebar";
import "./design/colors.scss";
import "./design/layout.scss";
import "./design/list.scss";

function App() {
  return (
    <div className="app">
      <aside className="app-aside">
        <SidebarHome />
      </aside>
      <section className="app-main-section">
        <header className="app-header"></header>
        <AppRoutes />
      </section>
    </div>
  );
}

export default App;
