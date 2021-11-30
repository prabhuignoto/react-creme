import React, { useEffect } from "react";
import AppRoutes from "./app-routes";
import "./App.css";
import { SidebarHome } from "./demo/sidebar/sidebar";
import "./design/colors.scss";
import "./design/layout.scss";
import "./design/list.scss";

function App() {
  // const media = useMedia();
  const [width, setWidth] = React.useState(-1);

  useEffect(() => {
    // if (!media) {
    //   return;
    // }
    // if (media.isTablet) {
    //   setWidth(0);
    // } else if (media.isMobile) {
    //   setWidth(0);
    // } else if (media.isBigScreen) {
    //   setWidth(1640);
    // } else if (media.isDesktop) {
    //   setWidth(1200);
    // }
  }, []);

  return (
    <div className="app">
      <aside className="app-aside">
        <SidebarHome />
      </aside>
      <section className="app-main-section">
        <AppRoutes />
      </section>
    </div>
  );
}

export default App;
