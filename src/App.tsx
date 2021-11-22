import React, { useRef, useState } from "react";
import { useTimer } from "use-timer";
import AppRoutes from "./app-routes";
import "./App.css";
import { Sidebar } from "./demo/sidebar/sidebar";
import "./design/colors.scss";
import "./design/layout.scss";
import "./design/list.scss";

function App() {
  const { time, start, pause, reset, status } = useTimer({
    endTime: 40,
    interval: 100,
  });

  const [open, setOpen] = useState(false);
  const ref = useRef();

  return (
    <div className="app">
      <aside className="app-aside">
        <Sidebar />
      </aside>
      <section className="app-main-section">
        <AppRoutes />
      </section>
    </div>
  );
}

export default App;
