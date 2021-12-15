import classNames from "classnames";
import React, { useEffect, useMemo, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { useDebouncedCallback } from "use-debounce";
import "./App.scss";
import "./design/colors.scss";
import "./design/layout.scss";
import "./design/list.scss";
import AppRoutes from "./expo/app-routes";
import SidebarHome from "./expo/common/sidebar-home";
import Footer from "./Footer";

const Logo = () => (
  <div className="rc-demo-app-logo">
    <span className="rc-demo-menu-icon"></span>
    <span className="rc-demo-logo-text">React Creme</span>
  </div>
);

const GithubLink = () => (
  <div className="rc-demo-app-github-link">
    <a
      href="http://github.com/prabhuignoto/react-creme"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        alt="github"
      />
    </a>
  </div>
);

const Badge = () => {
  return <div className="rc-demo-alpha-badge">Alpha</div>;
};

function App() {
  const sectionRef = useRef<HTMLElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const [left, setLeft] = React.useState(-1);
  const resizeObserver = useRef<ResizeObserver>();

  const appRef = useRef<HTMLDivElement>(null);

  const sidebarClass = useMemo(() => {
    return classNames("app-aside", {
      "app-aside-visible": left > -1,
    });
  }, [left]);

  const positionAside = useDebouncedCallback(
    () => {
      if (sectionRef.current && asideRef.current) {
        const asideWidth = asideRef.current.offsetWidth;
        const { left: sectionLeft } =
          sectionRef.current.getBoundingClientRect();
        if (sectionLeft - asideWidth > 0) {
          setLeft(sectionLeft - asideWidth);
        } else {
          setLeft(0);
        }
      }
    },
    50,
    {
      leading: true,
    }
  );

  const onRef = (el: HTMLElement) => {
    if (el && asideRef.current) {
      sectionRef.current = el;
      positionAside();
    }
  };

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      positionAside();
    });
    resizeObserver.current.observe(document.body);
    return () => {
      resizeObserver.current.disconnect();
    };
  }, []);

  return (
    <div className="app" ref={appRef}>
      <aside
        className={sidebarClass}
        ref={asideRef}
        style={{ left: `${left}px` }}
      >
        <SidebarHome />
      </aside>
      <section className="app-main-section" ref={onRef}>
        <header className="app-header">
          <Logo />
          <Badge />
          <GithubLink />
        </header>
        <AppRoutes />
        <Footer />
      </section>
    </div>
  );
}

export default App;
