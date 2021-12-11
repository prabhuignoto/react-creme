import classNames from "classnames";
import React, { useEffect, useMemo, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { useDebouncedCallback } from "use-debounce";
import AppRoutes from "./app-routes";
import "./App.scss";
import "./design/colors.scss";
import "./design/layout.scss";
import "./design/list.scss";
import Footer from "./Footer";
import SidebarHome from "./playground/sidebar-home";

const Logo = () => (
  <div className="rc-demo-app-logo">
    {/* <span className="rc-demo-logo-icon-wrapper"><LogoIcon /></span> */}
    React Creme
  </div>
);

const GithubLink = () => (
  <div className="rc-demo-app-github-link">
    <a href="http://github.com">
      <img
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        alt="github"
      />
    </a>
  </div>
);

function App() {
  const sectionRef = useRef<HTMLElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const [left, setLeft] = React.useState(-1);
  const resizeObserver = useRef<ResizeObserver>();

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
          setLeft(sectionLeft - asideWidth - 20);
        } else {
          setLeft(0);
        }
      }
    },
    100,
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
    <div className="app">
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
          <GithubLink />
        </header>
        <AppRoutes />
        <Footer />
      </section>
    </div>
  );
}

export default App;
