import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { useDebouncedCallback } from "use-debounce";
import MenuSVG from "../menu.svg?component";
import "./App.scss";
import { Drawer } from "./components";
import "./design/colors.scss";
import "./design/layout.scss";
import "./design/list.scss";
import AppRoutes from "./expo/app-routes";
import SidebarHome from "./expo/common/sidebar-home";
import useMedia from "./expo/common/useMedia";
import Footer from "./Footer";

const Logo: React.FC<{ isMobile: boolean; onMenuClick }> = ({
  isMobile,
  onMenuClick,
}) => (
  <div className="rc-demo-app-logo">
    {isMobile && (
      <span className="rc-demo-menu-icon" onClick={onMenuClick}>
        <MenuSVG />
      </span>
    )}
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

const Header: React.FC<{ isMobile?: boolean; onOpen?: () => void }> = ({
  isMobile,
  onOpen,
}) => {
  return (
    <header className="app-header">
      <Logo isMobile={isMobile} onMenuClick={onOpen} />
      <Badge />
      <GithubLink />
    </header>
  );
};

function App() {
  const sectionRef = useRef<HTMLElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const [left, setLeft] = React.useState(-1);
  const resizeObserver = useRef<ResizeObserver>();

  const media = useMedia();

  const appRef = useRef<HTMLDivElement>(null);

  const [openAside, setOpenAside] = React.useState(false);

  const sidebarClass = useMemo(() => {
    return classNames("app-aside", {
      "app-aside-visible": left > -1,
    });
  }, [left]);

  const positionAside = useCallback(() => {
    if (sectionRef.current && asideRef.current && !media.isMobile) {
      const asideWidth = asideRef.current.offsetWidth;
      const { left: sectionLeft } = sectionRef.current.getBoundingClientRect();
      if (sectionLeft - asideWidth > 0) {
        setLeft(sectionLeft - asideWidth);
      } else {
        setLeft(0);
      }
    }
  }, [media]);

  const debouncedPositionAside = useDebouncedCallback(positionAside, 100);

  const onRef = (el: HTMLElement) => {
    if (el && asideRef.current) {
      sectionRef.current = el;
      positionAside();
    }
  };

  useEffect(() => {
    resizeObserver.current = new ResizeObserver(() => debouncedPositionAside());
    resizeObserver.current.observe(document.body);
    return () => {
      resizeObserver.current.disconnect();
    };
  }, []);

  const toggleOpen = useCallback(() => setOpenAside((prev) => !prev), []);

  const canRenderAside = useMemo(() => {
    return media && media.isMobile && openAside;
  }, [media, openAside]);

  const onClose = useCallback(() => setOpenAside(false), []);

  return (
    <div className="app" ref={appRef}>
      {media && !media.isMobile && (
        <aside
          className={sidebarClass}
          ref={asideRef}
          style={{ left: `${left}px` }}
        >
          <SidebarHome />
        </aside>
      )}
      {canRenderAside && (
        <Drawer onClose={onClose} showClose>
          <SidebarHome />
        </Drawer>
      )}
      <section className="app-main-section" ref={onRef}>
        <Header isMobile={media && media.isMobile} onOpen={toggleOpen} />
        <AppRoutes />
        <Footer />
      </section>
    </div>
  );
}

export default App;
