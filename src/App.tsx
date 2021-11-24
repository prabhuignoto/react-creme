import React, { useEffect, useRef, useState } from "react";
import { useTimer } from "use-timer";
import AppRoutes from "./app-routes";
import "./App.css";
import { SidebarHome } from "./demo/sidebar/sidebar";
import "./design/colors.scss";
import "./design/layout.scss";
import "./design/list.scss";
import useMedia from "./playground/useMedia";

function App() {
  const { time, start, pause, reset, status } = useTimer({
    endTime: 40,
    interval: 100,
  });

  const [open, setOpen] = useState(false);
  const ref = useRef();

  const media = useMedia();
  const [width, setWidth] = React.useState(-1);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(0);
    } else if (media.isMobile) {
      setWidth(0);
    } else if (media.isBigScreen) {
      setWidth(1640);
    } else if (media.isDesktop) {
      setWidth(1200);
    }
  }, [media]);

  return (
    width >= 0 && (
      <div className="app" style={{ width: width ? `${width}px` : "100%" }}>
        <aside className="app-aside">
          <SidebarHome />
        </aside>
        <section className="app-main-section">
          <AppRoutes />
        </section>
      </div>
    )
  );
}

export default App;
